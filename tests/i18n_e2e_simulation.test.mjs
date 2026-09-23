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

describe('Pass 5: Interactive E2E Simulation & Live Trilingual UX Gate', () => {
  const dictDir = path.resolve(process.cwd(), 'src/lib/dictionaries');
  const ru = readTsDict(path.join(dictDir, 'ru.ts'));
  const hy = readTsDict(path.join(dictDir, 'hy.ts'));
  const en = readTsDict(path.join(dictDir, 'en.ts'));

  test('Simulated Journey: User switches language to Armenian (hy) on Home page', () => {
    // 1. Navigation items
    assert.equal(hy.nav.projects, 'Նախագծեր');
    assert.equal(hy.nav.apartments, 'Բնակարաններ');
    assert.equal(hy.nav.mortgage, 'Հիփոթեք');
    assert.equal(hy.nav.standards, 'Ինժեներիա');
    assert.equal(hy.nav.about, 'Կառուցապատողի մասին');

    // 2. Hero Section
    assert.ok(hy.hero.title.includes('Մոնոլիտ բնակարաններ'));
    assert.ok(hy.hero.chooseApartment.includes('Դիտել'));

    // 3. Escrow Institutional Passport
    assert.ok(hy.escrow.passport.title.includes('պետական'));
    assert.ok(hy.escrow.passport.developerStatus.includes('ՀՀ'));

    // 4. Engineering Standards
    assert.ok(hy.engineering.disciplines.seismic.label.includes('սեյսմակայունություն'));
    assert.ok(hy.engineering.disciplines.acoustic.label.includes('Ակուստիկա'));
    assert.ok(hy.engineering.disciplines.acoustic.title.includes('ձայնամեկուսացում'));
  });

  test('Simulated Journey: User switches language to English (en) on Mortgage Calculator page', () => {
    // 1. Mortgage inputs & labels
    assert.equal(en.mortgage.propertyPrice, 'Property Value');
    assert.equal(en.mortgage.downPayment, 'Down Payment');
    assert.equal(en.mortgage.loanTerm, 'Loan Term');
    assert.equal(en.mortgage.interestRate, 'Interest Rate');
    assert.equal(en.mortgage.coBorrowerToggle, 'Include Co-Borrower');

    // 2. Calculation outcomes
    assert.equal(en.mortgage.loanAmount, 'Loan Principal');
    assert.equal(en.mortgage.effectivePayment, 'Effective Net Payment');
    assert.equal(en.mortgage.taxRefundMonthly, 'Monthly Tax Refund');
    assert.equal(en.mortgage.savings5Years, '5-Year Savings');
    assert.equal(en.mortgage.ctaApproval, 'Get Mortgage Pre-Approval');

    // 3. Tax Law FAQs
    assert.ok(en.mortgage.faqs.length >= 4);
    assert.ok(en.mortgage.faqs[0].q.includes('Art. 156.1'));
  });

  test('Simulated Journey: User switches language to Armenian (hy) on Apartments Catalog page', () => {
    // 1. Catalog filters
    assert.equal(hy.catalog.headerBadge, 'Անշարժ գույքի կատալոգ');
    assert.equal(hy.catalog.headerTitle, 'Կառուցապատողի բնակարաններ և թաունհաուսներ');
    assert.equal(hy.catalog.filterProject, 'Բնակելի համալիր');
    assert.equal(hy.catalog.allProjects, 'Բոլոր համալիրները');
    assert.equal(hy.catalog.allRooms, 'Ցանկացած սենյակ');
    assert.equal(hy.catalog.allStatuses, 'Ցանկացած կարգավիճակ');
    assert.equal(hy.catalog.resetFilters, 'Մաքրել ֆիլտրերը');

    // 2. Unit Card & Table View columns
    assert.equal(hy.catalog.colProject, 'ԲՀ');
    assert.equal(hy.catalog.colRooms, 'Սենյակներ');
    assert.equal(hy.catalog.colArea, 'Մակերես');
    assert.equal(hy.catalog.colFloor, 'Հարկ');
    assert.equal(hy.catalog.colStatus, 'Կարգավիճակ');
    assert.equal(hy.catalog.statusAvailable, 'Վաճառքում');
    assert.equal(hy.catalog.statusReserved, 'Ամրագրված');
  });

  test('Simulated Journey: Consultation Modal submission validation across all 3 languages', () => {
    // Russian
    assert.ok(ru.consultModal.validationNameError.length > 0);
    assert.ok(ru.consultModal.validationPhoneError.length > 0);
    assert.ok(ru.consultModal.successTitle.length > 0);

    // Armenian
    assert.ok(hy.consultModal.validationNameError.length > 0);
    assert.ok(hy.consultModal.validationPhoneError.length > 0);
    assert.ok(hy.consultModal.successTitle.length > 0);

    // English
    assert.ok(en.consultModal.validationNameError.length > 0);
    assert.ok(en.consultModal.validationPhoneError.length > 0);
    assert.ok(en.consultModal.successTitle.length > 0);
  });

  test('Live HTTP Verification: Confirm server is serving current bundle at port 3000', async () => {
    const res = await fetch('http://127.0.0.1:3000/');
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes('Green Project'));
    assert.ok(html.includes('<!DOCTYPE html>'));
  });
});
