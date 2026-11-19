import type { DidoabeContactConfig, PropertyListing } from '../types/property';

/**
 * Central company contact & integration placeholders.
 * Replace these placeholder values before deploying to production.
 */
export const DIDOABE_CONFIG: DidoabeContactConfig = {
  companyName: 'Didoabe Property Company',
  contactDetailsVerified: false,
  whatsappNumberDigits: '',
  whatsappDisplayPlaceholder: '[Official WhatsApp number not provided]',
  phoneDisplayPlaceholder: '[Official telephone not provided]',
  emailPlaceholder: '[Official email not provided]',
  officeAddressPlaceholder: '[Official office address not provided]',
};

export const HERO_BANNER_IMAGE = {
  url: '/images/vacant-houses/hero-uganda-residence.jpg',
  alt: 'Realistic modern Ugandan residential bungalow with paved compound and covered veranda',
};

export const EMPTY_STATE_IMAGE = {
  url: '/images/vacant-houses/house-mukono-home.jpg',
  alt: 'Well-kept Ugandan residential rental home surrounded by green lawn',
};

/**
 * DEMONSTRATION SAMPLE PROPERTY DATA
 * ---------------------------------------------------------------------------
 * IMPORTANT: All listings below are clearly marked as sample demonstration data
 * (`isSampleData: true`) and do NOT represent live Didoabe vacancies.
 * To connect real property listings later, replace `SAMPLE_VACANT_HOUSES` or
 * pass a `properties` array prop directly into <VacantHousesPage properties={...} />.
 */
export const SAMPLE_VACANT_HOUSES: PropertyListing[] = [
  {
    id: 'sample-ntinda-01',
    referenceCode: 'DPC-SAMPLE-101',
    name: 'Ntinda Stretcher 3-Bedroom Bungalow',
    location: 'Ntinda, Kampala',
    district: 'Kampala',
    monthlyRentUgx: 1800000,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'Standalone Bungalow',
    shortDescription:
      'Neat 3-bedroom family bungalow off Stretcher Road with paved compound parking, covered veranda, and private gate.',
    fullDescription:
      'Located in a quiet residential lane off Ntinda Stretcher Road, this well-maintained 3-bedroom bungalow offers practical everyday living close to supermarkets, schools, and the Northern Bypass. The home features a bright open living and dining area with glossy ceramic tiles, a fitted mahogany-finish kitchen with granite worktops, three spacious bedrooms with built-in wardrobes, and a reliable reserve water tank.',
    rentalConditions: [
      'Minimum tenancy period: 12 months',
      'Advance payment: 3 months rent plus 1 month refundable security deposit',
      'Utilities: Independent Yaka pre-paid electricity and NWSC water meter paid by tenant',
      'Compound maintenance: Tenant maintains lawn and yard; major structural repairs handled by landlord',
      'All tenancy applications are subject to Didoabe Property Company approval and reference checks',
    ],
    facilities: [
      'Cabro-paved parking for 2 vehicles',
      'Brick perimeter wall with lockable steel gate',
      'Independent Yaka & NWSC meters',
      '2,000L overhead reserve water tank',
      'Fitted kitchen cabinets & double sink',
      'Built-in timber wardrobes in bedrooms',
      'Burglar-proofed sliding windows',
      'Covered front veranda',
    ],
    images: [
      {
        url: '/images/vacant-houses/house-ntinda-exterior.jpg',
        alt: 'Ntinda Stretcher 3-bedroom bungalow front exterior and parking yard',
        caption: 'Front elevation & paved compound parking',
      },
      {
        url: '/images/vacant-houses/interior-living-uganda.jpg',
        alt: 'Bright tiled living and dining room with security grilles',
        caption: 'Open living and dining room',
      },
      {
        url: '/images/vacant-houses/interior-kitchen-uganda.jpg',
        alt: 'Fitted wooden kitchen cabinets with granite countertops',
        caption: 'Fitted kitchen with granite worktops',
      },
      {
        url: '/images/vacant-houses/interior-bedroom-uganda.jpg',
        alt: 'Master bedroom with built-in timber wardrobes',
        caption: 'Spacious bedroom with built-in wardrobes',
      },
    ],
    isFeatured: true,
    isRecentlyAdded: true,
    addedAt: '2026-11-16',
    isSampleData: true,
  },
  {
    id: 'sample-kira-02',
    referenceCode: 'DPC-SAMPLE-102',
    name: 'Kira Bulindo 2-Bedroom Garden Bungalow',
    location: 'Kira, Wakiso',
    district: 'Wakiso',
    monthlyRentUgx: 950000,
    bedrooms: 2,
    bathrooms: 1,
    propertyType: 'Standalone Bungalow',
    shortDescription:
      'Clean 2-bedroom rental home inside a walled compound with green front lawn, tiled floors, and easy access to Kira town.',
    fullDescription:
      'Set in a peaceful residential pocket in Bulindo, Kira Municipality, this modest 2-bedroom standalone bungalow is ideal for a young couple or small family seeking privacy and an enclosed compound. The layout includes a sunlit sitting room, a practical kitchen with storage cabinets, two comfortable bedrooms sharing a clean tiled bathroom, and a neat grass lawn with paved walkway.',
    rentalConditions: [
      'Minimum tenancy period: 6 months (12 months preferred)',
      'Advance payment: 3 months rent plus UGX 500,000 refundable security deposit',
      'Utilities: Separate pre-paid Yaka meter and individual NWSC water connection',
      'Subletting is not permitted without written company consent',
      'All applications are subject to company verification and approval',
    ],
    facilities: [
      'Private walled compound & steel gate',
      'Neat green lawn & paved walkway',
      'Independent Yaka & NWSC water meter',
      'Tiled floors throughout',
      'Security grilles on all windows & doors',
      'Parking space for 1–2 cars',
    ],
    images: [
      {
        url: '/images/vacant-houses/house-kira-bungalow.jpg',
        alt: 'Kira Bulindo 2-bedroom bungalow with green roof and walled garden',
        caption: 'Front view and enclosed compound',
      },
      {
        url: '/images/vacant-houses/interior-living-uganda.jpg',
        alt: 'Living area with ceramic floor tiles',
        caption: 'Main living room',
      },
      {
        url: '/images/vacant-houses/interior-bedroom-uganda.jpg',
        alt: 'Bedroom with built-in wardrobe and large window',
        caption: 'Primary bedroom',
      },
      {
        url: '/images/vacant-houses/interior-kitchen-uganda.jpg',
        alt: 'Modern fitted kitchen',
        caption: 'Kitchen interior',
      },
    ],
    isFeatured: true,
    isRecentlyAdded: false,
    addedAt: '2026-11-08',
    isSampleData: true,
  },
  {
    id: 'sample-najjera-03',
    referenceCode: 'DPC-SAMPLE-103',
    name: 'Najjera II 2-Bedroom Terrace Residence',
    location: 'Najjera, Kampala',
    district: 'Kampala',
    monthlyRentUgx: 1200000,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: 'Terrace Apartment',
    shortDescription:
      'Modern 2-bedroom, 2-bathroom terrace unit in Najjera II with private balcony, shared cabro courtyard, and 24-hour gate watch.',
    fullDescription:
      'Conveniently situated near Najjera II tarmac access, this crisp 2-bedroom terrace residence offers two full bathrooms (master en-suite), a bright living room opening onto a tiled balcony, and a well-organized kitchen. The gated courtyard provides dedicated cabro parking, neat landscaping, and reliable security lighting for working professionals and small households.',
    rentalConditions: [
      'Minimum tenancy period: 12 months',
      'Advance payment: 3 months rent plus 1 month refundable security deposit',
      'Monthly service fee: Included in rent for compound cleaning and gate security',
      'Utilities: Individual Yaka electricity meter and sub-metered NWSC water',
      'All applications are subject to Didoabe Property Company approval',
    ],
    facilities: [
      'Master bedroom en-suite bathroom',
      'Private tiled balcony',
      'Shared cabro-paved courtyard parking',
      'Day & night gate security',
      'Water storage tanks on site',
      'Close to public transport & shops',
    ],
    images: [
      {
        url: '/images/vacant-houses/house-najjera-duplex.jpg',
        alt: 'Najjera II modern two-storey terrace apartments with paved courtyard',
        caption: 'Building exterior & courtyard parking',
      },
      {
        url: '/images/vacant-houses/interior-kitchen-uganda.jpg',
        alt: 'Kitchen with wooden cabinetry and granite counter',
        caption: 'Fitted kitchen',
      },
      {
        url: '/images/vacant-houses/interior-living-uganda.jpg',
        alt: 'Living space with sliding doors',
        caption: 'Living room with balcony access',
      },
      {
        url: '/images/vacant-houses/interior-bedroom-uganda.jpg',
        alt: 'Clean tiled bedroom',
        caption: 'En-suite bedroom',
      },
    ],
    isFeatured: false,
    isRecentlyAdded: true,
    addedAt: '2026-11-15',
    isSampleData: true,
  },
  {
    id: 'sample-entebbe-04',
    referenceCode: 'DPC-SAMPLE-104',
    name: 'Entebbe Bugonga 3-Bedroom Veranda Home',
    location: 'Entebbe, Wakiso',
    district: 'Wakiso',
    monthlyRentUgx: 2100000,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'Standalone House',
    shortDescription:
      'Airy 3-bedroom house in quiet Bugonga, Entebbe featuring a shaded timber veranda, mature garden, and shaded carport.',
    fullDescription:
      'Tucked in leafy Bugonga just minutes from Entebbe Airport and Lake Victoria breeze corridors, this charming 3-bedroom home combines comfort with relaxed suburban calm. Enjoy a wide shaded front veranda, generous living and dining rooms, a well-appointed kitchen, and a lush private compound with flowering bougainvillea and covered carport.',
    rentalConditions: [
      'Minimum tenancy period: 12 months',
      'Advance payment: 3 months rent plus 1 month refundable security deposit',
      'Utilities: Tenant pays Yaka electricity, NWSC water, and garbage collection',
      'Pets permitted in the compound upon prior written approval',
      'All applications are subject to Didoabe Property Company approval',
    ],
    facilities: [
      'Covered carport & paved driveway',
      'Shaded wooden front veranda',
      'Mature private lawn & garden',
      '3,000L backup water tank',
      'Perimeter wall with electric fence wiring',
      'Quiet residential street',
    ],
    images: [
      {
        url: '/images/vacant-houses/house-entebbe-cottage.jpg',
        alt: 'Entebbe Bugonga 3-bedroom house with shaded porch and lush garden',
        caption: 'Front porch, garden & carport',
      },
      {
        url: '/images/vacant-houses/interior-living-uganda.jpg',
        alt: 'Bright airy living and dining space',
        caption: 'Living & dining room',
      },
      {
        url: '/images/vacant-houses/interior-kitchen-uganda.jpg',
        alt: 'Modern wooden kitchen with bright garden window',
        caption: 'Kitchen overlooking garden',
      },
      {
        url: '/images/vacant-houses/interior-bedroom-uganda.jpg',
        alt: 'Spacious bedroom with wardrobe',
        caption: 'Master bedroom',
      },
    ],
    isFeatured: true,
    isRecentlyAdded: false,
    addedAt: '2026-11-05',
    isSampleData: true,
  },
  {
    id: 'sample-lubowa-05',
    referenceCode: 'DPC-SAMPLE-105',
    name: 'Lubowa Estate 4-Bedroom Family Residence',
    location: 'Lubowa, Entebbe Road',
    district: 'Wakiso',
    monthlyRentUgx: 3200000,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'Two-Storey Family House',
    shortDescription:
      'Spacious 4-bedroom, 3-bathroom residence along Entebbe Road in Lubowa with garage, guardhouse, and generous paved yard.',
    fullDescription:
      'Designed for larger families wanting reliable access to both Kampala CBD and Entebbe Road amenities, this 4-bedroom two-storey residence in Lubowa provides ample room indoors and out. Highlights include a stone-clad entrance porch, formal lounge and dining room, modern kitchen with pantry, three bathrooms, an upper balcony, lockable garage, and a self-contained staff room.',
    rentalConditions: [
      'Minimum tenancy period: 12 months',
      'Advance payment: 6 months preferred (3 months negotiable) plus 1 month security deposit',
      'Utilities: Independent Yaka 3-phase power and NWSC water paid by tenant',
      'No commercial sub-use; strictly residential family occupancy',
      'All applications are subject to Didoabe Property Company approval',
    ],
    facilities: [
      'Lockable garage & parking for 4 cars',
      'Guardhouse at main gate',
      '4 bedrooms, 3 full bathrooms',
      'Separate staff quarters (1 room)',
      'Upper floor balcony',
      'Solar water heater installed',
      'Spacious cabro-paved compound & lawn',
    ],
    images: [
      {
        url: '/images/vacant-houses/house-lubowa-family.jpg',
        alt: 'Lubowa Estate 4-bedroom two-storey family residence with spacious cabro compound',
        caption: 'Exterior facade & cabro driveway',
      },
      {
        url: '/images/vacant-houses/interior-living-uganda.jpg',
        alt: 'Expansive living area with recessed lighting',
        caption: 'Ground floor lounge & dining',
      },
      {
        url: '/images/vacant-houses/interior-kitchen-uganda.jpg',
        alt: 'Kitchen with mahogany cabinets and granite counters',
        caption: 'Main kitchen',
      },
      {
        url: '/images/vacant-houses/interior-bedroom-uganda.jpg',
        alt: 'Upper bedroom with built-in closets',
        caption: 'Master bedroom suite',
      },
    ],
    isFeatured: true,
    isRecentlyAdded: true,
    addedAt: '2026-11-17',
    isSampleData: true,
  },
  {
    id: 'sample-mukono-06',
    referenceCode: 'DPC-SAMPLE-106',
    name: 'Seeta Mukono 2-Bedroom Standalone Home',
    location: 'Seeta, Mukono',
    district: 'Mukono',
    monthlyRentUgx: 750000,
    bedrooms: 2,
    bathrooms: 1,
    propertyType: 'Standalone Cottage',
    shortDescription:
      'Affordable, freshly painted 2-bedroom standalone cottage in Seeta with fenced lawn, backup water tank, and quiet surroundings.',
    fullDescription:
      'A practical, budget-friendly 2-bedroom rental cottage in a calm residential neighbourhood in Seeta, Mukono. Freshly repainted inside and out, the house features concrete front steps leading to a cosy sitting room, two bright bedrooms, an indoor kitchen, and a generous fenced green yard with an external reserve water tank.',
    rentalConditions: [
      'Minimum tenancy period: 6 months',
      'Advance payment: 3 months rent plus UGX 400,000 refundable security deposit',
      'Utilities: Pre-paid Yaka electricity and NWSC water billed separately',
      'All applications are subject to Didoabe Property Company approval',
    ],
    facilities: [
      'Fenced green compound',
      'Backup plastic water storage tank',
      'Independent Yaka meter',
      'Freshly painted interior & exterior',
      'Burglar-proofed windows',
      'Walking distance to Seeta stage',
    ],
    images: [
      {
        url: '/images/vacant-houses/house-mukono-home.jpg',
        alt: 'Seeta Mukono 2-bedroom standalone rental house with maroon roof and green yard',
        caption: 'Standalone cottage & green yard',
      },
      {
        url: '/images/vacant-houses/interior-bedroom-uganda.jpg',
        alt: 'Clean tiled bedroom with large window',
        caption: 'Main bedroom',
      },
      {
        url: '/images/vacant-houses/interior-kitchen-uganda.jpg',
        alt: 'Neat fitted kitchen',
        caption: 'Kitchen area',
      },
      {
        url: '/images/vacant-houses/interior-living-uganda.jpg',
        alt: 'Bright sitting room',
        caption: 'Sitting room',
      },
    ],
    isFeatured: false,
    isRecentlyAdded: true,
    addedAt: '2026-11-14',
    isSampleData: true,
  },
  {
    id: 'sample-kyanja-07',
    referenceCode: 'DPC-SAMPLE-107',
    name: 'Kyanja Ring Road 3-Bedroom Residence',
    location: 'Kyanja, Kampala',
    district: 'Kampala',
    monthlyRentUgx: 1650000,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'Standalone Bungalow',
    shortDescription:
      'Well-finished 3-bedroom residence off Kyanja Ring Road with covered front portico, cabro driveway, and modern kitchen.',
    fullDescription:
      'Positioned in sought-after Kyanja near Ring Road, this 3-bedroom standalone home balances modern finishes with practical family comfort. It features a welcoming covered portico, spacious tiled living room, fitted kitchen, master bedroom with private shower room, two additional bedrooms, and an easy-to-maintain cabro driveway with lawn border.',
    rentalConditions: [
      'Minimum tenancy period: 12 months',
      'Advance payment: 3 months rent plus 1 month refundable security deposit',
      'Utilities: Individual Yaka & NWSC accounts managed by tenant',
      'All applications are subject to Didoabe Property Company approval',
    ],
    facilities: [
      'Cabro driveway & shaded carport',
      'Covered front portico',
      'Master bedroom en-suite',
      'Perimeter wall with sliding gate',
      'Independent Yaka & NWSC water',
      'Built-in wardrobes & kitchen cabinets',
    ],
    images: [
      {
        url: '/images/vacant-houses/hero-uganda-residence.jpg',
        alt: 'Kyanja Ring Road 3-bedroom residence with cabro driveway',
        caption: 'Front portico & cabro driveway',
      },
      {
        url: '/images/vacant-houses/interior-living-uganda.jpg',
        alt: 'Spacious open living room',
        caption: 'Living & dining room',
      },
      {
        url: '/images/vacant-houses/interior-kitchen-uganda.jpg',
        alt: 'Fitted wooden kitchen',
        caption: 'Kitchen interior',
      },
      {
        url: '/images/vacant-houses/interior-bedroom-uganda.jpg',
        alt: 'Bedroom with built-in wardrobes',
        caption: 'Master bedroom',
      },
    ],
    isFeatured: false,
    isRecentlyAdded: false,
    addedAt: '2026-11-02',
    isSampleData: true,
  },
];

