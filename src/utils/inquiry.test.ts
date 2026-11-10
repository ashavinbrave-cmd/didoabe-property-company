import test from 'node:test';
import assert from 'node:assert/strict';
import { buildInquiryWhatsAppUrl } from './inquiry';
import { COMPANY_INFO } from '../data/companyData';

test('buildInquiryWhatsAppUrl targets the company WhatsApp number and encodes the draft', () => {
  const url = new URL(buildInquiryWhatsAppUrl('Property management inquiry', {
    fullName: 'Juliet Nabukeera',
    phone: '+256 772 883 402',
    location: 'Nakawa, Kampala',
    unitsCount: 6,
    notes: 'Line one\nLine two & symbols? #%',
  }));

  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, `/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}`);
  const message = url.searchParams.get('text') ?? '';
  assert.match(message, /Hello Didoabe Property Company/);
  assert.match(message, /Property management inquiry/);
  assert.match(message, /Full Name: Juliet Nabukeera/);
  assert.match(message, /Phone: \+256 772 883 402/);
  assert.match(message, /Location: Nakawa, Kampala/);
  assert.match(message, /Units Count: 6/);
  assert.match(message, /Notes: Line one\nLine two & symbols\? #%/);
  assert.ok(!message.includes('undefined'));
});

test('buildInquiryWhatsAppUrl omits empty and undefined fields', () => {
  const url = new URL(buildInquiryWhatsAppUrl('General information request', {
    fullName: 'Dennis Kasozi',
    email: '',
    subject: 'Fee information',
    message: undefined,
  }));
  const message = url.searchParams.get('text') ?? '';
  assert.match(message, /Full Name: Dennis Kasozi/);
  assert.match(message, /Subject: Fee information/);
  assert.ok(!message.includes('Email:'));
  assert.ok(!message.includes('Message:'));
});