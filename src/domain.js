/** Pure rules for Compasso. Times and durations are integer minutes. */
function fail(message) { throw new Error(message); }

function text(value, name, max, allowEmpty = false) {
  if (typeof value !== 'string') fail(`${name} precisa ser um texto.`);
  const result = value.trim();
  if ((!allowEmpty && !result) || result.length > max) {
    fail(`${name} deve ter ${allowEmpty ? 'até' : 'entre 1 e'} ${max} caracteres.`);
  }
  return result;
}

function integer(value, name, min, max) {
  if (!Number.isInteger(value) || value < min || value > max) {
    fail(`${name} deve ser um número inteiro entre ${min} e ${max}.`);
  }
  return value;
}

/** Validate untrusted imports and return only supported fields in a fresh object. */
export function validatePlan(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) fail('O arquivo precisa conter uma agenda.');
  if (input.version !== 1) fail('Versão de agenda não suportada. Use um arquivo Compasso versão 1.');
  const title = text(input.title, 'O nome da agenda', 120);
  if (typeof input.start !== 'string' || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(input.start)) {
    fail('O início deve ser um horário válido no formato HH:MM.');
  }
  if (!Array.isArray(input.blocks) || input.blocks.length > 60) fail('A agenda pode ter no máximo 60 blocos.');
  const ids = new Set();
  const blocks = input.blocks.map((block, index) => {
    const label = `Bloco ${index + 1}`;
    if (!block || typeof block !== 'object' || Array.isArray(block)) fail(`${label} é inválido.`);
    const id = text(block.id, `${label}: identificador`, 80);
    if (ids.has(id)) fail('Cada bloco precisa ter um identificador diferente.');
    ids.add(id);
    const duration = integer(block.duration, `${label}: duração`, 1, 240);
    const minDuration = integer(block.minDuration, `${label}: duração mínima`, 1, duration);
    if (typeof block.locked !== 'boolean') fail(`${label}: a proteção de duração deve ser verdadeira ou falsa.`);
    return {
      id,
      title: text(block.title, `${label}: título`, 120),
      duration,
      minDuration,
      locked: block.locked,
      notes: text(block.notes, `${label}: notas`, 2000, true),
    };
  });
  const total = blocks.reduce((sum, block) => sum + block.duration, 0);
  if (total > 720) fail('A agenda deve durar no máximo 12 horas.');
  if (toMinutes(input.start) + total > 1440) fail('A agenda deve terminar até a meia-noite do mesmo dia.');
  return { version: 1, title, start: input.start, blocks };
}

function toMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function formatTime(minutes) {
  integer(minutes, 'O horário em minutos', 0, 1440);
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

export function schedule(input) {
  const plan = validatePlan(input);
  let cursor = toMinutes(plan.start);
  return plan.blocks.map(block => {
    const start = cursor;
    cursor += block.duration;
    return { ...block, start, end: cursor };
  });
}

/** Allocate cuts by available flexibility; ties favor the earlier block. */
export function rebalance(input, delay, fromIndex = 0) {
  const plan = validatePlan(input);
  integer(delay, 'O atraso', 0, 240);
  integer(fromIndex, 'O primeiro bloco ajustável', 0, plan.blocks.length);
  const candidates = plan.blocks.map((block, index) => ({
    index,
    capacity: index >= fromIndex && !block.locked ? block.duration - block.minDuration : 0,
  })).filter(item => item.capacity > 0);
  const capacity = candidates.reduce((sum, item) => sum + item.capacity, 0);
  const recovered = Math.min(delay, capacity);
  if (recovered === 0) return { plan, recovered: 0, unresolved: delay, changes: [] };

  // Use integer remainder arithmetic, avoiding floating-point tie instability.
  const cuts = candidates.map(item => ({
    ...item,
    cut: Math.floor(recovered * item.capacity / capacity),
    remainder: (recovered * item.capacity) % capacity,
  }));
  let remaining = recovered - cuts.reduce((sum, item) => sum + item.cut, 0);
  const ranked = [...cuts].sort((a, b) => b.remainder - a.remainder || a.index - b.index);
  for (const item of ranked) {
    if (remaining === 0) break;
    item.cut += 1;
    remaining -= 1;
  }
  const changes = [];
  for (const { index, cut } of cuts) {
    if (!cut) continue;
    const block = plan.blocks[index];
    changes.push({ id: block.id, title: block.title, before: block.duration, after: block.duration - cut });
    block.duration -= cut;
  }
  return { plan: validatePlan(plan), recovered, unresolved: delay - recovered, changes };
}
