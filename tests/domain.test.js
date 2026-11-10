import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePlan, schedule, rebalance, formatTime } from '../src/domain.js';

function block(id, duration = 20, minDuration = 10, locked = false) {
  return { id, title: `Atividade ${id}`, duration, minDuration, locked, notes: '' };
}
function plan(blocks = [block('a'), block('b'), block('c', 10, 10, true)]) {
  return { version: 1, title: 'Oficina', start: '09:00', blocks };
}

test('agenda sanitizada é independente e descarta campos não suportados de imports', () => {
  const input = JSON.parse('{"version":1,"title":" Oficina ","start":"09:00","blocks":[],"__proto__":{"polluted":true},"secret":"x"}');
  const result = validatePlan(input);
  assert.deepEqual(result, { version: 1, title: 'Oficina', start: '09:00', blocks: [] });
  assert.equal({}.polluted, undefined);
  const original = plan();
  original.blocks[0].unexpected = 'ignored';
  const copy = validatePlan(original);
  assert.equal(copy.blocks[0].unexpected, undefined);
  copy.blocks[0].title = 'Alterado';
  assert.equal(original.blocks[0].title, 'Atividade a');
});

test('validação rejeita estrutura, versão, horário e textos inválidos', () => {
  for (const input of [null, [], {}, { ...plan(), version: 2 }, { ...plan(), title: '' }, { ...plan(), title: 'x'.repeat(121) }]) {
    assert.throws(() => validatePlan(input));
  }
  for (const start of ['9:00', '24:00', '12:60', 900, '09:00\n']) {
    assert.throws(() => validatePlan({ ...plan(), start }));
  }
  assert.throws(() => validatePlan(plan([{ ...block('a'), notes: 'x'.repeat(2001) }])));
});

test('validação rejeita durações não inteiras, limites e mínimos maiores', () => {
  for (const duration of [0, -1, 1.5, 241, NaN, Infinity, '20']) {
    assert.throws(() => validatePlan(plan([{ ...block('a'), duration }])));
  }
  for (const minDuration of [0, -1, 21, 1.5]) {
    assert.throws(() => validatePlan(plan([{ ...block('a'), minDuration }])));
  }
  assert.throws(() => validatePlan(plan([{ ...block('a'), locked: 'false' }])));
});

test('validação limita quantidade, identificadores, total e virada do dia', () => {
  assert.throws(() => validatePlan(plan([block('a'), block('a')])));
  assert.throws(() => validatePlan(plan([block('')])));
  assert.throws(() => validatePlan(plan([block('x'.repeat(81))])));
  assert.throws(() => validatePlan(plan(Array.from({ length: 61 }, (_, i) => block(String(i), 1, 1)))));
  assert.throws(() => validatePlan(plan(Array.from({ length: 4 }, (_, i) => block(String(i), 240, 1)))));
  assert.throws(() => validatePlan({ ...plan([block('a')]), start: '23:50' }));
  assert.doesNotThrow(() => validatePlan({ ...plan([block('a', 10, 1)]), start: '23:50' }));
});

test('cronograma é cumulativo, suporta agenda vazia e meia-noite exata', () => {
  assert.deepEqual(schedule(plan()).map(({ start, end }) => [start, end]), [[540, 560], [560, 580], [580, 590]]);
  assert.deepEqual(schedule(plan([])), []);
  assert.equal(formatTime(schedule({ ...plan([block('a', 10, 1)]), start: '23:50' })[0].end), '24:00');
  assert.equal(formatTime(5), '00:05');
  assert.throws(() => formatTime(-1));
  assert.throws(() => formatTime(1441));
});

test('recuperação proporcional arredonda por maior resto e preserva entrada', () => {
  const original = plan([block('a', 20, 10), block('b', 40, 10)]);
  const before = structuredClone(original);
  const result = rebalance(original, 11);
  assert.deepEqual(result.plan.blocks.map(b => b.duration), [17, 32]);
  assert.equal(result.recovered, 11);
  assert.equal(result.unresolved, 0);
  assert.deepEqual(result.changes, [
    { id: 'a', title: 'Atividade a', before: 20, after: 17 },
    { id: 'b', title: 'Atividade b', before: 40, after: 32 },
  ]);
  assert.deepEqual(original, before);
});

test('empate de arredondamento é determinístico pela ordem da agenda', () => {
  assert.deepEqual(rebalance(plan(), 1).plan.blocks.map(b => b.duration), [19, 20, 10]);
});

test('blocos protegidos e anteriores ao ponto escolhido nunca são cortados', () => {
  const result = rebalance(plan([block('a'), block('b', 20, 1, true), block('c')]), 15, 1);
  assert.deepEqual(result.plan.blocks.map(b => b.duration), [20, 20, 10]);
  assert.equal(result.recovered, 10);
  assert.equal(result.unresolved, 5);
});

test('sem flexibilidade, zero atraso e fim da agenda retornam resultados honestos', () => {
  assert.equal(rebalance(plan([block('a', 20, 20)]), 12).unresolved, 12);
  assert.deepEqual(rebalance(plan(), 0).changes, []);
  assert.equal(rebalance(plan([]), 12).recovered, 0);
  assert.equal(rebalance(plan(), 12, 3).unresolved, 12);
});

test('valida atraso e índice antes de recalcular', () => {
  for (const delay of [-1, 241, 1.5, '5', NaN]) assert.throws(() => rebalance(plan(), delay));
  for (const index of [-1, 4, 0.5, '0']) assert.throws(() => rebalance(plan(), 10, index));
});

test('recuperação repetida não ultrapassa mínimos e conserva minutos em muitos cenários', () => {
  for (let delay = 0; delay <= 120; delay += 1) {
    const input = plan([block('a', 35, 10), block('b', 42, 12), block('c', 22, 20), block('d', 12, 1, true)]);
    const result = rebalance(input, delay);
    const removed = input.blocks.reduce((sum, b, i) => sum + b.duration - result.plan.blocks[i].duration, 0);
    assert.equal(removed, result.recovered);
    assert.equal(result.recovered + result.unresolved, delay);
    assert.equal(result.recovered, Math.min(delay, 57));
    for (const b of result.plan.blocks) assert.ok(b.duration >= b.minDuration);
    assert.equal(result.plan.blocks[3].duration, 12);
    const again = rebalance(result.plan, 120);
    assert.deepEqual(again.plan.blocks.map(b => b.duration), [10, 12, 20, 12]);
  }
});
