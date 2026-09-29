import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Comprehensive Portal & Live Server Verification', () => {
  const routes = [
    '/',
    '/projects',
    '/apartments',
    '/mortgage',
    '/projects/avan',
    '/projects/nork',
    '/projects/townhouse',
    '/admin',
    '/standards',
    '/about',
  ];

  test('All 10 primary routes return HTTP 200 and valid HTML', async () => {
    for (const r of routes) {
      const res = await fetch(`http://127.0.0.1:3000${r}`);
      assert.equal(res.status, 200, `Route ${r} should return 200 OK`);
      const text = await res.text();
      assert.ok(text.length > 500, `Route ${r} should return substantive content`);
      assert.ok(text.includes('<!DOCTYPE html>'), `Route ${r} should start with DOCTYPE`);
    }
  });

  test('Setl Palace architecture sections and sub-navigation exist on project detail page', async () => {
    const res = await fetch('http://127.0.0.1:3000/projects/avan');
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes('href="#about"'), 'Should contain #about anchor');
    assert.ok(html.includes('href="#location"'), 'Should contain #location anchor');
    assert.ok(html.includes('href="#architecture"'), 'Should contain #architecture anchor');
    assert.ok(html.includes('href="#amenities"'), 'Should contain #amenities anchor');
    assert.ok(html.includes('href="#floor-selector"'), 'Should contain #floor-selector anchor');
    assert.ok(html.includes('href="#mortgage-hub"'), 'Should contain #mortgage-hub anchor');
    assert.ok(html.includes('logo_horizontal.png') || html.includes('logo_light_transparent.png'), 'Header should render official brand logo');
  });


  test('All referenced media, scripts, and CSS assets exist and load with status 200', async () => {
    const assetsToCheck = new Set();

    for (const r of routes) {
      const res = await fetch(`http://127.0.0.1:3000${r}`);
      const text = await res.text();

      const imgMatches = [...text.matchAll(/src=["']([^"']+)["']/g)].map((m) => m[1]);
      for (const src of imgMatches) {
        if (!src.startsWith('data:') && !src.startsWith('http')) {
          assetsToCheck.add(src);
        }
      }

      const cssMatches = [...text.matchAll(/href=["'](\/_next\/static\/css\/[^"']+)["']/g)].map((m) => m[1]);
      for (const href of cssMatches) {
        assetsToCheck.add(href);
      }
    }

    assert.ok(assetsToCheck.size > 0, 'Should find assets to verify');

    for (const asset of assetsToCheck) {
      const res = await fetch(`http://127.0.0.1:3000${asset}`);
      assert.equal(res.status, 200, `Asset ${asset} must return 200 OK, got ${res.status}`);
    }
  });

  test('HTML output contains zero nested <main> elements', async () => {
    for (const r of routes) {
      const res = await fetch(`http://127.0.0.1:3000${r}`);
      const text = await res.text();
      const mainMatches = text.match(/<main[\s>]/gi) || [];
      assert.ok(
        mainMatches.length <= 1,
        `Route ${r} has ${mainMatches.length} <main> tags; should have at most 1`
      );
    }
  });

  test('Zero emojis exist across all production source files in src/', () => {
    const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    const foundEmojis = [];

    function scanDir(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanDir(fullPath);
        } else if (/\.(ts|tsx)$/.test(entry.name)) {
          const content = fs.readFileSync(fullPath, 'utf8');
          const lines = content.split('\n');
          lines.forEach((line, idx) => {
            if (emojiRegex.test(line)) {
              foundEmojis.push({ file: fullPath, line: idx + 1, content: line.trim() });
            }
          });
        }
      }
    }

    scanDir(path.resolve(process.cwd(), 'src'));
    assert.equal(
      foundEmojis.length,
      0,
      `Found forbidden emojis in source code: ${JSON.stringify(foundEmojis, null, 2)}`
    );
  });
});
