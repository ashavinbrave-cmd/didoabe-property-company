import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidEmail,
  isValidPhone,
  validateLandlordInquiry,
  validateTenantTicket,
  validateGeneralMessage,
} from './validation';

test('isValidEmail correctly identifies valid and invalid addresses', () => {
  assert.equal(isValidEmail('didoabepropertycompany@gmail.com'), true);
  assert.equal(isValidEmail('owner@domain.co.ug'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail(''), false);
});

test('isValidPhone handles Ugandan and international numbers', () => {
  assert.equal(isValidPhone('+256772883402'), true);
  assert.equal(isValidPhone('0772883402'), true);
  assert.equal(isValidPhone('+256 784 609 532'), true);
  assert.equal(isValidPhone('+1 202 555 0123'), true);
  assert.equal(isValidPhone('123'), false);
  assert.equal(isValidPhone('123456789'), false);
  assert.equal(isValidPhone(''), false);
});

test('validateLandlordInquiry catches missing required fields', () => {
  const invalid = validateLandlordInquiry({
    fullName: '',
    phone: '',
    location: '',
    unitsCount: 0,
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.location);
  assert.ok(invalid.errors.unitsCount);

  const valid = validateLandlordInquiry({
    fullName: 'David Okello',
    phone: '+256772883402',
    location: 'Nakawa, Kampala',
    unitsCount: 8,
    propertyType: 'Residential Apartments',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('validateTenantTicket validates maintenance inquiries accurately', () => {
  const invalid = validateTenantTicket({
    tenantName: 'J',
    phone: 'bad',
    description: 'short',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.tenantName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.propertyName);
  assert.ok(invalid.errors.unitNumber);
  assert.ok(invalid.errors.description);

  const valid = validateTenantTicket({
    tenantName: 'Sarah Namukasa',
    phone: '0784609532',
    propertyName: 'Katooke Heights',
    unitNumber: 'B4',
    category: 'Plumbing & Drainage',
    urgency: 'Urgent',
    description: 'The kitchen sink pipe is leaking heavily under the counter.',
    preferredTime: 'Morning (8AM - 12PM)',
  });
  assert.equal(valid.isValid, true);
});

test('validateGeneralMessage requires contact details, subject, and message', () => {
  const invalid = validateGeneralMessage({ fullName: 'A', phone: 'bad', subject: '', message: 'short' });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateGeneralMessage({
    fullName: 'Dennis Kasozi',
    phone: '+256772883402',
    email: 'dennis@example.com',
    subject: 'Management terms',
    message: 'Please share information about your property management terms.',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

