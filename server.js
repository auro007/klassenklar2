const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const ROOT = __dirname;
const PUBLIC = path.join(ROOT, 'public');
const STORE = process.env.KLASSENKLAR_DATA || path.join(ROOT, 'data.json');
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || '127.0.0.1';
const sessions = new Map();
const topics = ['Grundlagen', 'Handelsklassen', 'Anatomie', 'ZP-Verfahren', 'FOM-Gerät', 'Schnittführung', 'Verwiegung'];

function blankProgress() {
  return { answered: 0, correct: 0, lessons: [], streak: 0, lastActive: null, daily: {}, topic: {}, bookmarks: [], mistakes: [], cards: {}, practical: [], exams: [], history: [] };
}
function demoLearner(id, name, answered, correct, lessons, topicRates, lastActive) {
  const p = blankProgress(); p.answered = answered; p.correct = correct; p.lessons = Array.from({ length: lessons }, (_, i) => `sample-lesson-${i}`);
  p.lastActive = lastActive; p.streak = 2; p.topic = Object.fromEntries(topics.map(t => [t, { answered: 4, correct: Math.round(4 * (topicRates[t] ?? 0.65)) }]));
  return { id, name, progress: p, group: 'Lerngruppe A', demo: true };
}
function initialData() {
  return { learners: [
    { id: 'local-learner', name: 'Lernkonto (Demo)', progress: blankProgress(), group: 'Lerngruppe A', demo: true },
    demoLearner('sample-anna', 'Anna Weber (Beispiel)', 44, 40, 6, { Grundlagen: .9, Handelsklassen: .85, Anatomie: .8, 'ZP-Verfahren': .6, 'FOM-Gerät': .7, Schnittführung: .8, Verwiegung: .9 }, 'Heute'),
    demoLearner('sample-lukas', 'Lukas Braun (Beispiel)', 29, 22, 4, { Grundlagen: .75, Handelsklassen: .72, Anatomie: .68, 'ZP-Verfahren': .62, 'FOM-Gerät': .72, Schnittführung: .7, Verwiegung: .8 }, 'Gestern'),
    demoLearner('sample-mira', 'Mira Keller (Beispiel)', 18, 11, 2, { Grundlagen: .65, Handelsklassen: .6, Anatomie: .5, 'ZP-Verfahren': .42, 'FOM-Gerät': .55, Schnittführung: .58, Verwiegung: .64 }, 'Vor 6 Tagen')
  ], groups: ['Lerngruppe A', 'Lerngruppe B'], groupOwners: {}, accounts: [], invitations: [], sessions: {}, settings: { goal: 15, examDate: '', fontScale: 1, language: 'de', fomModel: 'unknown' } };
}
function readData() { try { const saved = JSON.parse(fs.readFileSync(STORE, 'utf8')); for (const learner of saved.learners || []) { learner.progress ||= blankProgress(); if (!Array.isArray(learner.progress.lessons)) learner.progress.lessons = Array.from({ length: Number(learner.progress.lessons) || 0 }, (_, i) => `sample-lesson-${i}`); } return saved; } catch { return initialData(); } }
let db = readData();
db.accounts ||= []; db.groupOwners ||= {}; db.invitations ||= []; db.sessions ||= {};
function save() { const temp = STORE + '.tmp'; fs.writeFileSync(temp, JSON.stringify(db, null, 2)); fs.renameSync(temp, STORE); }
if (!fs.existsSync(STORE)) save();
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' };
function send(res, status, data, headers = {}) { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers }); res.end(JSON.stringify(data)); }
function body(req) { return new Promise((resolve, reject) => { let raw = ''; req.on('data', c => { raw += c; if (raw.length > 1e6) req.destroy(); }); req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { reject(e); } }); }); }
function session(req) { const sid = (req.headers.cookie || '').split(';').map(x => x.trim()).find(x => x.startsWith('kk_session='))?.slice(11); if (!sid) return null; if (!sessions.has(sid) && db.sessions?.[sid]) sessions.set(sid, db.sessions[sid]); return sid ? sessions.get(sid) : null; }
function auth(req, role) { const s = session(req); return s && (!role || s.role === role) ? s : null; }
function learnerFor(s) { return db.learners.find(l => l.id === s.learnerId); }
function safeLearner(l) { if (!l) return null; const p = l.progress || blankProgress(); const accuracy = p.answered ? Math.round(p.correct / p.answered * 100) : 0; return { id: l.id, name: l.name, group: l.group, demo: !!l.demo, progress: { answered: p.answered, correct: p.correct, accuracy, lessons: p.lessons.length, topic: p.topic, lastActive: p.lastActive || 'Noch nicht aktiv', practical: p.practical } }; }
function makeSession(res, fields) { const sid = crypto.randomBytes(32).toString('hex'); sessions.set(sid, fields); db.sessions ||= {}; db.sessions[sid] = fields; save(); const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''; res.setHeader('Set-Cookie', `kk_session=${sid}; HttpOnly; SameSite=Strict; Path=/; Max-Age=43200${secure}`); }
function findAccount(s) { return db.accounts.find(a => a.id === s?.accountId); }
function cleanEmail(value) { return String(value || '').trim().toLowerCase(); }
function passwordHash(password, salt = crypto.randomBytes(16).toString('hex')) { return { salt, hash: crypto.scryptSync(password, salt, 64).toString('hex') }; }
function passwordMatches(password, account) { const actual = crypto.scryptSync(password, account.salt, 64); const expected = Buffer.from(account.passwordHash, 'hex'); return actual.length === expected.length && crypto.timingSafeEqual(actual, expected); }
function roleOk(s, role) { return s && s.role === role && (s.demo || findAccount(s)); }
function ownedGroup(s) { return s.demo || db.groupOwners[s.group] === s.accountId; }

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (url.pathname.startsWith('/api/')) {
      if (req.method === 'POST' && url.pathname === '/api/demo-login') {
        const b = await body(req); const role = b.role === 'trainer' ? 'trainer' : 'learner';
        const l = db.learners.find(x => x.id === 'local-learner');
        makeSession(res, { role, learnerId: l.id, group: b.group || 'Lerngruppe A', demo: true });
        return send(res, 200, { role, learner: safeLearner(l), demo: true });
      }
      if (req.method === 'POST' && url.pathname === '/api/auth/register') {
        const b = await body(req); const name = String(b.name || '').trim(); const email = cleanEmail(b.email); const password = String(b.password || ''); const role = b.role === 'trainer' ? 'trainer' : 'learner';
        if (name.length < 2 || !email.includes('@') || password.length < 10) return send(res, 400, { error: 'Name, gültige E-Mail und ein Passwort mit mindestens 10 Zeichen sind erforderlich.' });
        if (db.accounts.some(a => a.email === email)) return send(res, 409, { error: 'Für diese E-Mail gibt es bereits ein Konto.' });
        let group = '';
        if (role === 'trainer') { group = String(b.group || '').trim().slice(0, 60); if (group.length < 2) return send(res, 400, { error: 'Bitte einen Gruppennamen eingeben.' }); if (db.groupOwners[group] || db.groups.includes(group)) return send(res, 409, { error: 'Dieser Gruppenname ist bereits vergeben. Bitte einen anderen wählen.' }); }
        else if (b.inviteCode) { const invite = db.invitations.find(i => i.code === String(b.inviteCode).trim().toUpperCase() && i.status === 'Offen'); if (!invite) return send(res, 400, { error: 'Einladungscode ungültig oder bereits verwendet.' }); if (invite.email && invite.email !== email) return send(res, 403, { error: 'Diese Einladung ist für eine andere E-Mail-Adresse ausgestellt.' }); group = invite.group; invite.status = 'Angenommen'; }
        const id = crypto.randomUUID(); const secured = passwordHash(password); const account = { id, name, email, role, group, salt: secured.salt, passwordHash: secured.hash, settings: { ...db.settings }, createdAt: new Date().toISOString() }; db.accounts.push(account);
        if (role === 'trainer') { db.groupOwners[group] = id; db.groups.push(group); }
        else { const learnerId = `account:${id}`; account.learnerId = learnerId; db.learners.push({ id: learnerId, name, progress: blankProgress(), group: group || 'Eigene Lerngruppe', demo: false, accountId: id }); }
        save(); makeSession(res, { role, accountId: id, learnerId: account.learnerId, group }); return send(res, 201, { role, demo: false, group });
      }
      if (req.method === 'POST' && url.pathname === '/api/auth/login') {
        const b = await body(req); const account = db.accounts.find(a => a.email === cleanEmail(b.email));
        if (!account || !passwordMatches(String(b.password || ''), account)) return send(res, 401, { error: 'E-Mail oder Passwort stimmt nicht.' });
        makeSession(res, { role: account.role, accountId: account.id, learnerId: account.learnerId, group: account.group }); return send(res, 200, { role: account.role, group: account.group, demo: false });
      }
      if (req.method === 'POST' && url.pathname === '/api/logout') { const s = session(req); if (s) { const sid = (req.headers.cookie || '').split(';').map(x => x.trim()).find(x => x.startsWith('kk_session='))?.slice(11); if (sid) { sessions.delete(sid); if (db.sessions) { delete db.sessions[sid]; save(); } } } return send(res, 200, { ok: true }, { 'Set-Cookie': 'kk_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0' }); }
      if (req.method === 'GET' && url.pathname === '/api/state') { const s = auth(req); if (!s || (!s.demo && !findAccount(s))) return send(res, 401, { error: 'Bitte anmelden.' }); const learner = learnerFor(s); const a = findAccount(s); return send(res, 200, { role: s.role, group: s.group, learner: safeLearner(learner), progress: learner ? learner.progress : blankProgress(), settings: a?.settings || db.settings, groups: s.role === 'trainer' && s.demo ? db.groups : [s.group].filter(Boolean), demo: !!s.demo, name: a?.name || (s.role === 'trainer' ? 'Ausbilderkonto' : 'Lernkonto (Demo)') }); }
      if (req.method === 'POST' && url.pathname === '/api/event') {
        const s = auth(req); if (!s || s.role !== 'learner') return send(res, 403, { error: 'Lernendenzugang erforderlich.' });
        const b = await body(req); const l = learnerFor(s); const p = l.progress; const today = new Date().toISOString().slice(0, 10); p.lastActive = 'Heute';
        if (b.type === 'answer') { p.answered++; if (b.correct) p.correct++; p.daily[today] = (p.daily[today] || 0) + 1; const t = b.topic || 'Grundlagen'; p.topic[t] ||= { answered: 0, correct: 0 }; p.topic[t].answered++; if (b.correct) p.topic[t].correct++; if (!b.correct && b.questionId && !p.mistakes.some(m => m.id === b.questionId)) p.mistakes.unshift({ id: b.questionId, at: today, topic: t }); if (b.correct && b.questionId) p.mistakes = p.mistakes.filter(m => m.id !== b.questionId); p.history.push({ date: today, type: 'answer', correct: !!b.correct }); const days = new Set(Object.keys(p.daily)); let streak = 0; const d = new Date(`${today}T00:00:00Z`); if (!days.has(today)) d.setUTCDate(d.getUTCDate() - 1); while (days.has(d.toISOString().slice(0, 10))) { streak++; d.setUTCDate(d.getUTCDate() - 1); } p.streak = streak; }
        if (b.type === 'lesson' && b.lessonId && !p.lessons.includes(b.lessonId)) p.lessons.push(b.lessonId);
        if (b.type === 'bookmark') p.bookmarks = p.bookmarks.includes(b.questionId) ? p.bookmarks.filter(x => x !== b.questionId) : [b.questionId, ...p.bookmarks];
        if (b.type === 'mistakeCleared') p.mistakes = p.mistakes.filter(m => m.id !== b.questionId);
        if (b.type === 'card') { const c = p.cards[b.cardId] || { repetitions: 0, due: today }; c.repetitions++; c.due = new Date(Date.now() + (b.confidence === 'easy' ? 3 : b.confidence === 'hard' ? 0 : 1) * 86400000).toISOString().slice(0, 10); c.lastConfidence = b.confidence; p.cards[b.cardId] = c; }
        if (b.type === 'exam') p.exams.unshift({ date: today, correct: b.correct, total: b.total, topic: b.topic || 'Gemischt' });
        save(); return send(res, 200, { progress: p });
      }
      if (req.method === 'POST' && url.pathname === '/api/settings') { const s = auth(req); if (!s || s.role !== 'learner') return send(res, 403, { error: 'Lernendenzugang erforderlich.' }); const b = await body(req); const a = findAccount(s); const target = a ? a.settings : db.settings; Object.assign(target, { goal: Math.max(1, Math.min(100, Number(b.goal) || 15)), examDate: String(b.examDate || ''), fontScale: Number(b.fontScale) || 1, language: b.language === 'en' ? 'en' : 'de', fomModel: 'unknown' }); save(); return send(res, 200, { settings: target }); }
      if (req.method === 'GET' && url.pathname === '/api/export') { const s = auth(req); if (!s || s.role !== 'learner') return send(res, 403, { error: 'Lernendenzugang erforderlich.' }); return send(res, 200, { exportedAt: new Date().toISOString(), settings: findAccount(s)?.settings || db.settings, progress: learnerFor(s).progress }); }
      if (req.method === 'POST' && url.pathname === '/api/import') { const s = auth(req); if (!s || s.role !== 'learner') return send(res, 403, { error: 'Lernendenzugang erforderlich.' }); const b = await body(req); if (!b.progress || typeof b.progress !== 'object') return send(res, 400, { error: 'Datei enthält keinen gültigen Lernstand.' }); learnerFor(s).progress = { ...blankProgress(), ...b.progress }; if (b.settings) { const a = findAccount(s); Object.assign(a ? a.settings : db.settings, b.settings); } save(); return send(res, 200, { ok: true }); }
      if (req.method === 'GET' && url.pathname === '/api/trainer/learners') { const s = auth(req, 'trainer'); if (!s || !ownedGroup(s)) return send(res, 403, { error: 'Trainerzugang für diese Gruppe erforderlich.' }); return send(res, 200, { groups: s.demo ? db.groups : [s.group], learners: db.learners.filter(l => l.group === s.group).map(safeLearner), invitations: db.invitations.filter(i => i.group === s.group), demo: !!s.demo }); }
      if (req.method === 'POST' && url.pathname === '/api/trainer/group') { const s = auth(req, 'trainer'); if (!s || !ownedGroup(s) || !s.demo) return send(res, 403, { error: 'Gruppenwechsel ist nur im Demo möglich.' }); const b = await body(req); if (!db.groups.includes(b.group)) return send(res, 400, { error: 'Gruppe nicht gefunden.' }); s.group = b.group; return send(res, 200, { group: s.group }); }
      if (req.method === 'POST' && url.pathname === '/api/trainer/invite') { const s = auth(req, 'trainer'); if (!s || !ownedGroup(s)) return send(res, 403, { error: 'Trainerzugang für diese Gruppe erforderlich.' }); const b = await body(req); if (!String(b.name || '').trim()) return send(res, 400, { error: 'Bitte einen Namen eingeben.' }); const invite = { name: String(b.name).trim(), email: cleanEmail(b.email), group: s.group, code: crypto.randomBytes(4).toString('hex').toUpperCase(), status: 'Offen' }; db.invitations.unshift(invite); save(); return send(res, 200, { ok: true, code: invite.code }); }
      if (req.method === 'POST' && url.pathname === '/api/trainer/practical') { const s = auth(req, 'trainer'); if (!s || !ownedGroup(s)) return send(res, 403, { error: 'Trainerzugang für diese Gruppe erforderlich.' }); const b = await body(req); const l = db.learners.find(x => x.id === b.learnerId && x.group === s.group); if (!l) return send(res, 404, { error: 'Lernender nicht in dieser Gruppe.' }); const item = String(b.item || ''); if (!["Arbeitsplatz vorbereiten","Messpunkte sicher finden","Waage korrekt bedienen","Ergebnis dokumentieren","Referenzpräsentation und Schnittführung prüfen","Morgenkontrolle am Betriebsgerät durchführen","Softwareversionen und Prüfergebnisse abgleichen","Messfehler erkennen und korrekt reagieren"].includes(item)) return send(res, 400, { error: 'Unbekannte Praxisaufgabe.' }); if (!l.progress.practical.includes(item)) l.progress.practical.push(item); save(); return send(res, 200, { ok: true }); }
      if (req.method === 'GET' && url.pathname === '/api/trainer/export') { const s = auth(req, 'trainer'); if (!s || !ownedGroup(s)) return send(res, 403, { error: 'Trainerzugang für diese Gruppe erforderlich.' }); return send(res, 200, { group: s.group, exportedAt: new Date().toISOString(), learners: db.learners.filter(l => l.group === s.group).map(safeLearner) }); }
      return send(res, 404, { error: 'API-Endpunkt nicht gefunden.' });
    }
    let file = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname.slice(1)); file = path.normalize(file).replace(/^([.][.][/\\])+/, ''); const target = path.resolve(PUBLIC, file);
    if ((target !== PUBLIC && !target.startsWith(PUBLIC + path.sep)) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) return send(res, 404, { error: 'Nicht gefunden' });
    const assetName = path.basename(target); const cache = ['index.html', 'sw.js', 'app.js', 'styles.css'].includes(assetName) ? 'no-cache' : 'public, max-age=3600';
    res.writeHead(200, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream', 'Cache-Control': cache }); fs.createReadStream(target).pipe(res);
  } catch (err) { console.error(err); send(res, 500, { error: 'Interner Fehler.' }); }
});
server.listen(PORT, HOST, () => console.log(`Klassenklar läuft auf http://${HOST}:${PORT}`));
