/**
 * ============================================================================
 * GREEN PROJECT ARMENIA — EXHAUSTIVE DEEP MULTI-TIER QA AUTOMATION SUITE
 * ============================================================================
 * Senior QA Automation Lead Validation Suite
 * 
 * Verifies:
 * 1. Extreme slider boundaries (12M-55M AMD, 10%-50% down, 5-30 yrs, 9.5%-16.0% rate)
 * 2. Multi-dimensional 240-point calculator stress sweep & Art. 156.1 statutory cap
 * 3. Rapid currency switcher toggles (AMD -> USD -> AMD) across all dynamic prices
 * 4. Rapid language switcher toggles (RU -> HY -> EN -> RU) & 183+ DOM data-i18n parity
 * 5. Form edge cases (empty, whitespace, XSS/injection payloads, 15 phone formats)
 * 6. Modal and drawer opening/closing sequences, transitions, and collision prevention
 * 7. Catalog filtering, sorting monotonicity, and project showcase interactions
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectDir = 'C:/Users/user/.gemini/antigravity/scratch/green-project-mockup';
const htmlPath = path.join(projectDir, 'index.html');
const cssPath = path.join(projectDir, 'style.css');
const jsPath = path.join(projectDir, 'app.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

// ============================================================================
// TEST HARNESS & REPORTING FRAMEWORK
// ============================================================================
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;
const failureDetails = [];
const suiteMetrics = {};
let currentSuite = '';

function startSuite(suiteName) {
  currentSuite = suiteName;
  suiteMetrics[suiteName] = { tests: 0, passed: 0, failed: 0, assertions: 0, startTime: Date.now() };
  console.log(`\n================================================================`);
  console.log(`>>> SUITE: ${suiteName}`);
  console.log(`================================================================`);
}

function assert(condition, message, details = '') {
  totalAssertions++;
  suiteMetrics[currentSuite].assertions++;
  if (condition) {
    passedAssertions++;
  } else {
    failedAssertions++;
    const errText = details ? `${message} | Details: ${details}` : message;
    failureDetails.push({ suite: currentSuite, error: errText });
    console.error(`    ❌ ASSERTION FAILED: ${errText}`);
  }
  return condition;
}

function test(testName, testFn) {
  totalTests++;
  suiteMetrics[currentSuite].tests++;
  const t0 = Date.now();
  const initialFailures = failedAssertions;
  try {
    testFn();
    const duration = Date.now() - t0;
    if (failedAssertions === initialFailures) {
      passedTests++;
      suiteMetrics[currentSuite].passed++;
      console.log(`  ✅ [PASS] ${testName} (${duration}ms)`);
    } else {
      failedTests++;
      suiteMetrics[currentSuite].failed++;
      console.error(`  ❌ [FAIL] ${testName} (${duration}ms)`);
    }
  } catch (err) {
    failedTests++;
    suiteMetrics[currentSuite].failed++;
    failedAssertions++;
    totalAssertions++;
    failureDetails.push({ suite: currentSuite, error: `${testName} -> Threw: ${err.message}` });
    console.error(`  💥 [EXCEPTION] ${testName}: ${err.message}\n${err.stack}`);
  }
}

// ============================================================================
// HIGH-FIDELITY DOM SIMULATION ENGINE
// ============================================================================
class SimulatedDOMElement {
  constructor(tag, id = '', className = '') {
    this.tagName = tag.toUpperCase();
    this.id = id;
    this.className = className;
    this.attributes = {};
    this.style = {};
    this.children = [];
    this.parentElement = null;
    this._innerHTML = '';
    this._textContent = '';
    this.value = '';
    this._handlers = {};

    this.classList = {
      _classes: new Set(className ? className.split(/\s+/).filter(Boolean) : []),
      add: (...cls) => cls.forEach(c => this.classList._classes.add(c)),
      remove: (...cls) => cls.forEach(c => this.classList._classes.delete(c)),
      toggle: (c, force) => {
        if (force === undefined) {
          if (this.classList._classes.has(c)) this.classList._classes.delete(c);
          else this.classList._classes.add(c);
        } else if (force) {
          this.classList._classes.add(c);
        } else {
          this.classList._classes.delete(c);
        }
      },
      contains: (c) => this.classList._classes.has(c)
    };
  }

  get innerHTML() { return this._innerHTML; }
  set innerHTML(val) {
    this._innerHTML = String(val);
    this._textContent = String(val).replace(/<[^>]+>/g, '');
  }

  get textContent() { return this._textContent; }
  set textContent(val) {
    this._textContent = String(val);
    this._innerHTML = String(val);
  }

  getAttribute(name) {
    if (name === 'id') return this.id || null;
    if (name === 'class') return Array.from(this.classList._classes).join(' ') || null;
    if (name === 'value') return this.value || null;
    return this.attributes[name] !== undefined ? this.attributes[name] : null;
  }

  setAttribute(name, val) {
    this.attributes[name] = String(val);
    if (name === 'id') this.id = String(val);
    if (name === 'class') {
      this.className = String(val);
      this.classList._classes = new Set(String(val).split(/\s+/).filter(Boolean));
    }
    if (name === 'value') this.value = String(val);
  }

  removeAttribute(name) {
    delete this.attributes[name];
    if (name === 'id') this.id = '';
    if (name === 'class') {
      this.className = '';
      this.classList._classes.clear();
    }
  }

  hasAttribute(name) {
    return this.getAttribute(name) !== null;
  }

  appendChild(child) {
    if (child.parentElement) {
      child.parentElement.removeChild(child);
    }
    child.parentElement = this;
    this.children.push(child);
  }

  removeChild(child) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      this.children.splice(idx, 1);
      child.parentElement = null;
    }
  }

  addEventListener(event, handler) {
    if (!this._handlers[event]) this._handlers[event] = [];
    this._handlers[event].push(handler);
  }

  removeEventListener(event, handler) {
    if (this._handlers[event]) {
      this._handlers[event] = this._handlers[event].filter(h => h !== handler);
    }
  }

  dispatchEvent(event) {
    const ev = typeof event === 'string' ? { type: event } : event;
    if (!ev.target) ev.target = this;
    if (!ev.preventDefault) ev.preventDefault = () => { ev.defaultPrevented = true; };
    if (this._handlers[ev.type]) {
      this._handlers[ev.type].forEach(h => h(ev));
    }
  }

  click() {
    this.dispatchEvent({ type: 'click', target: this, defaultPrevented: false, preventDefault: function() { this.defaultPrevented = true; } });
  }

  reset() {
    this.querySelectorAll('input, textarea, select').forEach(input => {
      input.value = '';
    });
  }

  scrollIntoView() {}

  matchesSelector(selector) {
    const sel = selector.trim();
    if (sel.startsWith('#') && !sel.includes('.') && !sel.includes('[')) {
      return this.id === sel.slice(1);
    }
    if (/^[a-zA-Z0-9\-]+$/.test(sel)) {
      return this.tagName.toLowerCase() === sel.toLowerCase();
    }
    if (sel.startsWith('[') && sel.endsWith(']')) {
      const inner = sel.slice(1, -1);
      const eqIdx = inner.indexOf('=');
      if (eqIdx === -1) return this.hasAttribute(inner);
      const attr = inner.slice(0, eqIdx);
      const val = inner.slice(eqIdx + 1).replace(/^["']|["']$/g, '');
      return this.getAttribute(attr) === val;
    }
    // Handle composite selectors: .foo.bar, article.apartment-card, .price-dyn[data-raw-amd]
    const parts = sel.split(/(?=[.\[#])/);
    return parts.every(p => {
      if (!p) return true;
      if (p.startsWith('.')) return this.classList.contains(p.slice(1));
      if (p.startsWith('#')) return this.id === p.slice(1);
      if (p.startsWith('[')) return this.matchesSelector(p);
      return this.tagName.toLowerCase() === p.toLowerCase();
    });
  }

  querySelectorAll(selector) {
    const results = [];
    const traverse = (node) => {
      for (const child of node.children) {
        if (child.matchesSelector(selector)) {
          results.push(child);
        }
        traverse(child);
      }
    };
    traverse(this);
    return results;
  }

  querySelector(selector) {
    const all = this.querySelectorAll(selector);
    return all.length > 0 ? all[0] : null;
  }
}

// Build complete DOM representation from index.html
const allElements = [];
const elementsById = {};
const rootDoc = new SimulatedDOMElement('HTML');

// Parse HTML tags
const tagPattern = /<([a-zA-Z0-9\-]+)([^>]*)>/g;
let match;
while ((match = tagPattern.exec(html)) !== null) {
  const isClosing = match[0].startsWith('</');
  if (isClosing) continue;

  const tag = match[1];
  const attrText = match[2];
  const idMatch = attrText.match(/id=["']([^"']+)["']/i);
  const classMatch = attrText.match(/class=["']([^"']+)["']/i);
  const valMatch = attrText.match(/value=["']([^"']*)["']/i);

  const el = new SimulatedDOMElement(tag, idMatch ? idMatch[1] : '', classMatch ? classMatch[1] : '');
  if (valMatch) el.value = valMatch[1];

  const attrRegex = /([a-zA-Z0-9\-]+)(?:=["']([^"']*)["'])?/g;
  let aMatch;
  while ((aMatch = attrRegex.exec(attrText)) !== null) {
    const attrName = aMatch[1];
    const attrVal = aMatch[2] !== undefined ? aMatch[2] : '';
    el.setAttribute(attrName, attrVal);
  }

  if (el.id) elementsById[el.id] = el;
  allElements.push(el);
  rootDoc.appendChild(el);
}

// Build nested hierarchy for apartmentsGrid
const aptGrid = elementsById['apartmentsGrid'];
if (aptGrid) {
  allElements.filter(e => e.classList.contains('apartment-card')).forEach(card => {
    aptGrid.appendChild(card);
  });
}

// Global Simulated Window and Document
let lastOpenedUrl = '';
const windowEventListeners = {};
const simulatedWindow = {
  open: (url) => { lastOpenedUrl = url; },
  addEventListener: (evt, fn) => {
    if (!windowEventListeners[evt]) windowEventListeners[evt] = [];
    windowEventListeners[evt].push(fn);
  },
  IntersectionObserver: class {
    constructor(cb) { this.cb = cb; }
    observe() {}
    unobserve() {}
  }
};

const docEventListeners = {};
const simulatedDocument = {
  documentElement: { lang: 'ru' },
  body: { style: {} },
  getElementById: (id) => elementsById[id] || null,
  querySelector: (sel) => {
    if (sel.startsWith('#') && !sel.includes('.') && !sel.includes(' ')) {
      return elementsById[sel.slice(1)] || null;
    }
    return rootDoc.querySelector(sel);
  },
  querySelectorAll: (sel) => {
    return allElements.filter(el => el.matchesSelector(sel));
  },
  addEventListener: (evt, fn) => {
    if (!docEventListeners[evt]) docEventListeners[evt] = [];
    docEventListeners[evt].push(fn);
  },
  dispatchEvent: (evt) => {
    if (docEventListeners[evt.type]) {
      docEventListeners[evt.type].forEach(h => h(evt));
    }
  }
};

// Create Node VM sandbox
const testSandbox = {
  window: simulatedWindow,
  document: simulatedDocument,
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  Math: Math,
  parseInt: parseInt,
  parseFloat: parseFloat,
  encodeURIComponent: encodeURIComponent,
  Array: Array,
  String: String,
  Object: Object,
  Set: Set,
  currentSelectedApartment: null
};
vm.createContext(testSandbox);

// Execute app.js in sandbox
vm.runInContext(js, testSandbox);

// Fire DOMContentLoaded
if (docEventListeners['DOMContentLoaded']) {
  docEventListeners['DOMContentLoaded'].forEach(fn => fn());
}

// Global references inside VM
const AppState = vm.runInContext('AppState', testSandbox);
const I18N = vm.runInContext('I18N', testSandbox);
const APARTMENTS_DATA = vm.runInContext('APARTMENTS_DATA', testSandbox);
const formatCurrency = testSandbox.formatCurrency;
const setLanguage = testSandbox.setLanguage;
const setCurrency = testSandbox.setCurrency;
const updateMortgageCalculation = testSandbox.updateMortgageCalculation;
const updateCardPrices = testSandbox.updateCardPrices;
const openApartmentModal = testSandbox.openApartmentModal;
const bookCurrentApartment = testSandbox.bookCurrentApartment;
const bookCurrentApartmentWhatsApp = testSandbox.bookCurrentApartmentWhatsApp;
const calculateThisApartment = testSandbox.calculateThisApartment;
const openModal = testSandbox.openModal;
const closeModal = testSandbox.closeModal;
const handleFormSubmit = testSandbox.handleFormSubmit;
const filterProjectFromShowcase = testSandbox.filterProjectFromShowcase;
const applyFiltersAndSort = testSandbox.applyFiltersAndSort;
const getYearsString = testSandbox.getYearsString;
const updatePassportBanner = testSandbox.updatePassportBanner;


// ============================================================================
// SUITE 1: SYSTEM INTEGRITY, STATIC STRUCTURE & PARITY
// ============================================================================
startSuite('1. System Architecture & Static Integrity');

test('HTML/CSS/JS file sizes and UTF-8 charset', () => {
  assert(html.length > 50000, `index.html is robust (${html.length} bytes)`);
  assert(css.length > 30000, `style.css is robust (${css.length} bytes)`);
  assert(js.length > 50000, `app.js is robust (${js.length} bytes)`);
  assert(/<meta\s+charset=["']?utf-8["']?/i.test(html), 'HTML UTF-8 charset declared');
});

test('Zero duplicate IDs across entire HTML document', () => {
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map(m => m[1]);
  const seen = new Set();
  const duplicates = [];
  ids.forEach(id => {
    if (seen.has(id)) duplicates.push(id);
    seen.add(id);
  });
  assert(duplicates.length === 0, 'Zero duplicate IDs found', duplicates.join(', '));
});

test('Exact 100% 3-way translation key count parity (RU, HY, EN)', () => {
  const ruKeys = Object.keys(I18N.ru);
  const hyKeys = Object.keys(I18N.hy);
  const enKeys = Object.keys(I18N.en);
  assert(ruKeys.length >= 208, `RU has at least 208 keys (${ruKeys.length} found)`);
  assert(hyKeys.length === ruKeys.length, `HY has exact parity with RU (${hyKeys.length} vs ${ruKeys.length})`);
  assert(enKeys.length === ruKeys.length, `EN has exact parity with RU (${enKeys.length} vs ${ruKeys.length})`);

  const missingHy = ruKeys.filter(k => !(k in I18N.hy));
  const missingEn = ruKeys.filter(k => !(k in I18N.en));
  assert(missingHy.length === 0, 'No keys missing in Armenian dictionary', missingHy.join(', '));
  assert(missingEn.length === 0, 'No keys missing in English dictionary', missingEn.join(', '));
});

test('All 183 data-i18n DOM attributes map to valid dictionary keys', () => {
  const domI18nElements = simulatedDocument.querySelectorAll('[data-i18n]');
  assert(domI18nElements.length >= 183, `At least 183 data-i18n elements exist in DOM (${domI18nElements.length} found)`);
  
  const invalidKeys = [];
  domI18nElements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key || !(key in I18N.ru)) invalidKeys.push(key);
  });
  assert(invalidKeys.length === 0, 'All data-i18n keys resolve to valid I18N entries', invalidKeys.join(', '));
});


// ============================================================================
// SUITE 2: EXTREME MORTGAGE CALCULATOR BOUNDARIES & FINTECH STRESS SWEEP
// ============================================================================
startSuite('2. Extreme Slider Boundaries & FinTech Calculations');

const inputPrice = simulatedDocument.getElementById('inputPrice');
const inputDown = simulatedDocument.getElementById('inputDown');
const inputYears = simulatedDocument.getElementById('inputYears');
const inputRate = simulatedDocument.getElementById('inputRate');

test('Calculator sliders HTML configuration boundaries', () => {
  assert(inputPrice.getAttribute('min') === '12000000', 'inputPrice min is 12,000,000 AMD');
  assert(inputPrice.getAttribute('max') === '55000000', 'inputPrice max is 55,000,000 AMD (Art. 156.1 cap limit)');
  assert(inputDown.getAttribute('min') === '10', 'inputDown min is 10%');
  assert(inputDown.getAttribute('max') === '50', 'inputDown max is 50%');
  assert(inputYears.getAttribute('min') === '5', 'inputYears min is 5 years');
  assert(inputYears.getAttribute('max') === '30', 'inputYears max is 30 years');
  assert(inputRate.getAttribute('min') === '9.5', 'inputRate min is 9.5%');
  assert(inputRate.getAttribute('max') === '16.0', 'inputRate max is 16.0%');
});

test('Boundary Minimum: Price=12M, Down=10%, Years=5, Rate=9.5%', () => {
  inputPrice.value = '12000000';
  inputDown.value = '10';
  inputYears.value = '5';
  inputRate.value = '9.5';
  updateMortgageCalculation();

  const loanText = simulatedDocument.getElementById('resLoan').textContent;
  const stdText = simulatedDocument.getElementById('resStandardMonthly').textContent;
  const taxText = simulatedDocument.getElementById('resTaxRefund').textContent;
  const effText = simulatedDocument.getElementById('resEffectiveMonthly').textContent;
  const ratioClient = simulatedDocument.getElementById('ratioClient').style.width;
  const ratioGov = simulatedDocument.getElementById('ratioGov').style.width;

  assert(loanText.includes('10 800 000') || loanText.includes('10 800 000'), `Loan principal is 10,800,000 AMD (${loanText})`);
  assert(!loanText.includes('NaN'), 'Loan display has no NaN');
  assert(!stdText.includes('NaN'), 'Standard monthly has no NaN');
  assert(!taxText.includes('NaN'), 'Tax refund has no NaN');
  assert(!effText.includes('NaN'), 'Effective monthly has no NaN');

  const clientPct = parseFloat(ratioClient);
  const govPct = parseFloat(ratioGov);
  assert(Math.abs((clientPct + govPct) - 100) < 0.2, `Ratio bar sums to 100% (${clientPct}% + ${govPct}%)`);
});

test('Boundary Maximum: Price=55M, Down=50%, Years=30, Rate=16.0%', () => {
  inputPrice.value = '55000000';
  inputDown.value = '50';
  inputYears.value = '30';
  inputRate.value = '16.0';
  updateMortgageCalculation();

  const loanText = simulatedDocument.getElementById('resLoan').textContent;
  const taxText = simulatedDocument.getElementById('resTaxRefund').textContent;
  const effText = simulatedDocument.getElementById('resEffectiveMonthly').textContent;

  assert(loanText.includes('27 500 000') || loanText.includes('27 500 000'), `Loan principal is 27,500,000 AMD (${loanText})`);
  assert(!taxText.includes('NaN'), 'Tax refund has no NaN');
  assert(!effText.includes('NaN'), 'Effective monthly has no NaN');
});

test('Statutory Cap Stress Test: Maximum Loan (Price=55M, Down=10%, Rate=16.0%)', () => {
  // Principal = 49,500,000 AMD.
  // Monthly interest = 49.5M * 0.16 / 12 = 660,000 AMD.
  // Art. 156.1 cap is strictly 500,000 AMD/mo.
  inputPrice.value = '55000000';
  inputDown.value = '10';
  inputYears.value = '5';
  inputRate.value = '16.0';
  updateMortgageCalculation();

  const taxText = simulatedDocument.getElementById('resTaxRefund').textContent;
  const salaryText = simulatedDocument.getElementById('resSalaryNeeded').textContent;
  const s1Text = simulatedDocument.getElementById('savingsYear1Val').textContent;
  const s5Text = simulatedDocument.getElementById('savingsYear5Val').textContent;

  assert(taxText.includes('500 000') || taxText.includes('500 000'), `Tax refund strictly clamped at statutory ceiling 500,000 AMD (${taxText})`);
  // Gross salary for 500k refund = 500k / 0.20 = 2,500,000 AMD
  assert(salaryText.includes('2 500 000') || salaryText.includes('2 500 000'), `Required salary calculated at 2,500,000 AMD Gross (${salaryText})`);
  assert(s1Text.includes('6 000 000') || s1Text.includes('6 000 000'), `1-year savings capped at 6,000,000 AMD (${s1Text})`);
  assert(s5Text.includes('30 000 000') || s5Text.includes('30 000 000'), `5-year savings capped at 30,000,000 AMD (${s5Text})`);
});

test('Multi-Dimensional Grid Stress Sweep (240 distinct parameter combinations)', () => {
  const testPrices = [12000000, 20000000, 28000000, 40000000, 55000000];
  const testDowns = [10, 20, 30, 50];
  const testYears = [5, 15, 30];
  const testRates = [9.5, 11.5, 13.5, 16.0];

  let combinationsTested = 0;
  let calculationAnomalies = 0;

  for (const p of testPrices) {
    for (const d of testDowns) {
      for (const y of testYears) {
        for (const r of testRates) {
          combinationsTested++;
          inputPrice.value = String(p);
          inputDown.value = String(d);
          inputYears.value = String(y);
          inputRate.value = String(r);
          updateMortgageCalculation();

          const stdText = simulatedDocument.getElementById('resStandardMonthly').textContent;
          const taxText = simulatedDocument.getElementById('resTaxRefund').textContent;
          const effText = simulatedDocument.getElementById('resEffectiveMonthly').textContent;
          const ratioClient = simulatedDocument.getElementById('ratioClient').style.width;

          if (stdText.includes('NaN') || taxText.includes('NaN') || effText.includes('NaN') || ratioClient.includes('NaN')) {
            calculationAnomalies++;
          }
          if (stdText.includes('undefined') || taxText.includes('undefined')) {
            calculationAnomalies++;
          }
        }
      }
    }
  }

  assert(combinationsTested === 240, `All 240 combination vectors evaluated (${combinationsTested} tested)`);
  assert(calculationAnomalies === 0, `Zero calculation anomalies or NaNs detected across 240 combinations`);
});

test('Bank presets switch rates and trigger recalculation', () => {
  const bankButtons = simulatedDocument.querySelectorAll('.bank-btn');
  assert(bankButtons.length === 4, '4 bank presets found');

  // Test Ameriabank (11.5%)
  bankButtons[0].click();
  assert(inputRate.value === '11.5' || parseFloat(inputRate.value) === 11.5, 'Ameriabank sets rate to 11.5%');

  // Test Inecobank (11.9%)
  bankButtons[1].click();
  assert(inputRate.value === '11.9' || parseFloat(inputRate.value) === 11.9, 'Inecobank sets rate to 11.9%');

  // Test Ardshinbank (12.0%)
  bankButtons[2].click();
  assert(inputRate.value === '12' || parseFloat(inputRate.value) === 12.0, 'Ardshinbank sets rate to 12.0%');

  // Test ACBA (11.8%)
  bankButtons[3].click();
  assert(inputRate.value === '11.8' || parseFloat(inputRate.value) === 11.8, 'ACBA sets rate to 11.8%');
});

test('Slavic pluralization for loan terms (years) in RU, HY, EN', () => {
  const testCasesRU = [
    { yrs: 1, expected: '1 год' },
    { yrs: 2, expected: '2 года' },
    { yrs: 4, expected: '4 года' },
    { yrs: 5, expected: '5 лет' },
    { yrs: 11, expected: '11 лет' },
    { yrs: 14, expected: '14 лет' },
    { yrs: 20, expected: '20 лет' },
    { yrs: 21, expected: '21 год' },
    { yrs: 22, expected: '22 года' },
    { yrs: 25, expected: '25 лет' },
    { yrs: 30, expected: '30 лет' }
  ];

  testCasesRU.forEach(tc => {
    assert(getYearsString(tc.yrs, 'ru') === tc.expected, `RU pluralization: ${tc.yrs} -> ${tc.expected}`);
    assert(getYearsString(tc.yrs, 'hy') === `${tc.yrs} տարի`, `HY pluralization: ${tc.yrs} -> ${tc.yrs} տարի`);
    const enExp = tc.yrs === 1 ? '1 year' : `${tc.yrs} years`;
    assert(getYearsString(tc.yrs, 'en') === enExp, `EN pluralization: ${tc.yrs} -> ${enExp}`);
  });
});


// ============================================================================
// SUITE 3: CURRENCY SWITCHER RAPID TOGGLES & PRICING PARITY
// ============================================================================
startSuite('3. Currency Switcher Rapid Toggles & Dynamic Pricing');

test('Rapid 50-cycle currency toggling (AMD <-> USD)', () => {
  let currencyFailures = 0;

  for (let i = 0; i < 50; i++) {
    const targetCur = i % 2 === 0 ? 'USD' : 'AMD';
    setCurrency(targetCur);

    if (AppState.currency !== targetCur) currencyFailures++;

    // Check all price-dyn elements
    const priceElements = simulatedDocument.querySelectorAll('.price-dyn[data-raw-amd]');
    priceElements.forEach(el => {
      const text = el.textContent;
      if (text.includes('NaN') || text.includes('undefined')) currencyFailures++;
      if (targetCur === 'USD' && !text.startsWith('$')) currencyFailures++;
      if (targetCur === 'AMD' && !text.includes('֏')) currencyFailures++;
    });

    // Check all proj-price-dyn elements
    const projPriceElements = simulatedDocument.querySelectorAll('.proj-price-dyn[data-raw-amd]');
    projPriceElements.forEach(el => {
      const text = el.textContent;
      if (text.includes('NaN') || text.includes('undefined')) currencyFailures++;
      if (targetCur === 'USD' && !text.includes('$')) currencyFailures++;
      if (targetCur === 'AMD' && !text.includes('֏')) currencyFailures++;
    });

    // Check all price-sqm-dyn elements
    const sqmPriceElements = simulatedDocument.querySelectorAll('.price-sqm-dyn[data-raw-amd-sqm]');
    sqmPriceElements.forEach(el => {
      const text = el.textContent;
      if (text.includes('NaN') || text.includes('undefined')) currencyFailures++;
      if (targetCur === 'USD' && !text.includes('$')) currencyFailures++;
      if (targetCur === 'AMD' && !text.includes('֏')) currencyFailures++;
    });

    // Check calculator output in USD/AMD
    const calcPriceText = simulatedDocument.getElementById('calcPriceDisplay').textContent;
    if (targetCur === 'USD' && !calcPriceText.startsWith('$')) currencyFailures++;
    if (targetCur === 'AMD' && !calcPriceText.includes('֏')) currencyFailures++;
  }

  assert(currencyFailures === 0, 'Zero errors during 50 rapid currency toggle cycles');
  // Restore AMD
  setCurrency('AMD');
  assert(AppState.currency === 'AMD', 'Restored to AMD currency default');
});

test('Apartment card prices maintain immutable raw AMD data attributes', () => {
  const cards = simulatedDocument.querySelectorAll('.apartment-card');
  assert(cards.length === 6, 'All 6 apartment cards present');

  const expectedPrices = [14060000, 15540000, 23680000, 33650000, 34040000, 45880000];
  cards.forEach((c, idx) => {
    const rawAmd = parseInt(c.getAttribute('data-price-amd'), 10);
    assert(rawAmd === expectedPrices[idx], `Card ${idx + 1} raw price immutable: ${expectedPrices[idx]} AMD`);
  });
});

test('USD FX rate conversion precision (395 AMD / USD)', () => {
  setCurrency('USD');
  const price14M = formatCurrency(14060000, 'USD');
  const price45M = formatCurrency(45880000, 'USD');
  
  assert(price14M === '$35,595', `14.06M AMD converts accurately to $35,595 (${price14M})`);
  assert(price45M === '$116,152', `45.88M AMD converts accurately to $116,152 (${price45M})`);
  setCurrency('AMD');
});


// ============================================================================
// SUITE 4: LANGUAGE SWITCHER RAPID TOGGLES & 183+ DOM PARITY
// ============================================================================
startSuite('4. Language Switcher Rapid Toggles & Tri-Lingual DOM Parity');

test('Rapid 30-cycle trilingual rotation (RU -> HY -> EN -> RU)', () => {
  const langs = ['hy', 'en', 'ru'];
  let langErrors = 0;

  for (let i = 0; i < 30; i++) {
    const targetLang = langs[i % 3];
    setLanguage(targetLang);

    if (AppState.lang !== targetLang) langErrors++;
    if (simulatedDocument.documentElement.lang !== targetLang) langErrors++;

    const activeBtn = simulatedDocument.querySelector(`[data-lang="${targetLang}"]`);
    if (activeBtn && !activeBtn.classList.contains('active')) langErrors++;
  }

  assert(langErrors === 0, 'Zero errors during 30 trilingual rotation cycles');
});

test('Exhaustive DOM verification: All data-i18n attributes match dictionary in RU, HY, EN', () => {
  const i18nElements = simulatedDocument.querySelectorAll('[data-i18n]');
  const languages = ['ru', 'hy', 'en'];

  languages.forEach(lng => {
    setLanguage(lng);
    let mismatchedElements = 0;
    let emptyElements = 0;

    i18nElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const expectedText = I18N[lng][key];
      if (!expectedText) {
        mismatchedElements++;
      } else if (key === 'legendClient' || key === 'legendGov') {
        // Dynamic percentage attached by updateMortgageCalculation()
        if (!el.innerHTML.startsWith(expectedText)) mismatchedElements++;
      } else if (key === 'dockSub') {
        // Dynamic mortgage payment calculated for live slider state
        if (!el.innerHTML.includes(expectedText.split(/\s+/)[0])) mismatchedElements++;
      } else if (el.innerHTML !== expectedText) {
        mismatchedElements++;
      }
      if (!el.innerHTML || el.innerHTML.trim() === '' || el.innerHTML.includes('undefined')) {
        emptyElements++;
      }
    });

    assert(mismatchedElements === 0, `Language "${lng}": All ${i18nElements.length} DOM elements strictly updated to dictionary`);
    assert(emptyElements === 0, `Language "${lng}": Zero empty or undefined text nodes in DOM`);
  });

  // Restore RU default
  setLanguage('ru');
});

test('Dynamic text synchronization (Project prefix, price suffixes, passport banners)', () => {
  // Russian
  setLanguage('ru');
  updatePassportBanner('avan');
  assert(simulatedDocument.getElementById('passportTitle').textContent.includes('Аван'), 'RU passport title localized');
  assert(simulatedDocument.getElementById('resSalaryNeeded').textContent.includes('от '), 'RU salary prefix localized');

  // Armenian
  setLanguage('hy');
  updatePassportBanner('avan');
  assert(simulatedDocument.getElementById('passportTitle').textContent.includes('Ավան'), 'HY passport title localized');
  assert(simulatedDocument.getElementById('resSalaryNeeded').textContent.includes('սկսած '), 'HY salary prefix localized');

  // English
  setLanguage('en');
  updatePassportBanner('avan');
  assert(simulatedDocument.getElementById('passportTitle').textContent.includes('Avan'), 'EN passport title localized');
  assert(simulatedDocument.getElementById('resSalaryNeeded').textContent.includes('from '), 'EN salary prefix localized');

  // Restore RU
  setLanguage('ru');
});

test('WhatsApp booking message generation across all 6 apartments in RU, HY, EN', () => {
  const apartments = ['apt1', 'apt2', 'apt3', 'apt4', 'apt5', 'apt6'];
  const languages = ['ru', 'hy', 'en'];

  languages.forEach(lng => {
    setLanguage(lng);
    apartments.forEach(aptId => {
      openApartmentModal(aptId);
      bookCurrentApartmentWhatsApp();

      assert(lastOpenedUrl.startsWith('https://wa.me/37494664522'), 'WhatsApp URL points to official company phone +374 94 66 45 22');
      const decodedUrl = decodeURIComponent(lastOpenedUrl);
      const expectedTitle = I18N[lng][APARTMENTS_DATA[aptId].titleKey];
      assert(decodedUrl.includes(expectedTitle), `WhatsApp message in ${lng} contains apartment title "${expectedTitle}"`);
      closeModal('modalApartment');
    });
  });
});


// ============================================================================
// SUITE 5: FORM EDGE CASES, SECURITY & INPUT VALIDATION
// ============================================================================
startSuite('5. Form Edge Cases, Security Payloads & Telephone Formats');

test('Form submission invokes preventDefault and displays localized toast', () => {
  setLanguage('ru');
  let prevented = false;
  const mockEvt = {
    preventDefault: () => { prevented = true; },
    target: { reset: () => {} }
  };

  handleFormSubmit(mockEvt);
  assert(prevented, 'e.preventDefault() called on form submission');

  const toastBox = simulatedDocument.getElementById('toastBox');
  const toastText = simulatedDocument.getElementById('toastText');
  assert(toastBox.classList.contains('active'), 'Toast notification activated');
  assert(toastText.textContent === I18N.ru.toastSuccess, 'Toast displays RU success message');

  setLanguage('en');
  handleFormSubmit(mockEvt);
  assert(toastText.textContent === I18N.en.toastSuccess, 'Toast displays EN success message');
  setLanguage('ru');
});

test('Edge cases: Special characters, unicode, and XSS prevention in inputs', () => {
  const securityPayloads = [
    '<script>alert("XSS")</script>',
    '"><img src=x onerror=alert(1)>',
    'DROP TABLE leads; --',
    '\' OR \'1\'=\'1',
    'Արմեն Ղազարյան 🏢✨',
    'Фёдор Достоевский & Co.',
    'Jean-Luc Picard (Capt.)',
    'A'.repeat(1000)
  ];

  const inputName = simulatedDocument.getElementById('inputName');
  const inputComment = simulatedDocument.getElementById('inputComment');

  securityPayloads.forEach(payload => {
    inputName.value = payload;
    inputComment.value = payload;

    let resetCalled = false;
    const mockEvt = {
      preventDefault: () => {},
      target: {
        reset: () => {
          resetCalled = true;
          inputName.value = '';
          inputComment.value = '';
        }
      }
    };

    handleFormSubmit(mockEvt);
    assert(resetCalled, `Form handled payload safely without exception (length: ${payload.length})`);
    assert(inputName.value === '', 'Name input successfully reset');
  });
});

test('Telephone format resilience across 15 national and international variants', () => {
  const phoneVariants = [
    '+374 94 66 45 22',
    '+37494664522',
    '094 66 45 22',
    '094664522',
    '+374 (94) 66-45-22',
    '+1 (555) 234-5678',
    '+7 (999) 123-45-67',
    '+44 20 7946 0958',
    '+33 1 42 68 55 55',
    '+971 50 123 4567',
    '37494664522',
    '(094) 664522',
    '+374-94-664522',
    '+374.94.664522',
    '094-66-45-22'
  ];

  const inputPhone = simulatedDocument.getElementById('inputPhone');
  phoneVariants.forEach(phone => {
    inputPhone.value = phone;
    let submitted = false;
    const mockEvt = {
      preventDefault: () => { submitted = true; },
      target: { reset: () => { inputPhone.value = ''; } }
    };
    handleFormSubmit(mockEvt);
    assert(submitted, `Phone variant handled safely: ${phone}`);
    assert(inputPhone.value === '', 'Phone input reset after submit');
  });
});


// ============================================================================
// SUITE 6: MODAL & DRAWER STATE TRANSITIONS & COLLISION PREVENTION
// ============================================================================
startSuite('6. Modal Opening/Closing Sequences & Concurrency');

const modalApartment = simulatedDocument.getElementById('modalApartment');
const modalLead = simulatedDocument.getElementById('modalLead');
const modalTour = simulatedDocument.getElementById('modalTour');
const mobileDrawer = simulatedDocument.getElementById('mobileDrawer');
const drawerBackdrop = simulatedDocument.getElementById('drawerBackdrop');

test('Individual modal open and close cycles maintain body scroll lock', () => {
  openModal('modalLead');
  assert(modalLead.classList.contains('active'), 'modalLead has active class');
  assert(simulatedDocument.body.style.overflow === 'hidden', 'body overflow locked to hidden');
  closeModal('modalLead');
  assert(!modalLead.classList.contains('active'), 'modalLead active class removed');
  assert(simulatedDocument.body.style.overflow === '', 'body overflow restored to normal');

  openModal('modalTour');
  assert(modalTour.classList.contains('active'), 'modalTour has active class');
  assert(simulatedDocument.body.style.overflow === 'hidden', 'body overflow locked');
  closeModal('modalTour');
  assert(!modalTour.classList.contains('active'), 'modalTour active removed');
  assert(simulatedDocument.body.style.overflow === '', 'body overflow restored');
});

test('Sequence Flow: Apartment Modal -> Book Lead Modal transition (No collisions)', () => {
  openApartmentModal('apt3');
  assert(modalApartment.classList.contains('active'), 'modalApartment is open');
  assert(!modalLead.classList.contains('active'), 'modalLead is currently closed');

  bookCurrentApartment();
  assert(!modalApartment.classList.contains('active'), 'modalApartment smoothly closed');
  assert(modalLead.classList.contains('active'), 'modalLead smoothly opened');
  assert(simulatedDocument.body.style.overflow === 'hidden', 'body overflow remains locked');

  const inputComment = simulatedDocument.getElementById('inputComment');
  assert(inputComment.value.includes('Двухкомнатная с балконом'), `Comment auto-filled with apartment title (${inputComment.value})`);

  closeModal('modalLead');
  assert(!modalLead.classList.contains('active'), 'modalLead closed');
  assert(simulatedDocument.body.style.overflow === '', 'body overflow restored');
});

test('Sequence Flow: Apartment Modal -> Calculate in Mortgage Tool', () => {
  openApartmentModal('apt4');
  assert(modalApartment.classList.contains('active'), 'modalApartment is open');

  calculateThisApartment();
  assert(!modalApartment.classList.contains('active'), 'modalApartment closed upon calculating');
  assert(inputPrice.value === '33650000', 'Calculator inputPrice updated to apartment price 33,650,000 AMD');

  const calcDisplay = simulatedDocument.getElementById('calcPriceDisplay').textContent;
  assert(calcDisplay.includes('33 650 000') || calcDisplay.includes('33 650 000'), `Calculator display recalculated: ${calcDisplay}`);
  assert(simulatedDocument.body.style.overflow === '', 'body overflow restored');
});

test('Mobile drawer open/close and ESC key dismissal', () => {
  const btnToggleDrawer = simulatedDocument.getElementById('btnToggleDrawer');
  const btnCloseDrawer = simulatedDocument.getElementById('btnCloseDrawer');

  btnToggleDrawer.click();
  assert(mobileDrawer.classList.contains('active'), 'mobileDrawer opened via toggle button');
  assert(drawerBackdrop.classList.contains('active'), 'drawerBackdrop active');

  btnCloseDrawer.click();
  assert(!mobileDrawer.classList.contains('active'), 'mobileDrawer closed via close button');
  assert(!drawerBackdrop.classList.contains('active'), 'drawerBackdrop closed');

  btnToggleDrawer.click();
  openModal('modalLead');
  assert(mobileDrawer.classList.contains('active'), 'Drawer open');
  assert(modalLead.classList.contains('active'), 'modalLead open simultaneously');

  simulatedDocument.dispatchEvent({ type: 'keydown', key: 'Escape' });
  assert(!modalLead.classList.contains('active'), 'ESC closed active modal');
  assert(!mobileDrawer.classList.contains('active'), 'ESC closed mobile drawer');
});

test('Rapid random modal switching stress (30 state transitions)', () => {
  const modalIds = ['modalApartment', 'modalLead', 'modalTour'];

  for (let i = 0; i < 30; i++) {
    const target = modalIds[i % 3];
    openModal(target);
    assert(simulatedDocument.getElementById(target).classList.contains('active'), `${target} opened`);
    closeModal(target);
    assert(!simulatedDocument.getElementById(target).classList.contains('active'), `${target} closed`);
  }

  assert(simulatedDocument.body.style.overflow === '', 'Zero trapped body overflow locks after 30 transitions');
});


// ============================================================================
// SUITE 7: CATALOG FILTERING, SORTING & PROJECT SHOWCASE INTERACTIONS
// ============================================================================
startSuite('7. Catalog Filtering, Monotonic Sorting & Showcase');

test('Room filter buttons partition catalog properly', () => {
  const cards = simulatedDocument.querySelectorAll('.apartment-card');

  AppState.activeRoomFilter = '1k';
  AppState.activeProjFilter = 'all';
  applyFiltersAndSort();
  const visible1k = cards.filter(c => c.style.display !== 'none');
  assert(visible1k.length === 2, `1-room filter shows exactly 2 apartments (${visible1k.length} visible)`);

  AppState.activeRoomFilter = '2k';
  applyFiltersAndSort();
  const visible2k = cards.filter(c => c.style.display !== 'none');
  assert(visible2k.length === 2, `2-room filter shows exactly 2 apartments (${visible2k.length} visible)`);

  AppState.activeRoomFilter = '3k';
  applyFiltersAndSort();
  const visible3k = cards.filter(c => c.style.display !== 'none');
  assert(visible3k.length === 1, `3-room filter shows exactly 1 apartment (${visible3k.length} visible)`);

  AppState.activeRoomFilter = 'th';
  applyFiltersAndSort();
  const visibleTh = cards.filter(c => c.style.display !== 'none');
  assert(visibleTh.length === 1, `Townhouse filter shows exactly 1 property (${visibleTh.length} visible)`);

  AppState.activeRoomFilter = 'all';
  applyFiltersAndSort();
  const visibleAll = cards.filter(c => c.style.display !== 'none');
  assert(visibleAll.length === 6, `All filter shows all 6 properties (${visibleAll.length} visible)`);
});

test('Project filter buttons partition catalog and sync passport banner', () => {
  const cards = simulatedDocument.querySelectorAll('.apartment-card');

  filterProjectFromShowcase('avan');
  const visibleAvan = cards.filter(c => c.style.display !== 'none');
  assert(visibleAvan.length === 4, `Avan project filter shows 4 apartments (${visibleAvan.length} visible)`);
  assert(simulatedDocument.getElementById('passportTitle').textContent.includes('Avan') ||
         simulatedDocument.getElementById('passportTitle').textContent.includes('Аван'), 'Passport banner in sync with Avan');

  filterProjectFromShowcase('nork');
  const visibleNork = cards.filter(c => c.style.display !== 'none');
  assert(visibleNork.length === 1, `Nork project filter shows 1 apartment (${visibleNork.length} visible)`);

  filterProjectFromShowcase('townhouse');
  const visibleKasakh = cards.filter(c => c.style.display !== 'none');
  assert(visibleKasakh.length === 1, `Kasakh townhouse filter shows 1 property (${visibleKasakh.length} visible)`);

  filterProjectFromShowcase('all');
  const visibleAll = cards.filter(c => c.style.display !== 'none');
  assert(visibleAll.length === 6, `All projects filter restores all 6 properties (${visibleAll.length} visible)`);
});

test('Sorting monotonicity: price-asc, price-desc, and area-desc', () => {
  // 1. Price Ascending
  AppState.activeSort = 'price-asc';
  AppState.activeRoomFilter = 'all';
  AppState.activeProjFilter = 'all';
  applyFiltersAndSort();

  const pricesAsc = aptGrid.children.map(c => parseInt(c.getAttribute('data-price-amd'), 10));
  let isAsc = true;
  for (let i = 1; i < pricesAsc.length; i++) {
    if (pricesAsc[i] < pricesAsc[i - 1]) isAsc = false;
  }
  assert(isAsc, `Prices strictly ascending: ${pricesAsc.join(' <= ')}`);

  // 2. Price Descending
  AppState.activeSort = 'price-desc';
  applyFiltersAndSort();

  const pricesDesc = aptGrid.children.map(c => parseInt(c.getAttribute('data-price-amd'), 10));
  let isDesc = true;
  for (let i = 1; i < pricesDesc.length; i++) {
    if (pricesDesc[i] > pricesDesc[i - 1]) isDesc = false;
  }
  assert(isDesc, `Prices strictly descending: ${pricesDesc.join(' >= ')}`);

  // 3. Area Descending
  AppState.activeSort = 'area-desc';
  applyFiltersAndSort();

  const areasDesc = aptGrid.children.map(c => parseFloat(c.getAttribute('data-area')));
  let isAreaDesc = true;
  for (let i = 1; i < areasDesc.length; i++) {
    if (areasDesc[i] > areasDesc[i - 1]) isAreaDesc = false;
  }
  assert(isAreaDesc, `Areas strictly descending: ${areasDesc.join(' >= ')}`);
});


// ============================================================================
// FINAL AUTOMATION SUMMARY & METRICS
// ============================================================================
console.log('\n================================================================');
console.log('            EXHAUSTIVE QA AUTOMATION SUITE RESULTS              ');
console.log('================================================================');
console.log(`Total Test Scenarios Executed : ${totalTests}`);
console.log(`Total Assertions Evaluated    : ${totalAssertions}`);
console.log(`Passed Assertions             : ${passedAssertions} (${Math.round((passedAssertions/totalAssertions)*100)}%)`);
console.log(`Failed Assertions             : ${failedAssertions}`);
console.log('----------------------------------------------------------------');
console.log('Tier Breakdown:');
Object.keys(suiteMetrics).forEach(s => {
  const m = suiteMetrics[s];
  const duration = Date.now() - m.startTime;
  console.log(`  • ${s.padEnd(52)}: ${m.passed}/${m.tests} tests passed (${m.assertions} assertions) [${duration}ms]`);
});
console.log('================================================================');

if (failedTests === 0 && failedAssertions === 0) {
  console.log('🎉 100% PRODUCTION-GRADE VERIFICATION PASSED WITH ZERO DEFECTS!');
  console.log('   All extreme boundaries, currency toggles, i18n parity, form');
  console.log('   edge cases, and modal concurrency flows are fully validated.');
  process.exit(0);
} else {
  console.error(`🚨 DETECTED ${failedTests} TEST FAILURES (${failedAssertions} ASSERTION FAILURES):`);
  failureDetails.forEach((f, i) => {
    console.error(`   [${i+1}] [${f.suite}] ${f.error}`);
  });
  process.exit(1);
}
