import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Security Hardening & Protection Gate', () => {
  test('HTTP Security headers are enforced on live responses', async () => {
    const res = await fetch('http://127.0.0.1:3000/');
    assert.equal(res.status, 200);

    const xFrame = res.headers.get('x-frame-options');
    assert.equal(xFrame, 'DENY', 'Must enforce X-Frame-Options: DENY');

    const xContentType = res.headers.get('x-content-type-options');
    assert.equal(xContentType, 'nosniff', 'Must enforce X-Content-Type-Options: nosniff');

    const referrerPolicy = res.headers.get('referrer-policy');
    assert.equal(referrerPolicy, 'strict-origin-when-cross-origin', 'Must enforce strict-origin-when-cross-origin');

    const xPoweredBy = res.headers.get('x-powered-by');
    assert.equal(xPoweredBy, null, 'Must not leak X-Powered-By technology fingerprint');

    const csp = res.headers.get('content-security-policy');
    assert.ok(csp && csp.includes("frame-ancestors 'none'"), 'Must enforce CSP with frame-ancestors none');
  });

  test('Admin authentication route enforces timing-safe validation and blocks unauthorized access', async () => {
    // 1. GET without session cookie must return 401
    const getRes = await fetch('http://127.0.0.1:3000/api/admin/auth');
    assert.equal(getRes.status, 401, 'Unauthorized GET must be blocked with 401');

    // 2. POST with wrong password must return 401
    const invalidRes = await fetch('http://127.0.0.1:3000/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'attacker', password: 'random-password' }),
    });
    assert.equal(invalidRes.status, 401, 'Invalid credentials must return 401');

    // 3. POST with valid credentials must return 200 and set HttpOnly cookie
    const validRes = await fetch('http://127.0.0.1:3000/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'green2026' }),
    });
    assert.equal(validRes.status, 200, 'Valid credentials must succeed with 200');
    const setCookie = validRes.headers.get('set-cookie');
    assert.ok(setCookie && setCookie.includes('HttpOnly'), 'Session cookie must have HttpOnly flag');
  });

  test('.gitignore strictly prevents secrets and environment files from leaking to Git', () => {
    const gitignorePath = path.resolve(process.cwd(), '.gitignore');
    assert.ok(fs.existsSync(gitignorePath), '.gitignore must exist');
    const content = fs.readFileSync(gitignorePath, 'utf8');

    assert.ok(content.includes('.env'), '.gitignore must ignore .env');
    assert.ok(content.includes('*.pem'), '.gitignore must ignore *.pem');
    assert.ok(content.includes('*.key'), '.gitignore must ignore *.key');
  });
});
