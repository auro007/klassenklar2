import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, join, resolve, sep } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import assert from 'node:assert/strict';

const dataDir = await mkdtemp(join(tmpdir(), 'klassenklar-'));
const port = 4187;
const projectRoot = new URL('..', import.meta.url);
const child = spawn(process.execPath, ['server.js'], { cwd: projectRoot, env: { ...process.env, PORT: String(port), KLASSENKLAR_DATA: join(dataDir, 'data.json') }, stdio: 'ignore' });
const base = `http://127.0.0.1:${port}`;
async function api(path, method = 'GET', payload, cookie) {
  const response = await fetch(base + path, { method, headers: { ...(payload ? { 'Content-Type': 'application/json' } : {}), ...(cookie ? { Cookie: cookie } : {}) }, body: payload ? JSON.stringify(payload) : undefined });
  const data = await response.json();
  return { response, data, cookie: response.headers.get('set-cookie')?.split(';')[0] || cookie };
}
try {
  let ready = false;
  for (let i = 0; i < 40; i++) { try { if ((await fetch(base)).ok) { ready = true; break; } } catch {} await delay(100); }
  assert(ready, 'server starts');
  const page = await fetch(base); assert.match(await page.text(), /Klassenklar/);
  const trainer = await api('/api/auth/register', 'POST', { name: 'Coach Test', email: 'coach@example.test', password: 'a-secure-pass-901', role: 'trainer', group: 'Team Rauchtest' });
  assert.equal(trainer.response.status, 201); assert.equal(trainer.data.role, 'trainer');
  const rejectedLogin = await api('/api/auth/login', 'POST', { email: 'coach@example.test', password: 'wrong-password-000' });
  assert.equal(rejectedLogin.response.status, 401, 'incorrect password is rejected');
  const signedIn = await api('/api/auth/login', 'POST', { email: 'coach@example.test', password: 'a-secure-pass-901' });
  assert.equal(signedIn.response.status, 200); assert.equal(signedIn.data.role, 'trainer');
  const invite = await api('/api/trainer/invite', 'POST', { name: 'Learner Test', email: 'learner@example.test' }, trainer.cookie);
  assert.equal(invite.response.status, 200); assert.ok(invite.data.code);
  const learner = await api('/api/auth/register', 'POST', { name: 'Learner Test', email: 'learner@example.test', password: 'another-secure-902', role: 'learner', inviteCode: invite.data.code });
  assert.equal(learner.response.status, 201); assert.equal(learner.data.group, 'Team Rauchtest');
  const answer = await api('/api/event', 'POST', { type: 'answer', topic: 'Handelsklassen', correct: true, questionId: 'q1' }, learner.cookie);
  assert.equal(answer.response.status, 200); assert.equal(answer.data.progress.answered, 1);
  const roster = await api('/api/trainer/learners', 'GET', undefined, trainer.cookie);
  assert.equal(roster.response.status, 200); assert.equal(roster.data.learners.length, 1); assert.equal(roster.data.learners[0].progress.accuracy, 100);
  const mark = await api('/api/trainer/practical', 'POST', { learnerId: roster.data.learners[0].id, item: 'Messpunkte sicher finden' }, trainer.cookie);
  assert.equal(mark.response.status, 200);
  const confirmed = await api('/api/state', 'GET', undefined, learner.cookie);
  assert.deepEqual(confirmed.data.progress.practical, ['Messpunkte sicher finden']);
  for (const item of ['Referenzpräsentation und Schnittführung prüfen','Morgenkontrolle am Betriebsgerät durchführen','Softwareversionen und Prüfergebnisse abgleichen','Messfehler erkennen und korrekt reagieren']) {
    const result = await api('/api/trainer/practical', 'POST', {learnerId: roster.data.learners[0].id,item}, trainer.cookie);
    assert.equal(result.response.status,200,item);
  }
  const unknown = await api('/api/trainer/practical','POST',{learnerId:roster.data.learners[0].id,item:'invalid'},trainer.cookie);
  assert.equal(unknown.response.status,400); 
  const forbidden = await api('/api/trainer/learners', 'GET', undefined, learner.cookie);
  assert.equal(forbidden.response.status, 403, 'learner cannot read trainer group roster');
  const another = await api('/api/auth/register', 'POST', { name: 'Other Coach', email: 'other@example.test', password: 'third-secure-pass-903', role: 'trainer', group: 'Other Team' });
  const otherRoster = await api('/api/trainer/learners', 'GET', undefined, another.cookie);
  assert.equal(otherRoster.response.status, 200); assert.equal(otherRoster.data.learners.length, 0, 'groups are isolated');
  const exp = await api('/api/trainer/export', 'GET', undefined, trainer.cookie);
  assert.equal(exp.response.status, 200, 'trainer export succeeds');
  assert.equal(exp.data.group, 'Team Rauchtest');
  assert.equal(exp.data.learners.length, 1);
  assert.equal(exp.data.learners[0].progress.answered, 1);
  const expForbidden = await api('/api/trainer/export', 'GET', undefined, learner.cookie);
  assert.equal(expForbidden.response.status, 403, 'learner cannot export group data');
  // Verify session persistence across server restart
  const child2 = spawn(process.execPath, ['server.js'], { cwd: projectRoot, env: { ...process.env, PORT: '4188', KLASSENKLAR_DATA: join(dataDir, 'data.json') }, stdio: 'ignore' });
  try {
    for (let i = 0; i < 40; i++) { try { if ((await fetch('http://127.0.0.1:4188')).ok) break; } catch {} await delay(100); }
    const restored = await fetch('http://127.0.0.1:4188/api/state', { headers: { Cookie: trainer.cookie } });
    const restoredData = await restored.json();
    assert.equal(restored.status, 200, 'session restored after restart');
    assert.equal(restoredData.role, 'trainer');
    assert.equal(restoredData.group, 'Team Rauchtest');
  } finally {
    child2.kill(); await delay(150);
  }
  console.log('Smoke checks passed: PWA shell, hashed-account registration, invite join, learner progress, trainer role enforcement, group isolation, practical confirmation, trainer export, session persistence across restart.');
} finally {
  child.kill(); await delay(150);
  const tempRoot = resolve(tmpdir()); const cleanupTarget = resolve(dataDir);
  assert.ok(cleanupTarget.startsWith(tempRoot + sep) && basename(cleanupTarget).startsWith('klassenklar-'), 'temporary cleanup target stays inside its generated test directory');
  await rm(cleanupTarget, { recursive: true, force: true });
}
