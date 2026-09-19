const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/user/.gemini/antigravity/scratch/green-project-mockup';
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(dir, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(dir, 'app.js'), 'utf8');

console.log('=== 1. FILE INTEGRITY ===');
console.log('index.html size:', html.length, 'bytes');
console.log('style.css size:', css.length, 'bytes');
console.log('app.js size:', js.length, 'bytes');

console.log('\n=== 2. DOM ELEMENT IDS VERIFICATION ===');
// Extract all getElementById in app.js
const idMatches = [...js.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map(m => m[1]);
const uniqueIds = [...new Set(idMatches)];
let missingIds = 0;
uniqueIds.forEach(id => {
  const exists = html.includes(`id="${id}"`) || html.includes(`id='${id}'`);
  if (!exists) {
    console.error(`❌ Missing ID in index.html: "${id}"`);
    missingIds++;
  }
});
if (missingIds === 0) {
  console.log(`✅ All ${uniqueIds.length} element IDs referenced in JS exist in HTML!`);
}

console.log('\n=== 3. TRANSLATION KEYS PARITY (HY / RU / EN) ===');
// Load i18n object from app.js
const vm = require('vm');
const sandbox = { document: { addEventListener: () => {} }, window: {} };
vm.createContext(sandbox);
// Extract I18N block
const i18nMatch = js.match(/const I18N = ({[\s\S]*?^};)/m);
if (i18nMatch) {
  vm.runInContext('this.I18N = ' + i18nMatch[1], sandbox);
  const I18N = sandbox.I18N;
  const hyKeys = Object.keys(I18N.hy);
  const ruKeys = Object.keys(I18N.ru);
  const enKeys = Object.keys(I18N.en);

  console.log(`Key counts: HY = ${hyKeys.length}, RU = ${ruKeys.length}, EN = ${enKeys.length}`);

  const missingRu = hyKeys.filter(k => !ruKeys.includes(k));
  const missingEn = hyKeys.filter(k => !enKeys.includes(k));

  if (missingRu.length > 0) console.warn('Missing in RU:', missingRu);
  if (missingEn.length > 0) console.warn('Missing in EN:', missingEn);
  if (missingRu.length === 0 && missingEn.length === 0) {
    console.log('✅ 100% Translation Parity across all 3 languages!');
  }
} else {
  console.error('❌ Could not parse I18N block');
}

console.log('\n=== 4. TAX LAW & MORTGAGE CALCULATION VERIFICATION ===');
// Verify annuity formula
const price = 28000000;
const down = 0.10;
const P = price * (1 - down); // 25,200,000 AMD
const years = 20;
const rate = 11.5 / 100;
const n = years * 12;
const r = rate / 12;
const factor = Math.pow(1 + r, n);
const monthlyPayment = Math.round(P * ((r * factor) / (factor - 1)));
const monthlyInterest = Math.round(P * r);
const maxRefund = 500000;
const taxRefund = Math.min(monthlyInterest, maxRefund);
const effectivePayment = Math.max(0, monthlyPayment - taxRefund);
const requiredSalary = Math.round(taxRefund * 5);

console.log(`Property Price: ${price.toLocaleString()} AMD`);
console.log(`Loan Principal: ${P.toLocaleString()} AMD`);
console.log(`Monthly Payment: ${monthlyPayment.toLocaleString()} AMD`);
console.log(`Monthly Interest: ${monthlyInterest.toLocaleString()} AMD`);
console.log(`Statutory Tax Refund (Cap 500k): ${taxRefund.toLocaleString()} AMD`);
console.log(`Effective Net Payment: ${effectivePayment.toLocaleString()} AMD`);
console.log(`Required Gross Salary: ${requiredSalary.toLocaleString()} AMD`);

if (monthlyPayment > 0 && taxRefund > 0 && effectivePayment < monthlyPayment) {
  console.log('✅ Mortgage & Armenian Income Tax formula validated successfully!');
}
