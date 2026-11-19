import assert from 'node:assert/strict';
import test from 'node:test';
import {
  mapApplicationToManagementPortal,
  mapInquiryToManagementPortal,
  mapManagementPortalProperty,
} from './managementPortalAdapter';
import type {
  ManagementPortalProperty,
  PropertyApplicationPayload,
} from '../types/property';

const listing: ManagementPortalProperty = {
  id: 'prop_123', name: 'Kira House', location: 'Kira', district: 'Wakiso',
  propertyType: 'House', price: 850000, depositTerms: 'Two months deposit',
  status: 'Available', isPublished: true, bedrooms: 3, bathrooms: 2,
  photos: [{ url: '/uploads/kira.jpg', caption: 'Front view' }],
  description: 'A family home.', conditions: 'No smoking.',
  createdAt: '2026-10-01T00:00:00.000Z', updatedAt: '2026-10-02T00:00:00.000Z',
};

test('maps available published properties and makes photo paths absolute', () => {
  const mapped = mapManagementPortalProperty(listing, 'https://portal.example');
  assert.ok(mapped);
  assert.equal(mapped.monthlyRentUgx, 850000);
  assert.equal(mapped.isSampleData, false);
  assert.equal(mapped.images[0].url, 'https://portal.example/uploads/kira.jpg');
  assert.deepEqual(mapped.rentalConditions, ['Two months deposit', 'No smoking.']);
});

test('filters unpublished and non-available properties', () => {
  assert.equal(mapManagementPortalProperty({ ...listing, status: 'Occupied' }, 'https://portal.example'), null);
  assert.equal(mapManagementPortalProperty({ ...listing, isPublished: false }, 'https://portal.example'), null);
});

test('maps applications into the private portal request contract', () => {
  const payload: PropertyApplicationPayload = {
    propertyId: 'prop_123', propertyReference: 'prop_123', propertyName: 'Kira House',
    propertyLocation: 'Kira', monthlyRentUgx: 850000, applicantFullName: 'Amina Example',
    applicantEmail: 'amina@example.com', telephoneNumber: '+256772123456',
    preferredAlternativeLocation: 'Ntinda', submittedAt: '2026-10-03T00:00:00.000Z',
  };
  assert.deepEqual(mapApplicationToManagementPortal(payload), {
    propertyId: 'prop_123', propertyName: 'Kira House', applicantName: 'Amina Example',
    applicantEmail: 'amina@example.com', applicantPhone: '+256772123456',
    occupation: '', moveInDate: '', householdSize: 1,
    message: 'Preferred alternative location: Ntinda',
  });
});

test('maps vacancy inquiries into the private portal request contract', () => {
  assert.deepEqual(mapInquiryToManagementPortal({
    visitorName: 'Amina Example', visitorEmail: 'amina@example.com',
    preferredLocation: 'Kira', telephoneNumber: '+256772123456',
    submittedAt: '2026-10-03T00:00:00.000Z',
  }), {
    visitorName: 'Amina Example', visitorEmail: 'amina@example.com',
    visitorPhone: '+256772123456', subject: 'Vacancy inquiry for Kira',
    message: 'Please notify me about vacancies in Kira.',
  });
});

