// ═══════════════════════════════════════════════
// COMMERCIAL DATA — Venue, Packages, Pipeline
// ═══════════════════════════════════════════════

export const venueZones = [
  { id: 'stage', label: 'Main Stage', color: '#F69123' },
  { id: 'hall-a', label: 'Hall A — Premium', color: '#3b82f6' },
  { id: 'hall-b', label: 'Hall B — Standard', color: '#22c55e' },
  { id: 'hall-c', label: 'Hall C — Experience', color: '#a855f7' },
  { id: 'food', label: 'Food & Beverage', color: '#f59e0b' },
  { id: 'vip', label: 'VIP Lounge', color: '#F69123' },
  { id: 'entrance', label: 'Entrance / Registration', color: '#c7c9ca' },
];

export const stalls = [
  // Hall A — Premium stalls
  { id: 'A1', zone: 'hall-a', label: 'A-01', size: '20×15 ft', sqft: 300, rate: 285000, demand: 'High', interest: 'Rising', status: 'booked', category: 'Premium', package: 'Platinum Sponsor', sponsor: 'Emirates', x: 60, y: 160, w: 100, h: 70 },
  { id: 'A2', zone: 'hall-a', label: 'A-02', size: '20×15 ft', sqft: 300, rate: 285000, demand: 'High', interest: 'Rising', status: 'interested', category: 'Premium', package: 'Platinum Sponsor', x: 170, y: 160, w: 100, h: 70 },
  { id: 'A3', zone: 'hall-a', label: 'A-03', size: '15×12 ft', sqft: 180, rate: 195000, demand: 'High', interest: 'Rising', status: 'available', category: 'Premium', package: 'Gold Sponsor', x: 280, y: 160, w: 90, h: 70 },
  { id: 'A4', zone: 'hall-a', label: 'A-04', size: '15×12 ft', sqft: 180, rate: 195000, demand: 'Medium', interest: 'Stable', status: 'available', category: 'Premium', package: 'Gold Sponsor', x: 380, y: 160, w: 90, h: 70 },
  { id: 'A5', zone: 'hall-a', label: 'A-05', size: '12×10 ft', sqft: 120, rate: 145000, demand: 'Medium', interest: 'Stable', status: 'available', category: 'Premium', package: 'Silver Sponsor', x: 480, y: 160, w: 80, h: 70 },
  
  // Hall B — Standard stalls
  { id: 'B1', zone: 'hall-b', label: 'B-01', size: '12×10 ft', sqft: 120, rate: 95000, demand: 'Medium', interest: 'Stable', status: 'booked', category: 'Standard', package: 'Silver Sponsor', sponsor: 'OSN', x: 60, y: 320, w: 80, h: 60 },
  { id: 'B2', zone: 'hall-b', label: 'B-02', size: '12×10 ft', sqft: 120, rate: 95000, demand: 'Medium', interest: 'Rising', status: 'available', category: 'Standard', package: 'Silver Sponsor', x: 150, y: 320, w: 80, h: 60 },
  { id: 'B3', zone: 'hall-b', label: 'B-03', size: '10×8 ft', sqft: 80, rate: 72000, demand: 'Low', interest: 'Stable', status: 'available', category: 'Standard', package: 'Bronze Sponsor', x: 240, y: 320, w: 75, h: 60 },
  { id: 'B4', zone: 'hall-b', label: 'B-04', size: '10×8 ft', sqft: 80, rate: 72000, demand: 'Low', interest: 'Stable', status: 'available', category: 'Standard', package: 'Bronze Sponsor', x: 325, y: 320, w: 75, h: 60 },
  { id: 'B5', zone: 'hall-b', label: 'B-05', size: '12×10 ft', sqft: 120, rate: 95000, demand: 'High', interest: 'Rising', status: 'interested', category: 'Standard', package: 'Silver Sponsor', x: 410, y: 320, w: 80, h: 60 },
  { id: 'B6', zone: 'hall-b', label: 'B-06', size: '10×8 ft', sqft: 80, rate: 72000, demand: 'Medium', interest: 'Stable', status: 'available', category: 'Standard', package: 'Bronze Sponsor', x: 500, y: 320, w: 75, h: 60 },

  // Hall C — Experience zone
  { id: 'C1', zone: 'hall-c', label: 'C-01', size: '15×15 ft', sqft: 225, rate: 175000, demand: 'High', interest: 'Rising', status: 'interested', category: 'Experience', package: 'Gold Sponsor', x: 60, y: 470, w: 90, h: 70 },
  { id: 'C2', zone: 'hall-c', label: 'C-02', size: '15×15 ft', sqft: 225, rate: 175000, demand: 'High', interest: 'Rising', status: 'available', category: 'Experience', package: 'Gold Sponsor', x: 160, y: 470, w: 90, h: 70 },
  { id: 'C3', zone: 'hall-c', label: 'C-03', size: '20×20 ft', sqft: 400, rate: 350000, demand: 'High', interest: 'Rising', status: 'booked', category: 'Experience', package: 'Platinum Sponsor', sponsor: 'Dubai Media', x: 260, y: 460, w: 110, h: 80 },
  { id: 'C4', zone: 'hall-c', label: 'C-04', size: '15×15 ft', sqft: 225, rate: 175000, demand: 'Medium', interest: 'Stable', status: 'available', category: 'Experience', package: 'Gold Sponsor', x: 382, y: 470, w: 90, h: 70 },
];

export const sponsorPackages = [
  {
    id: 'platinum',
    name: 'Platinum',
    color: '#F69123',
    price: 500000,
    description: 'Maximum visibility, exclusive naming rights',
    benefits: [
      'Naming rights to main stage',
      'Logo on all event collateral',
      '6 VIP passes + 10 standard passes',
      'Dedicated press release',
      'Premium stall location (Hall A)',
      '30-min keynote speaking slot',
      'Full-page ad in event guide',
      'Social media feature (5 posts)',
      'Post-event highlight reel',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    color: '#f59e0b',
    price: 300000,
    description: 'Strong brand presence across the event',
    benefits: [
      'Logo on stage backdrop & lanyards',
      '4 VIP passes + 6 standard passes',
      'Prime stall location',
      '15-min panel speaking slot',
      'Half-page ad in event guide',
      'Social media feature (3 posts)',
      'Lead capture access',
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    color: '#94a3b8',
    price: 150000,
    description: 'Solid brand presence and networking',
    benefits: [
      'Logo on event website & programme',
      '2 VIP passes + 4 standard passes',
      'Standard stall location',
      'Half-page ad in event guide',
      'Social media mention (1 post)',
    ],
  },
  {
    id: 'bronze',
    name: 'Bronze',
    color: '#b45309',
    price: 75000,
    description: 'Entry-level visibility and presence',
    benefits: [
      'Logo on event website',
      '2 standard passes',
      'Basic stall location',
      'Social media mention (1 post)',
    ],
  },
];

export const addOns = [
  { id: 'led', name: 'LED Video Wall (2m × 3m)', price: 85000, category: 'Display' },
  { id: 'social5', name: 'Social Media Amplification Pack (5 posts)', price: 45000, category: 'Marketing' },
  { id: 'vip-lounge', name: 'VIP Lounge Access (10 passes)', price: 65000, category: 'Hospitality' },
  { id: 'keynote-extra', name: 'Additional 15-min Speaking Slot', price: 120000, category: 'Programme' },
  { id: 'app-banner', name: 'Event App Banner (3 days)', price: 35000, category: 'Digital' },
  { id: 'press-release', name: 'Dedicated Press Release', price: 25000, category: 'PR' },
  { id: 'registration-skin', name: 'Registration Desk Branding', price: 40000, category: 'Branding' },
  { id: 'live-stream', name: 'Live Stream Sponsor Credit', price: 90000, category: 'Broadcast' },
];

export const proposals = [
  {
    id: 'PROP-001',
    sponsor: 'BeIN Media Group',
    contact: 'Ahmed Al-Khalifa',
    email: 'ahmed@bein.net',
    stall: 'A-02',
    package: 'Platinum',
    addOns: ['LED Video Wall', 'Social Media Pack', 'VIP Lounge'],
    basePrice: 285000,
    packagePrice: 500000,
    addOnsPrice: 195000,
    total: 980000,
    validity: 'Sep 20, 2026',
    status: 'sent',
    createdAt: 'Sep 5, 2026',
    notes: 'Strong interest. Follow-up call scheduled Sep 12.',
  },
  {
    id: 'PROP-002',
    sponsor: 'Rotana Media',
    contact: 'Layla Hassan',
    email: 'layla@rotana.com',
    stall: 'A-03',
    package: 'Gold',
    addOns: ['Social Media Pack'],
    basePrice: 195000,
    packagePrice: 300000,
    addOnsPrice: 45000,
    total: 540000,
    validity: 'Sep 25, 2026',
    status: 'draft',
    createdAt: 'Sep 8, 2026',
    notes: 'Waiting for internal budget approval.',
  },
  {
    id: 'PROP-003',
    sponsor: 'Etisalat',
    contact: 'Ravi Kumar',
    email: 'ravi.kumar@etisalat.ae',
    stall: 'C-01',
    package: 'Gold',
    addOns: ['LED Video Wall', 'Event App Banner'],
    basePrice: 175000,
    packagePrice: 300000,
    addOnsPrice: 120000,
    total: 595000,
    validity: 'Sep 18, 2026',
    status: 'accepted',
    createdAt: 'Sep 2, 2026',
    notes: 'Contract being prepared.',
  },
];

export const pipeline = [
  { id: 'OPP-001', sponsor: 'BeIN Media Group', contact: 'Ahmed Al-Khalifa', package: 'Platinum', stall: 'A-02', value: 980000, owner: 'Priya Mehta', stage: 'Proposal Sent', nextAction: 'Follow-up call Sep 12', closeDate: 'Sep 20', probability: 70 },
  { id: 'OPP-EM1', sponsor: 'Emirates', contact: 'Omar Hussain', package: 'Platinum', stall: 'A-01', value: 1250000, owner: 'Harshad Shah', stage: 'Won', nextAction: 'Collect design assets', closeDate: 'Sep 1', probability: 100 },
  { id: 'OPP-002', sponsor: 'Rotana Media', contact: 'Layla Hassan', package: 'Gold', stall: 'A-03', value: 540000, owner: 'Priya Mehta', stage: 'Negotiation', nextAction: 'Send revised proposal', closeDate: 'Sep 25', probability: 60 },
  { id: 'OPP-003', sponsor: 'Etisalat', contact: 'Ravi Kumar', package: 'Gold', stall: 'C-01', value: 595000, owner: 'Priya Mehta', stage: 'Won', nextAction: 'Send contract', closeDate: 'Sep 10', probability: 100 },
  { id: 'OPP-004', sponsor: 'du Telecom', contact: 'Sara Ahmad', package: 'Silver', stall: 'B-05', value: 240000, owner: 'Harshad Shah', stage: 'Interested', nextAction: 'Send proposal', closeDate: 'Sep 30', probability: 45 },
  { id: 'OPP-005', sponsor: 'Dubai Tourism', contact: 'Michael Brown', package: 'Gold', stall: 'C-02', value: 475000, owner: 'Harshad Shah', stage: 'Contacted', nextAction: 'Meeting Sep 14', closeDate: 'Oct 1', probability: 35 },
  { id: 'OPP-006', sponsor: 'Virgin Radio', contact: 'Samantha Lee', package: 'Bronze', stall: 'B-03', value: 147000, owner: 'Priya Mehta', stage: 'New', nextAction: 'Send intro deck', closeDate: 'Oct 5', probability: 20 },
  { id: 'OPP-007', sponsor: 'Noon', contact: 'Fahad Al-Saud', package: 'Platinum', stall: 'A-04', value: 850000, owner: 'Harshad Shah', stage: 'New', nextAction: 'Intro call', closeDate: 'Oct 8', probability: 25 },
  { id: 'OPP-008', sponsor: 'Sony Music MENA', contact: 'Kiran Patel', package: 'Silver', stall: 'B-02', value: 240000, owner: 'Priya Mehta', stage: 'Lost', nextAction: '—', closeDate: 'Sep 5', probability: 0, lostReason: 'Budget freeze' },
];

export const pipelineStages = ['New', 'Contacted', 'Interested', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'];
