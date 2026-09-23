import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Helper to extract exported dictionary objects from TS files using dynamic evaluation or regex parsing
function readTsDict(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  // Strip TypeScript types like ": Dictionary", ": MetricItem[]", etc.
  const jsCode = code
    .replace(/import\s+type\s+[^;]+;/g, '')
    .replace(/import\s+[^;]+;/g, '')
    .replace(/export\s+const\s+([a-zA-Z0-9_]+)\s*:\s*Dictionary\s*=/g, 'const $1 =')
    .replace(/export\s+const\s+([a-zA-Z0-9_]+)\s*=/g, 'const $1 =')
    .replace(/export\s+default\s+([a-zA-Z0-9_]+);?/g, '');
  
  const func = new Function(`${jsCode}; return typeof ru !== 'undefined' ? ru : typeof hy !== 'undefined' ? hy : en;`);
  return func();
}

describe('Pass 2: Trilingual Dictionary Parity & Key Completeness Gate', () => {
  const dictDir = path.resolve(process.cwd(), 'src/lib/dictionaries');
  const ru = readTsDict(path.join(dictDir, 'ru.ts'));
  const hy = readTsDict(path.join(dictDir, 'hy.ts'));
  const en = readTsDict(path.join(dictDir, 'en.ts'));

  function getDeepKeys(obj, prefix = '') {
    let keys = [];
    for (const [k, v] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${k}` : k;
      if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
        keys = keys.concat(getDeepKeys(v, fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    return keys;
  }

  const ruKeys = getDeepKeys(ru).sort();
  const hyKeys = getDeepKeys(hy).sort();
  const enKeys = getDeepKeys(en).sort();

  test('RU and HY dictionaries must have identical key structures', () => {
    const missingInHy = ruKeys.filter((k) => !hyKeys.includes(k));
    const extraInHy = hyKeys.filter((k) => !ruKeys.includes(k));

    assert.deepEqual(missingInHy, [], `Keys missing in Armenian (hy): ${missingInHy.join(', ')}`);
    assert.deepEqual(extraInHy, [], `Extra keys found in Armenian (hy): ${extraInHy.join(', ')}`);
    assert.equal(hyKeys.length, ruKeys.length, `Expected ${ruKeys.length} keys, got ${hyKeys.length}`);
  });

  test('RU and EN dictionaries must have identical key structures', () => {
    const missingInEn = ruKeys.filter((k) => !enKeys.includes(k));
    const extraInEn = enKeys.filter((k) => !ruKeys.includes(k));

    assert.deepEqual(missingInEn, [], `Keys missing in English (en): ${missingInEn.join(', ')}`);
    assert.deepEqual(extraInEn, [], `Extra keys found in English (en): ${extraInEn.join(', ')}`);
    assert.equal(enKeys.length, ruKeys.length, `Expected ${ruKeys.length} keys, got ${enKeys.length}`);
  });

  test('All string values in all 3 languages must be non-empty and non-undefined', () => {
    function assertNoEmptyValues(obj, lang, pathPrefix = '') {
      for (const [k, v] of Object.entries(obj)) {
        const currentPath = pathPrefix ? `${pathPrefix}.${k}` : k;
        if (typeof v === 'string') {
          assert.ok(v.trim().length > 0, `Empty string at [${lang}] ${currentPath}`);
        } else if (Array.isArray(v)) {
          assert.ok(v.length > 0, `Empty array at [${lang}] ${currentPath}`);
          v.forEach((item, idx) => {
            if (typeof item === 'string') {
              assert.ok(item.trim().length > 0, `Empty item in array at [${lang}] ${currentPath}[${idx}]`);
            } else if (typeof item === 'object' && item !== null) {
              assertNoEmptyValues(item, lang, `${currentPath}[${idx}]`);
            }
          });
        } else if (typeof v === 'object' && v !== null) {
          assertNoEmptyValues(v, lang, currentPath);
        } else {
          assert.fail(`Unexpected type at [${lang}] ${currentPath}: ${typeof v}`);
        }
      }
    }

    assertNoEmptyValues(ru, 'ru');
    assertNoEmptyValues(hy, 'hy');
    assertNoEmptyValues(en, 'en');
  });

  test('Array symmetry: Engineering disciplines metrics and checklists must have equal counts', () => {
    const disciplines = ['seismic', 'acoustic', 'energy', 'engineering'];
    for (const d of disciplines) {
      assert.equal(ru.engineering.disciplines[d].metrics.length, hy.engineering.disciplines[d].metrics.length);
      assert.equal(ru.engineering.disciplines[d].metrics.length, en.engineering.disciplines[d].metrics.length);
      assert.equal(ru.engineering.disciplines[d].layers.length, hy.engineering.disciplines[d].layers.length);
      assert.equal(ru.engineering.disciplines[d].layers.length, en.engineering.disciplines[d].layers.length);
      assert.equal(ru.engineering.disciplines[d].checks.length, hy.engineering.disciplines[d].checks.length);
      assert.equal(ru.engineering.disciplines[d].checks.length, en.engineering.disciplines[d].checks.length);
    }
  });

  test('Array symmetry: Comparative Matrix and Escrow Steps must match across all 3 languages', () => {
    assert.equal(ru.engineering.matrix.rows.length, hy.engineering.matrix.rows.length);
    assert.equal(ru.engineering.matrix.rows.length, en.engineering.matrix.rows.length);
    assert.equal(ru.escrow.steps.length, hy.escrow.steps.length);
    assert.equal(ru.escrow.steps.length, en.escrow.steps.length);
    assert.equal(ru.escrow.banks.length, hy.escrow.banks.length);
    assert.equal(ru.escrow.banks.length, en.escrow.banks.length);
    assert.equal(ru.mortgage.faqs.length, hy.mortgage.faqs.length);
    assert.equal(ru.mortgage.faqs.length, en.mortgage.faqs.length);
  });
});
