const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const context = vm.createContext({});
for (const file of ['equipment.js', 'curriculum.js']) {
  vm.runInContext(fs.readFileSync(`public/${file}`, 'utf8'), context, {filename:file});
}
const app = fs.readFileSync('public/app.js', 'utf8');
vm.runInContext(app.slice(0, app.indexOf('const state=')), context);
const data = vm.runInContext('({lessons,questions,cards,TOPICS})', context);
for (const kind of ['lessons', 'questions']) {
  assert.equal(new Set(data[kind].map(x => x.id)).size, data[kind].length, `${kind}: duplicate IDs`);
}
assert.equal(new Set(data.cards.map(c => c[0])).size, data.cards.length);
for (const lesson of data.lessons) {
  assert(data.TOPICS.includes(lesson.topic));
  assert(lesson.body.length >= 3 && lesson.en && lesson.minutes > 0, lesson.id);
  if (lesson.questionIds) {
    assert(lesson.questionIds.length > 0, `${lesson.id}: empty lesson practice`);
    for (const id of lesson.questionIds) assert(data.questions.some(q=>q.id===id), `${lesson.id}: missing question ${id}`);
  }
  for (const table of lesson.tables || []) for (const row of table.rows) assert.equal(row.length, table.headers.length);
  for (const [,url] of lesson.refs || []) assert(url.startsWith('https://'));
  for (const figure of lesson.figures || []) {
    if (figure.afterParagraph !== undefined) assert(Number.isInteger(figure.afterParagraph) && figure.afterParagraph >= 0 && figure.afterParagraph < lesson.body.length, `${lesson.id}: invalid illustration position`);
    assert(figure.caption && figure.src.startsWith('/') && !figure.src.includes('..'), lesson.id);
    assert(fs.existsSync(`public${figure.src}`), `${lesson.id}: missing figure ${figure.src}`);
    if (figure.src.endsWith('.svg')) {
      const svg = fs.readFileSync(`public${figure.src}`, 'utf8');
      assert(svg.includes('<title') && svg.includes('<desc') && svg.includes('viewBox='), `${lesson.id}: accessible scalable illustration required`);
    }
  }
}
for (const question of data.questions) {
  assert(data.TOPICS.includes(question.topic), question.id);
  assert.equal(question.opts.length, 4, question.id);
  assert.equal(new Set(question.opts).size, 4, question.id);
  assert(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4, question.id);
  assert(question.why && question.q, question.id);
}
const zp = (s,f) => 58.10122 - .56495*s + .13199*f;
assert(Math.abs(zp(16,60) - 56.98142) < 1e-8);
assert(Math.abs(zp(20,60) - 54.72162) < 1e-8);
assert(Math.abs(zp(10,70) - 61.69102) < 1e-8);
assert(Math.abs((1.2093+96.8*.0814)*2 - 18.17764) < 1e-8);
assert(Math.abs((.2505+96.8*.0336)*2 - 7.00596) < 1e-8);
assert.equal((( -.0451+96.8*.0471)*2).toFixed(2),'9.03');
assert.equal(((-1.3502+96.8*.0853)*2).toFixed(2),'13.81');
for (const topic of data.TOPICS) {
  assert(data.lessons.some(l => l.topic === topic));
  assert(data.questions.filter(q => q.topic === topic).length >= 5, `${topic}: insufficient question coverage`);
}
console.log(`${data.lessons.length} lessons, ${data.questions.length} questions, ${data.cards.length} flashcards: structure, topic coverage and calculations passed.`);

for (const count of [7,10,30,50,100]) {
 const selected=vm.runInContext('balancedQuestions(questions,'+count+')',context);
 assert.equal(selected.length,Math.min(count,data.questions.length));
 assert.equal(new Set(selected.map(q=>q.id)).size,selected.length);
 assert.equal(new Set(selected.map(q=>q.topic)).size,7);
}
console.log('Mixed practice includes all seven topics without duplicate questions.');

assert.equal(vm.runInContext('questions.filter(q=>questionType(q)==="image").length',context),2);
assert(vm.runInContext('questions.some(q=>q.topic==="Anatomie" && questionType(q)==="text")',context));
console.log('Anatomy text questions remain available with text-only practice.');

assert(Math.abs(vm.runInContext('calculateMfa("zp",16,60)',context)-56.98142)<1e-8);
assert(Math.abs(vm.runInContext('calculateMfa("probe",16,60)',context)-57.12145)<1e-8);
for(const [n,c] of [[60,'S'],[55,'E'],[50,'U'],[45,'R'],[40,'O'],[39.99,'P']])assert.equal(vm.runInContext('mfaClass('+n+')',context),c);
console.log('Interactive MFA formulas and class boundaries passed.');

assert.equal(vm.runInContext('dueCards([["new"],["old"],["later"]],{old:{due:"2026-10-03"},later:{due:"2026-10-07"}},"2026-10-04").length',context),2);
console.log('Flashcard review excludes future due dates and includes new cards.');
