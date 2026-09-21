import { describe, it } from 'node:test';
import assert from 'node:assert';
import { leadFormSchema } from '../src/lib/validations/leadSchema.ts';

describe('Lead Validation Schema (Zod)', () => {
  it('should pass validation for valid lead data', () => {
    const valid = {
      name: 'Армен Арутюнян',
      phone: '+374 94 664522',
      preferredProject: 'avan',
      preferredTime: 'morning',
    };
    const res = leadFormSchema.safeParse(valid);
    assert.strictEqual(res.success, true);
  });

  it('should reject invalid phone numbers', () => {
    const invalidPhone = {
      name: 'Армен',
      phone: '12', // Too short
    };
    const res = leadFormSchema.safeParse(invalidPhone);
    assert.strictEqual(res.success, false);
  });

  it('should reject names shorter than 2 chars', () => {
    const invalidName = {
      name: 'A',
      phone: '+374 94 000000',
    };
    const res = leadFormSchema.safeParse(invalidName);
    assert.strictEqual(res.success, false);
  });
});
