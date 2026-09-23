import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

function readTsDict(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const jsCode = code
    .replace(/import\s+type\s+[^;]+;/g, '')
    .replace(/import\s+[^;]+;/g, '')
    .replace(/export\s+const\s+([a-zA-Z0-9_]+)\s*:\s*Dictionary\s*=/g, 'const $1 =')
    .replace(/export\s+const\s+([a-zA-Z0-9_]+)\s*=/g, 'const $1 =')
    .replace(/export\s+default\s+([a-zA-Z0-9_]+);?/g, '');
  
  const func = new Function(`${jsCode}; return typeof ru !== 'undefined' ? ru : typeof hy !== 'undefined' ? hy : en;`);
  return func();
}

describe('Pass 3: Trilingual Lexical Audit & Zero Cyrillic Leakage Gate', () => {
  const cyrillicRegex = /[\u0400-\u04FF]/;
  const dictDir = path.resolve(process.cwd(), 'src/lib/dictionaries');
  const hy = readTsDict(path.join(dictDir, 'hy.ts'));
  const en = readTsDict(path.join(dictDir, 'en.ts'));

  function findCyrillicInObject(obj, pathPrefix = '') {
    const leaks = [];
    for (const [k, v] of Object.entries(obj)) {
      const currentPath = pathPrefix ? `${pathPrefix}.${k}` : k;
      if (typeof v === 'string') {
        if (cyrillicRegex.test(v)) {
          leaks.push({ path: currentPath, value: v });
        }
      } else if (Array.isArray(v)) {
        v.forEach((item, idx) => {
          if (typeof item === 'string' && cyrillicRegex.test(item)) {
            leaks.push({ path: `${currentPath}[${idx}]`, value: item });
          } else if (typeof item === 'object' && item !== null) {
            leaks.push(...findCyrillicInObject(item, `${currentPath}[${idx}]`));
          }
        });
      } else if (typeof v === 'object' && v !== null) {
        leaks.push(...findCyrillicInObject(v, currentPath));
      }
    }
    return leaks;
  }

  test('Armenian (hy) dictionary contains exactly 0 Cyrillic characters', () => {
    const leaks = findCyrillicInObject(hy, 'hy');
    assert.deepEqual(
      leaks,
      [],
      `Cyrillic characters found in Armenian dictionary:\n${JSON.stringify(leaks, null, 2)}`
    );
  });

  test('English (en) dictionary contains exactly 0 Cyrillic characters', () => {
    const leaks = findCyrillicInObject(en, 'en');
    assert.deepEqual(
      leaks,
      [],
      `Cyrillic characters found in English dictionary:\n${JSON.stringify(leaks, null, 2)}`
    );
  });

  test('Armenian dictionary uses authentic Armenian alphabet (U+0530 to U+058F)', () => {
    const armenianRegex = /[\u0530-\u058F]/;
    let armenianStringsCount = 0;

    function countArmenian(obj) {
      for (const v of Object.values(obj)) {
        if (typeof v === 'string') {
          if (armenianRegex.test(v)) armenianStringsCount++;
        } else if (Array.isArray(v)) {
          v.forEach((item) => {
            if (typeof item === 'string' && armenianRegex.test(item)) armenianStringsCount++;
            else if (typeof item === 'object' && item !== null) countArmenian(item);
          });
        } else if (typeof v === 'object' && v !== null) {
          countArmenian(v);
        }
      }
    }

    countArmenian(hy);
    assert.ok(
      armenianStringsCount > 150,
      `Expected over 150 Armenian strings in hy dictionary, found ${armenianStringsCount}`
    );
  });

  test('Dynamic catalog localization file (catalogLocalization.ts) contains full project translations for HY and EN', () => {
    const catLocFile = path.resolve(process.cwd(), 'src/lib/catalogLocalization.ts');
    const content = fs.readFileSync(catLocFile, 'utf8');

    // Assert that project mappings exist for avan, nork, and townhouse in HY and EN
    assert.ok(content.includes('PROJECT_TRANSLATIONS'), 'Must have typed PROJECT_TRANSLATIONS');
    assert.ok(content.includes('Green Avan'), 'Must have Green Avan');
    assert.ok(content.includes('Green Nork'), 'Must have Green Nork');
    assert.ok(content.includes('Green Townhouse'), 'Must have Green Townhouse');
    assert.ok(content.includes('Ավան'), 'Must have Armenian district Avan');
    assert.ok(content.includes('Նոր Նորք'), 'Must have Armenian district Nor Nork');
    assert.ok(content.includes('Քասախ'), 'Must have Armenian district Kasakh');
    assert.ok(content.includes('Kotayk'), 'Must have English district Kotayk');
  });
});
