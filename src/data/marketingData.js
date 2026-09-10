// ═══════════════════════════════════════════════
// MARKETING DATA — Campaigns, Creators, Programme
// ═══════════════════════════════════════════════

export const campaigns = [
  { id: 'c1', name: 'Event Launch Announcement', channel: 'Instagram', creator: 'In-house', start: 'Aug 1', end: 'Aug 7', status: 'completed', impressions: 145000, reach: 89000, leads: 320 },
  { id: 'c2', name: 'Speaker Reveal Series', channel: 'LinkedIn', creator: 'Sara Kapoor', start: 'Aug 10', end: 'Aug 25', status: 'completed', impressions: 98000, reach: 62000, leads: 215 },
  { id: 'c3', name: 'Sponsor Spotlight — MBC Group', channel: 'Instagram + TikTok', creator: 'Mehwish Khan', start: 'Aug 28', end: 'Sep 5', status: 'completed', impressions: 210000, reach: 134000, leads: 0 },
  { id: 'c4', name: 'Early Bird Ticket Push', channel: 'Email + Meta Ads', creator: 'In-house', start: 'Sep 1', end: 'Sep 15', status: 'active', impressions: 67000, reach: 45000, leads: 890 },
  { id: 'c5', name: 'Creator Economy Feature', channel: 'YouTube', creator: 'Faisal Al-Amri', start: 'Sep 10', end: 'Sep 17', status: 'active', impressions: 34000, reach: 28000, leads: 120 },
  { id: 'c6', name: 'Final Countdown Campaign', channel: 'All Channels', creator: 'In-house + Creators', start: 'Oct 8', end: 'Oct 15', status: 'scheduled', impressions: 0, reach: 0, leads: 0 },
  { id: 'c7', name: 'Event Day Live Coverage', channel: 'Instagram Live + TikTok', creator: 'Multiple', start: 'Oct 15', end: 'Oct 17', status: 'scheduled', impressions: 0, reach: 0, leads: 0 },
];

export const creators = [
  { id: 'cr1', name: 'Mehwish Khan', category: 'Lifestyle & Entertainment', platform: 'Instagram', audience: '2.4M', engagement: '4.8%', relevance: 95, status: 'contracted', location: 'Dubai', rate: 85000 },
  { id: 'cr2', name: 'Faisal Al-Amri', category: 'Media & Technology', platform: 'YouTube', audience: '890K', engagement: '6.2%', relevance: 92, status: 'contracted', location: 'Riyadh', rate: 65000 },
  { id: 'cr3', name: 'Nour Ibrahim', category: 'Business & Finance', platform: 'LinkedIn', audience: '340K', engagement: '5.1%', relevance: 88, status: 'shortlisted', location: 'Cairo', rate: 42000 },
  { id: 'cr4', name: 'Rania Al-Fares', category: 'Music & Culture', platform: 'TikTok', audience: '5.1M', engagement: '8.4%', relevance: 82, status: 'shortlisted', location: 'Dubai', rate: 120000 },
  { id: 'cr5', name: 'Tariq Hassan', category: 'Sports & Entertainment', platform: 'Instagram + YouTube', audience: '1.8M', engagement: '3.9%', relevance: 79, status: 'outreach', location: 'Beirut', rate: 75000 },
  { id: 'cr6', name: 'Laila Benali', category: 'Fashion & Lifestyle', platform: 'Instagram', audience: '1.2M', engagement: '5.5%', relevance: 74, status: 'outreach', location: 'Dubai', rate: 55000 },
];

export const programme = [
  { id: 'p1', time: '10:00', duration: '45 min', session: 'Opening Ceremony', type: 'ceremony', stage: 'Main Stage', speaker: 'Harshad Shah + Dignitaries', status: 'confirmed' },
  { id: 'p2', time: '10:45', duration: '1 hr', session: 'Keynote: Future of Media in MENA', type: 'keynote', stage: 'Main Stage', speaker: 'Ahmed Al-Khalifa (CEO, BeIN Media)', status: 'confirmed' },
  { id: 'p3', time: '11:45', duration: '15 min', session: 'Networking Break', type: 'break', stage: 'Foyer & Hall B', speaker: '—', status: 'confirmed' },
  { id: 'p4', time: '12:00', duration: '1 hr', session: 'Panel: Creator Economy 2026', type: 'panel', stage: 'Main Stage', speaker: '5-person panel', status: 'confirmed' },
  { id: 'p5', time: '13:00', duration: '1.5 hr', session: 'Lunch & Exhibition', type: 'break', stage: 'All Halls + Food Zone', speaker: '—', status: 'confirmed' },
  { id: 'p6', time: '14:30', duration: '45 min', session: 'Sponsor Showcase: Tech & Innovation', type: 'sponsor', stage: 'Hall A', speaker: 'Etisalat & du Telecom', status: 'confirmed' },
  { id: 'p7', time: '15:15', duration: '45 min', session: 'Live Performance', type: 'performance', stage: 'Main Stage', speaker: 'Regional Artist (TBC)', status: 'pending' },
  { id: 'p8', time: '16:00', duration: '30 min', session: 'Awards Ceremony', type: 'awards', stage: 'Main Stage', speaker: 'Harshad Shah', status: 'confirmed' },
  { id: 'p9', time: '16:30', duration: '30 min', session: 'Closing & Networking', type: 'close', stage: 'Main Stage + Foyer', speaker: 'Sara Kapoor', status: 'confirmed' },
];

export const postEventData = {
  attendance: { total: 11840, target: 12000, vip: 342, media: 128 },
  revenue: {
    sponsorships: 14200000,
    tickets: 2800000,
    exhibition: 1400000,
    total: 18400000,
    target: 18000000,
  },
  sponsorPerformance: [
    { sponsor: 'MBC Group', package: 'Platinum', value: 1200000, leads: 347, status: 'exceeded' },
    { sponsor: 'Etisalat', package: 'Gold', value: 595000, leads: 218, status: 'met' },
    { sponsor: 'Dubai Media', package: 'Platinum', value: 1450000, leads: 412, status: 'exceeded' },
    { sponsor: 'OSN', package: 'Silver', value: 240000, leads: 98, status: 'met' },
  ],
  incidents: { total: 3, resolved: 3, avgResolutionTime: '22 min' },
  nps: 78,
  campaignReach: 890000,
  followUps: [
    { stakeholder: 'BeIN Media Group', action: 'Renewal discussion for 2027', owner: 'Priya Mehta', due: 'Oct 22', status: 'pending' },
    { stakeholder: 'Mehwish Khan', action: 'Future campaign partnership', owner: 'Sara Kapoor', due: 'Oct 25', status: 'pending' },
    { stakeholder: 'G4S Security', action: 'Contract review & improvement plan', owner: 'Omar Al-Rashid', due: 'Oct 20', status: 'in-progress' },
    { stakeholder: 'All Platinum Sponsors', action: 'Send post-event impact report', owner: 'Priya Mehta', due: 'Oct 18', status: 'pending' },
  ],
};
