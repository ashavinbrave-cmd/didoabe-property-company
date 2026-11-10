import { PropertyService, ProcessStep, FaqItem } from '../types/index';

export const COMPANY_INFO = {
  name: 'Didoabe Property Company',
  legalName: 'DIDOABE PROPERTY CO LTD',
  tagline: 'We Manage, You Relax',
  location: 'Nakawa Ura Small Gate & Katooke Wamala Road, Kampala, Uganda',
  primaryOffice: 'Nakawa Ura Small Gate, Kampala',
  branchOffice: 'Katooke Wamala Road, Kampala',
  postalAddress: 'P O Box 176236 Kampala, Kampala Uganda',
  email: 'didoabepropertycompany@gmail.com',
  phones: [
    '+256 772 883 402',
    '+256 784 609 532',
    '+256 754 458 601',
    '+256 703 712 508',
  ],
  whatsapp: '+256772883402',
  whatsappUrl: 'https://wa.me/256772883402?text=Hello%20Didoabe%20Property%20Company,%20I%20am%20enquiring%20about%20your%20property%20management%20services.',
  urgentContactNote: 'For urgent managed-property issues, call the company directly',
  logoUrl: '/assets/aistudio/DIDOABE_LOGO_d8bd4994.jpg',
  coverageAreas: ['Nakawa', 'Ntinda', 'Katooke', 'Kira', 'Naguru', 'Kololo', 'Bugolobi', 'Namugongo', 'Entebbe Road', 'Greater Kampala Metropolitan'],
};

// 8 Primary Services specified in the user's prompt
export const PRIMARY_SERVICES_LIST = [
  'Property management',
  'Tenant communication and onboarding',
  'Rent collection and tracking arrangements',
  'Maintenance and repair coordination',
  'Property inspection arrangements',
  'Financial recordkeeping and reporting',
  'Tenant relations and support',
  'Property owner reporting options',
];

// Why Choose Us 8 points from prompt
export const WHY_CHOOSE_US_POINTS = [
  {
    title: 'Property management in Kampala',
    description: 'Property management information and services for residential and commercial rentals in Kampala.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Financial records and reporting options',
    description: 'Recordkeeping and reporting arrangements can be discussed and agreed for each property.',
    iconName: 'FileSpreadsheet',
  },
  {
    title: 'Organized rent collection and tracking',
    description: 'Rent collection and payment tracking may be included in the agreed service scope.',
    iconName: 'Receipt',
  },
  {
    title: 'Maintenance coordination options',
    description: 'Maintenance requests and coordination with service providers can be discussed for each property.',
    iconName: 'Wrench',
  },
  {
    title: 'Tenant onboarding support',
    description: 'Tenant information requirements and onboarding steps should be confirmed with the company for each property.',
    iconName: 'UserCheck',
  },
  {
    title: 'Clear and consistent communication',
    description: 'Communication channels and update arrangements can be agreed with the company.',
    iconName: 'MessageSquareText',
  },
  {
    title: 'Attention to property condition',
    description: 'Owners can discuss condition reviews and maintenance coordination as part of the service arrangement.',
    iconName: 'Building2',
  },
  {
    title: 'Support for landlords and tenants',
    description: 'Contact routes and support scope can be discussed and set out for each management arrangement.',
    iconName: 'HeartHandshake',
  },
];

// 5 Core Values from prompt
export const COMPANY_VALUES = [
  {
    name: 'Integrity',
    shortDesc: 'We conduct our business honestly and professionally.',
    fullDesc: 'We aim to conduct business honestly and professionally in our communications and agreed services.',
    iconName: 'Shield',
  },
  {
    name: 'Transparency',
    shortDesc: 'We value clear records and open communication.',
    fullDesc: 'We value clear communication about service scope, fees, records, and repair approvals.',
    iconName: 'Eye',
  },
  {
    name: 'Accountability',
    shortDesc: 'We take responsibility for the services we provide.',
    fullDesc: 'We take responsibility for carrying out the services agreed with each property owner.',
    iconName: 'CheckCircle2',
  },
  {
    name: 'Reliability',
    shortDesc: 'We value organized property management.',
    fullDesc: 'We aim to provide property management support in line with the scope and arrangements agreed with each owner.',
    iconName: 'Clock',
  },
  {
    name: 'Customer Care',
    shortDesc: 'We value property owners, tenants, and business partners.',
    fullDesc: 'We value respectful communication with property owners, tenants, and business partners.',
    iconName: 'HeartHandshake',
  },
];

// For Property Owners Benefits from prompt
export const OWNER_BENEFITS = [
  {
    title: 'Rent collection support',
    description: 'Rent collection and payment tracking may be included; collection dates and follow-up arrangements depend on the property agreement.',
  },
  {
    title: 'Financial recordkeeping',
    description: 'Reporting content and frequency can be agreed for each property, based on available rent and expense records.',
  },
  {
    title: 'Property condition reviews',
    description: 'Inspection scope, timing, and any condition records can be discussed and agreed for each property.',
  },
  {
    title: 'Maintenance coordination',
    description: 'Repair providers, estimates, approvals, and payment arrangements can be agreed with the owner.',
  },
  {
    title: 'Tenant communication and onboarding',
    description: 'Tenant communication and onboarding support can be discussed within the agreed service scope.',
  },
  {
    title: 'Property management support',
    description: 'The management scope and responsibilities are discussed with the company and recorded in the agreement.',
  },
];

// For Tenants Support Pillars from prompt
export const TENANT_PILLARS = [
  {
    title: 'Payment information',
    description: 'Payment methods and receipt arrangements vary by property; contact your property manager for current details.',
  },
  {
    title: 'Maintenance inquiry options',
    description: 'Prepare a maintenance inquiry for WhatsApp; call the company directly about urgent safety or property issues.',
  },
  {
    title: 'Tenant communication',
    description: 'Communication and property access arrangements depend on the tenancy and management agreements.',
  },
  {
    title: 'Tenancy information',
    description: 'Contact your property manager to ask about tenancy documents, payment records, or deposit information.',
  },
  {
    title: 'Contact for property-related questions',
    description: 'Contact your property manager by WhatsApp or phone. Website forms prepare WhatsApp drafts and do not log tickets.',
  },
];

// Detailed 8 Services Matching User Prompt Specification
export const SERVICES_DATA: PropertyService[] = [
  {
    id: 'complete-property-management',
    title: 'Property Management',
    category: 'Legal & Operations',
    shortDesc: 'Property management may cover day-to-day activities for residential and commercial properties, depending on the scope discussed with the company.',
    fullDesc: 'Property management may include coordination of day-to-day activities, onsite caretakers, utilities, and shared services, depending on the scope agreed for each property.',
    deliverables: [
      'Day-to-day property operational administration',
      'Onsite facility and compound arrangements, where agreed',
      'Utility and communal service coordination, where agreed',
      'Property management contact as agreed',
    ],
    ownerBenefit: 'Support with coordinating property operations within the agreed management scope.',
    iconName: 'Building2',
  },
  {
    id: 'rent-collection-payment-management',
    title: 'Rent Collection and Payment Management',
    category: 'Financial & Remittance',
    shortDesc: 'Rent collection and payment tracking may be included in the agreed service scope for a property.',
    fullDesc: 'Confirm whether rent collection is included, which payment channels apply, and what receipts or payment records may be available for each property.',
    deliverables: [
      'Rent collection arrangements, where included',
      'Payment records or receipts, where available and agreed',
      'Review of outstanding balances where included in the service',
      'Payment histories and follow-up arrangements as agreed',
    ],
    ownerBenefit: 'A coordinated process for rent collection and payment records; actual collections depend on tenant payments.',
    iconName: 'Banknote',
  },
  {
    id: 'tenant-management',
    title: 'Tenant Management',
    category: 'Tenancy & Onboarding',
    shortDesc: 'Tenant onboarding, communication, and recordkeeping options can be discussed for each property.',
    fullDesc: 'Tenant onboarding may include collecting agreed information, maintaining tenancy records, and coordinating tenancy documents. Information requirements and recordkeeping arrangements should be confirmed with the company.',
    deliverables: [
      'Tenant information and registration arrangements as agreed',
      'Tenancy document coordination, where included',
      'Move-in or move-out records, where agreed',
      'Tenant records and renewal communication as agreed',
    ],
    ownerBenefit: 'A structured approach to tenant information and occupancy records.',
    iconName: 'FileCheck',
  },
  {
    id: 'property-maintenance',
    title: 'Property Maintenance',
    category: 'Maintenance & Care',
    shortDesc: 'Maintenance requests, repairs, and condition reviews may be included, subject to the service scope agreed for each property.',
    fullDesc: 'Maintenance requests may be coordinated with service providers. Provider selection, estimates, approvals, work reviews, and payment arrangements should be agreed with the owner.',
    deliverables: [
      'Maintenance request coordination, where included',
      'Discussion of local repair providers, where relevant',
      'Repair approval process as agreed with the owner',
      'Work completion records or review, where agreed',
    ],
    ownerBenefit: 'Helps owners discuss and coordinate property maintenance needs.',
    iconName: 'Wrench',
  },
  {
    id: 'financial-records-reporting',
    title: 'Financial Records and Reporting',
    category: 'Financial & Remittance',
    shortDesc: 'Financial recordkeeping and reporting may cover rental income, expenses, payments, and other property transactions.',
    fullDesc: 'Report contents, supporting documents, and frequency should be agreed for each property and depend on the available records.',
    deliverables: [
      'Income and expense summaries as agreed',
      'Available invoices or receipts, where applicable',
      'Payment and balance information from available records',
      'Additional summaries, where agreed',
    ],
    ownerBenefit: 'A way to review property income and expenses using the reporting arrangement agreed with the company.',
    iconName: 'BarChart3',
  },
  {
    id: 'property-inspections',
    title: 'Property Inspection Arrangements',
    category: 'Maintenance & Care',
    shortDesc: 'Property inspections may be arranged to review condition and discuss maintenance needs, subject to the agreed service scope.',
    fullDesc: 'Inspection scope, access, timing, and any condition notes or photos should be agreed for each property.',
    deliverables: [
      'Inspection arrangements as agreed',
      'Condition notes or photos, where agreed',
      'Review of visible or reported maintenance concerns',
      'Move-in or move-out records, where agreed',
    ],
    ownerBenefit: 'Condition information can help owners discuss maintenance decisions for the property.',
    iconName: 'Search',
  },
  {
    id: 'tenant-support',
    title: 'Tenant Support',
    category: 'Tenancy & Onboarding',
    shortDesc: 'Tenant support may cover rental payments, maintenance requests, tenancy information, or other property-related questions.',
    fullDesc: 'Tenant support may include communication about payment methods, maintenance requests, tenancy information, or other property-related questions. The scope and response arrangements depend on the agreement.',
    deliverables: [
      'Contact by agreed phone or messaging channels',
      'Maintenance request coordination, where included',
      'Tenancy and property information',
      'Updates as agreed for the property',
    ],
    ownerBenefit: 'A contact route for tenant questions within the agreed management scope.',
    iconName: 'MessageSquareText',
  },
  {
    id: 'property-owner-support',
    title: 'Property Owner Support',
    category: 'Financial & Remittance',
    shortDesc: 'Owner communications may cover property information, financial records, tenancy matters, and maintenance, as agreed for each property.',
    fullDesc: 'Confirm available communication channels and whether remote updates or property photos and video are part of the service scope.',
    deliverables: [
      'Property contact arrangements as agreed',
      'Payment method and timing, as agreed for the property',
      'Property information and reporting as agreed',
      'Remote communication arrangements, where available',
    ],
    ownerBenefit: 'Property updates and management support through agreed communication channels.',
    iconName: 'UserCheck',
  },
];

// Overview of a possible 5-step management process
export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Property Information',
    timeline: 'Timing agreed with the company',
    description: 'The owner and company can discuss the property, requirements, and potential management scope.',
    keyOutputs: [
      'Property information discussion',
      'Review of owner requirements and service scope',
      'Any next steps confirmed directly with the company',
    ],
  },
  {
    step: 2,
    title: 'Tenant Arrangements',
    timeline: 'Arranged for each property',
    description: 'Tenant communications, information requirements, and tenancy documents can be discussed for each property.',
    keyOutputs: [
      'Tenant information requirements as agreed',
      'Tenancy document coordination, where included',
      'Move-in records, where agreed',
    ],
  },
  {
    step: 3,
    title: 'Rent and Payment Records',
    timeline: 'Schedule agreed per property',
    description: 'Rent collection and payment tracking may be included, with payment methods and follow-up arrangements agreed for each property.',
    keyOutputs: [
      'Payment channels discussed for the property',
      'Records and receipts according to the agreed process',
      'Follow-up arrangements, where included',
    ],
  },
  {
    step: 4,
    title: 'Maintenance Coordination',
    timeline: 'Arranged according to the agreement',
    description: 'Maintenance requests may be coordinated with service providers; approvals and any work review should be agreed with the owner.',
    keyOutputs: [
      'Maintenance request coordination for managed properties',
      'Provider selection and estimates discussed with the owner',
      'Work review and payment arrangements as agreed',
    ],
  },
  {
    step: 5,
    title: 'Reporting and Communication',
    timeline: 'Reporting schedule agreed per property',
    description: 'Reporting content, frequency, payment arrangements, and communication channels can be agreed with the owner.',
    keyOutputs: [
      'Financial report format and frequency as agreed',
      'Payment method and timing confirmed for the property',
      'Owner and tenant communication arrangements as agreed',
    ],
  },
];

export const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Landlords',
    question: 'How does Didoabe Property Company charge for property management?',
    answer: 'This website does not publish a standard management fee or onboarding charge. Ask the company which fees apply to your property and request the terms in writing.',
  },
  {
    id: 'faq-2',
    category: 'Landlords',
    question: 'How are landlord payments arranged?',
    answer: 'Confirm the payment method, timing, and any supporting records directly with the company. This website does not state a standard payment date or guarantee a payment amount.',
  },
  {
    id: 'faq-3',
    category: 'Landlords',
    question: 'How do you handle landlords based abroad (in the Diaspora)?',
    answer: 'Contact the company to discuss possible remote communication arrangements. Services, property visits, and payment arrangements depend on the scope confirmed for each property.',
  },
  {
    id: 'faq-4',
    category: 'Tenants',
    question: 'How do tenants submit maintenance and repair requests?',
    answer: 'The Tenant Support page prepares your request in WhatsApp. Review it there and press Send to deliver it to our team. You can also call the office. For urgent safety or property emergencies, call rather than relying on this website form. Response arrangements depend on your property management agreement and the issue.',
  },
  {
    id: 'faq-5',
    category: 'Tenants',
    question: 'How are rent payments made and verified?',
    answer: 'Ask the property manager which payment methods and confirmation process apply to your tenancy. Keep your payment confirmation and ask whether a receipt or payment record is available.',
  },
  {
    id: 'faq-6',
    category: 'Financials & Remittance',
    question: 'Can unauthorized repairs be deducted from my rental income?',
    answer: 'Before work is arranged, ask the company how repair approvals and any deductions would be handled. Confirm approval limits, urgent-work procedures, and available records for your property.',
  },
  {
    id: 'faq-7',
    category: 'Maintenance',
    question: 'How are maintenance providers and repair approvals handled?',
    answer: 'Ask the company how repair providers are selected, what estimates or supporting details may be available, and how approval is handled before work begins.',
  },
  {
    id: 'faq-8',
    category: 'General',
    question: 'Do you sell land, buy houses, or broker real estate investments?',
    answer: 'This website describes Didoabe Property Company\'s property management services. Contact the company directly with questions about other services.',
  },
  {
    id: 'faq-9',
    category: 'Landlords',
    question: 'What happens if a tenant falls behind on rent payments?',
    answer: 'Rent follow-up steps depend on the tenancy and management arrangements. Property owners should ask the company about its current process and responsibilities before entering an agreement.',
  },
];
