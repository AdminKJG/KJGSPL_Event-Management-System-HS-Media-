// ═══════════════════════════════════════════════
// OPERATIONS DATA — Run of Show, Incidents, Vendors
// ═══════════════════════════════════════════════

export const runOfShow = [
  { id: 'ros-1', time: '07:00', duration: '2h', activity: 'Venue Open — Vendor & Crew Setup', owner: 'James Wright', location: 'All Areas', status: 'completed', dependencies: [], notes: 'Crew access from loading bay B' },
  { id: 'ros-2', time: '09:00', duration: '1h', activity: 'Gates Open — Attendee Registration', owner: 'Priya Mehta', location: 'Main Entrance', status: 'completed', dependencies: ['ros-1'], notes: 'Registration desks ×6, badge printing ×2' },
  { id: 'ros-3', time: '09:30', duration: '30m', activity: 'Exhibitor Final Setup', owner: 'Omar Al-Rashid', location: 'All Halls', status: 'completed', dependencies: ['ros-1'], notes: 'Last 30 min for exhibitor adjustments' },
  { id: 'ros-4', time: '10:00', duration: '45m', activity: 'Opening Ceremony', owner: 'Harshad Shah', location: 'Main Stage', status: 'on-track', dependencies: ['ros-2', 'ros-3'], notes: 'MC: Sara Kapoor. VIP seated by 09:50.' },
  { id: 'ros-5', time: '10:45', duration: '1h', activity: 'Keynote: Future of Media in MENA', owner: 'Sara Kapoor', location: 'Main Stage', status: 'on-track', dependencies: ['ros-4'], notes: 'Speaker: Ahmed Al-Khalifa, BeIN Media' },
  { id: 'ros-6', time: '11:45', duration: '15m', activity: 'Networking Break', owner: 'Omar Al-Rashid', location: 'Hall B & Foyer', status: 'upcoming', dependencies: ['ros-5'], notes: 'Coffee & refreshments served' },
  { id: 'ros-7', time: '12:00', duration: '1h', activity: 'Panel Discussion: Creator Economy 2026', owner: 'Sara Kapoor', location: 'Main Stage', status: 'upcoming', dependencies: ['ros-6'], notes: 'Panel of 5 creators + moderator' },
  { id: 'ros-8', time: '13:00', duration: '1.5h', activity: 'Lunch Break & Exhibition Open', owner: 'Omar Al-Rashid', location: 'Food Zone & All Halls', status: 'upcoming', dependencies: ['ros-7'], notes: 'F&B by Sofitel Catering' },
  { id: 'ros-9', time: '14:30', duration: '45m', activity: 'Sponsor Showcase: Technology & Innovation', owner: 'Priya Mehta', location: 'Hall A', status: 'upcoming', dependencies: ['ros-8'], notes: 'Etisalat & du Telecom presenting' },
  { id: 'ros-10', time: '15:15', duration: '45m', activity: 'Live Performance — Regional Artist', owner: 'James Wright', location: 'Main Stage', status: 'upcoming', dependencies: [], notes: 'Sound check at 14:00. Artist: TBC.' },
  { id: 'ros-11', time: '16:00', duration: '30m', activity: 'Awards Ceremony', owner: 'Harshad Shah', location: 'Main Stage', status: 'upcoming', dependencies: ['ros-10'], notes: '8 categories. Trophy courier confirmed.' },
  { id: 'ros-12', time: '16:30', duration: '30m', activity: 'Closing & Networking', owner: 'Sara Kapoor', location: 'Main Stage & Foyer', status: 'upcoming', dependencies: ['ros-11'], notes: 'Official close. Press photo session.' },
  { id: 'ros-13', time: '17:00', duration: '3h', activity: 'Venue Teardown', owner: 'James Wright', location: 'All Areas', status: 'upcoming', dependencies: ['ros-12'], notes: 'Exhibitor dismantling. All vendors out by 20:00.' },
];

export const incidents = [
  {
    id: 'INC-001',
    title: 'Speaker arrival delayed — Keynote at risk',
    description: 'Ahmed Al-Khalifa (BeIN keynote speaker) has not arrived at venue. Flight reportedly delayed. Currently 45 min behind schedule.',
    severity: 'critical',
    status: 'in-progress',
    owner: 'Omar Al-Rashid',
    reported: '10:12',
    reportedBy: 'Sara Kapoor',
    session: 'ros-5',
    escalated: true,
    timeline: [
      { time: '10:12', event: 'Incident created', user: 'Sara Kapoor', type: 'brand' },
      { time: '10:14', event: 'Assigned to Omar Al-Rashid', user: 'System', type: 'neutral' },
      { time: '10:18', event: 'Escalated to Harshad Shah', user: 'Omar Al-Rashid', type: 'warning' },
      { time: '10:22', event: 'Backup speaker briefed and on standby', user: 'Omar Al-Rashid', type: 'success' },
      { time: '10:35', event: 'Speaker confirmed at airport — ETA 11:00', user: 'Omar Al-Rashid', type: 'info' },
    ],
  },
  {
    id: 'INC-002',
    title: 'Stage LED screen malfunction — Hall A display down',
    description: 'Left LED panel in Hall A is showing black screen. AV team notified. May affect sponsor branding visibility.',
    severity: 'high',
    status: 'open',
    owner: 'James Wright',
    reported: '09:45',
    reportedBy: 'Production Crew',
    escalated: false,
    timeline: [
      { time: '09:45', event: 'Incident reported by production crew', user: 'Production', type: 'danger' },
      { time: '09:50', event: 'Assigned to James Wright', user: 'System', type: 'neutral' },
      { time: '10:01', event: 'AV technician dispatched to Hall A', user: 'James Wright', type: 'info' },
    ],
  },
  {
    id: 'INC-003',
    title: 'Queue overflow at North Entrance',
    description: 'Registration queue extending beyond foyer. Crowd management support needed at North Entrance.',
    severity: 'medium',
    status: 'resolved',
    owner: 'Priya Mehta',
    reported: '09:25',
    reportedBy: 'Security Lead',
    escalated: false,
    resolvedAt: '09:55',
    timeline: [
      { time: '09:25', event: 'Reported by security lead', user: 'Security', type: 'warning' },
      { time: '09:28', event: 'Assigned to Priya Mehta', user: 'System', type: 'neutral' },
      { time: '09:35', event: '2 additional registration desks opened', user: 'Priya Mehta', type: 'success' },
      { time: '09:55', event: 'Queue reduced. Incident resolved.', user: 'Priya Mehta', type: 'success' },
    ],
  },
];

export const vendors = [
  { id: 'v1', name: 'Sofitel Catering', category: 'Catering', owner: 'Omar Al-Rashid', status: 'confirmed', contract: 'signed', payment: 'paid-50', delivery: 'on-track', risk: 'low', value: 450000 },
  { id: 'v2', name: 'XL Events Production', category: 'Production', owner: 'James Wright', status: 'confirmed', contract: 'signed', payment: 'paid-30', delivery: 'at-risk', risk: 'medium', value: 1200000 },
  { id: 'v3', name: 'G4S Security Services', category: 'Security', owner: 'Omar Al-Rashid', status: 'pending', contract: 'draft', payment: 'not-paid', delivery: 'blocked', risk: 'high', value: 320000 },
  { id: 'v4', name: 'DHL Logistics', category: 'Logistics', owner: 'Omar Al-Rashid', status: 'confirmed', contract: 'signed', payment: 'paid-100', delivery: 'on-track', risk: 'low', value: 85000 },
  { id: 'v5', name: 'Etisalat Enterprise', category: 'Technology', owner: 'Priya Mehta', status: 'confirmed', contract: 'signed', payment: 'paid-50', delivery: 'on-track', risk: 'low', value: 220000 },
  { id: 'v6', name: 'Adecco Staffing', category: 'Staffing', owner: 'Omar Al-Rashid', status: 'confirmed', contract: 'signed', payment: 'paid-25', delivery: 'on-track', risk: 'low', value: 160000 },
];
