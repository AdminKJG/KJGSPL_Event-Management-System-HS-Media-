import React, { useState } from 'react';
import { stalls, sponsorPackages, addOns } from '../../data/commercialData';
import AiCopilotModal from '../common/AiCopilotModal';

const fmtAED = (n) => `AED ${(n || 0).toLocaleString()}`;
const fmtAEDK = (n) => `AED ${((n || 0) / 1000).toFixed(0)}K`;

const aiIndustryTemplates = {
  edtech: {
    label: 'Kids EdTech & STEM Academies',
    stallId: 'A3',
    packageId: 'gold',
    addOns: ['led', 'social5', 'press-release'],
    reasoning: 'High-visibility Hall A stall with LED showcase for interactive kids robotics demonstrations.',
    impressions: '120,000+ Parents & Educators',
    roiScore: '4.8x Expected Brand Recall',
  },
  banking: {
    label: 'Youth Banking & Digital Wallets',
    stallId: 'A1',
    packageId: 'platinum',
    addOns: ['led', 'social5', 'vip-lounge', 'keynote-extra', 'app-banner'],
    reasoning: 'Main Stage Platinum naming rights paired with exclusive app badge for youth cashless accounts.',
    impressions: '350,000+ Multichannel Reach',
    roiScore: '5.2x ROI & Lead Acquisition',
  },
  fmcg: {
    label: 'Family FMCG & Healthy Nutrition',
    stallId: 'B5',
    packageId: 'silver',
    addOns: ['social5', 'registration-skin'],
    reasoning: 'High dwell time stall next to Food Zone with entrance registration sampling rights.',
    impressions: '85,000+ Direct Product Samplings',
    roiScore: '3.9x Direct Conversion',
  },
  apparel: {
    label: 'Kids Fashion & Lifestyle Brands',
    stallId: 'C3',
    packageId: 'platinum',
    addOns: ['live-stream', 'social5', 'vip-lounge'],
    reasoning: 'Immersive Hall C experience runway for kids fashion talent and live broadcast integrations.',
    impressions: '280,000+ Live Stream & Attendee Views',
    roiScore: '4.6x Social Brand Lift',
  },
};

export default function PackageBuilder({ onNavigate, navParams }) {
  const [step, setStep] = useState(navParams?.stallId ? 2 : 1);
  const [selectedStall, setSelectedStall] = useState(navParams?.stallId || 'A2');
  const [selectedPackage, setSelectedPackage] = useState(navParams?.packageId || 'gold');
  const [selectedAddOns, setSelectedAddOns] = useState(navParams?.addOns || ['social5', 'led']);
  
  // AI Wizard State
  const [selectedIndustry, setSelectedIndustry] = useState('edtech');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiCopilotOpen, setAiCopilotOpen] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState('');

  const stallObj = stalls.find(s => s.id === selectedStall) || stalls[0];
  const pkgObj = sponsorPackages.find(p => p.id === selectedPackage) || sponsorPackages[0];
  const addOnObjs = addOns.filter(a => selectedAddOns.includes(a.id));

  const basePrice = stallObj ? stallObj.rate : 0;
  const packagePrice = pkgObj ? pkgObj.price : 0;
  const addOnsPrice = addOnObjs.reduce((s, a) => s + a.price, 0);
  const total = basePrice + packagePrice + addOnsPrice;

  const toggleAddOn = (id) => {
    setSelectedAddOns(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleApplyAiTemplate = (industryKey) => {
    setAiGenerating(true);
    setSelectedIndustry(industryKey);
    const tmpl = aiIndustryTemplates[industryKey];

    setTimeout(() => {
      setSelectedStall(tmpl.stallId);
      setSelectedPackage(tmpl.packageId);
      setSelectedAddOns(tmpl.addOns);
      setAiGenerating(false);
      setAiSuccessMessage(`✨ AI optimized bundle applied for ${tmpl.label}!`);
      setTimeout(() => setAiSuccessMessage(''), 4000);
    }, 450);
  };

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title" style={{ margin: 0, fontSize: 'clamp(20px, 2.5vw, 26px)' }}>Sponsor Package Builder</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>
            Configure venue space, sponsorship tier, and high-impact commercial add-ons
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('venuemap')}>
            🗺️ View Venue Map
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setAiCopilotOpen(true)}>
            ✨ AI Package Copilot
          </button>
        </div>
      </div>

      {/* AI Smart Package Generator Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(246, 145, 35, 0.15), rgba(16, 185, 129, 0.08))',
        border: '1px solid rgba(246, 145, 35, 0.3)',
        borderRadius: 12,
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: '#F69123', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14 }}>
              ⚡
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>
                AI One-Click Package Recommender
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Select a sponsor vertical to auto-configure maximum ROI packages with proven conversion rates.
              </div>
            </div>
          </div>
          {aiSuccessMessage && (
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--success)', background: 'rgba(16, 185, 129, 0.15)', padding: '4px 10px', borderRadius: 99, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              {aiSuccessMessage}
            </span>
          )}
        </div>

        {/* Sector Buttons */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Object.entries(aiIndustryTemplates).map(([key, item]) => (
            <button
              key={key}
              onClick={() => handleApplyAiTemplate(key)}
              disabled={aiGenerating}
              style={{
                padding: '8px 14px', borderRadius: 8,
                background: selectedIndustry === key ? 'var(--brand)' : 'var(--surface-3)',
                color: selectedIndustry === key ? '#000' : 'var(--text-primary)',
                border: '1px solid var(--border)', fontSize: 12, fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.15s ease', display: 'flex', alignItems: 'center', gap: 6
              }}
            >
              <span>🎯</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* AI Projection Metrics */}
        {aiIndustryTemplates[selectedIndustry] && (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 12 }}>
            <span style={{ color: 'var(--text-secondary)' }}>
              🧠 <strong style={{ color: 'var(--text-primary)' }}>AI Strategy:</strong> {aiIndustryTemplates[selectedIndustry].reasoning}
            </span>
            <span style={{ color: 'var(--brand)', fontWeight: 700 }}>
              📈 Projected Audience: {aiIndustryTemplates[selectedIndustry].impressions}
            </span>
            <span style={{ color: 'var(--success)', fontWeight: 700 }}>
              ⭐ {aiIndustryTemplates[selectedIndustry].roiScore}
            </span>
          </div>
        )}
      </div>

      {/* Step Indicators */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
        {[
          { n: 1, label: '1. Venue Space' },
          { n: 2, label: '2. Sponsor Tier' },
          { n: 3, label: '3. High-Value Add-Ons' },
        ].map((s) => (
          <div
            key={s.n}
            onClick={() => setStep(s.n)}
            style={{
              padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
              background: step === s.n ? 'var(--brand)' : 'var(--surface-2)',
              color: step === s.n ? '#000' : 'var(--text-secondary)',
              fontWeight: 700, fontSize: 13, border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap'
            }}
          >
            {s.label}
          </div>
        ))}
      </div>

      {/* Main Builder Columns (Responsive Grid) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(320px, 360px)',
        gap: 20,
      }} className="package-builder-grid">

        {/* Left Config Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Step 1: Venue Space Selection */}
          <div className="card" style={{ padding: 18, border: step === 1 ? '1.5px solid var(--brand)' : '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>
                Step 1: Select Venue Floor Space
              </div>
              <span style={{ fontSize: 12, color: 'var(--brand)', fontWeight: 700 }}>
                Selected: Stall {stallObj?.label} ({fmtAED(stallObj?.rate)})
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
              {stalls.filter(s => s.status !== 'booked').map(s => {
                const isSelected = selectedStall === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedStall(s.id)}
                    style={{
                      padding: '12px 14px', borderRadius: 10, cursor: 'pointer',
                      border: `1.5px solid ${isSelected ? 'var(--brand)' : 'var(--border)'}`,
                      background: isSelected ? 'rgba(246, 145, 35, 0.15)' : 'var(--surface-3)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 14 }}>Stall {s.label}</span>
                      <span className={`badge badge-${s.status === 'available' ? 'success' : 'warning'}`} style={{ fontSize: 9 }}>
                        {s.status}
                      </span>
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginBottom: 6 }}>
                      {s.size} · {s.sqft} sqft · {s.zone.replace('hall-', 'Hall ').toUpperCase()}
                    </div>
                    <div style={{ fontWeight: 800, color: 'var(--brand)', fontSize: 14 }}>
                      {fmtAED(s.rate)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Sponsor Package Tier */}
          <div className="card" style={{ padding: 18, border: step === 2 ? '1.5px solid var(--brand)' : '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>
                Step 2: Choose Sponsorship Tier
              </div>
              <span style={{ fontSize: 12, color: 'var(--brand)', fontWeight: 700 }}>
                Selected: {pkgObj?.name} Package ({fmtAED(pkgObj?.price)})
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
              {sponsorPackages.map(pkg => {
                const isSelected = selectedPackage === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    style={{
                      padding: '14px', borderRadius: 10, cursor: 'pointer',
                      border: `1.5px solid ${isSelected ? 'var(--brand)' : 'var(--border)'}`,
                      background: isSelected ? 'rgba(246, 145, 35, 0.15)' : 'var(--surface-3)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 15 }}>{pkg.name}</span>
                      <span style={{ fontWeight: 800, color: 'var(--brand)', fontSize: 14 }}>{fmtAEDK(pkg.price)}</span>
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '0 0 10px 0', minHeight: 30 }}>
                      {pkg.description}
                    </p>
                    <div style={{ fontSize: 10.5, color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {pkg.benefits.slice(0, 3).map((b, i) => (
                        <div key={i}>✓ {b}</div>
                      ))}
                      {pkg.benefits.length > 3 && <div style={{ color: 'var(--brand)' }}>+{pkg.benefits.length - 3} more deliverables</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: High-Value Add-Ons */}
          <div className="card" style={{ padding: 18, border: step === 3 ? '1.5px solid var(--brand)' : '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>
                Step 3: High-Impact Deliverable Add-ons
              </div>
              <span style={{ fontSize: 12, color: 'var(--brand)', fontWeight: 700 }}>
                {selectedAddOns.length} Add-ons Selected ({fmtAED(addOnsPrice)})
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 10 }}>
              {addOns.map(addon => {
                const isSelected = selectedAddOns.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    style={{
                      padding: '12px 14px', borderRadius: 10, cursor: 'pointer',
                      border: `1.5px solid ${isSelected ? 'var(--brand)' : 'var(--border)'}`,
                      background: isSelected ? 'rgba(246, 145, 35, 0.12)' : 'var(--surface-3)',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{addon.name}</div>
                      <div style={{ fontSize: 10.5, color: 'var(--text-secondary)' }}>Category: {addon.category}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, color: 'var(--brand)', fontSize: 13 }}>{fmtAEDK(addon.price)}</div>
                      <span style={{ fontSize: 10, color: isSelected ? 'var(--brand)' : 'var(--text-secondary)' }}>
                        {isSelected ? '✓ Included' : '+ Add'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Pricing Summary Card */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 14, padding: 20, display: 'flex', flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)', height: 'fit-content', position: 'sticky', top: 20
        }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
            Package Total Summary
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>
            QIDS UAE Talent Hunt & Awards 2026
          </div>

          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, padding: 14, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Floor Space (Stall {stallObj?.label}):</span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{fmtAED(basePrice)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Tier ({pkgObj?.name}):</span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{fmtAED(packagePrice)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Add-ons ({selectedAddOns.length}):</span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{fmtAED(addOnsPrice)}</span>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>Total Proposal:</span>
              <span style={{ fontSize: 20, fontWeight: 900, color: 'var(--brand)' }}>{fmtAED(total)}</span>
            </div>
          </div>

          {/* Deliverables summary */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 8 }}>
              Included Deliverables ({pkgObj?.benefits.length + addOnObjs.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 180, overflowY: 'auto' }}>
              {pkgObj?.benefits.map((b, i) => (
                <div key={i} style={{ fontSize: 11.5, color: 'var(--text-primary)' }}>• {b}</div>
              ))}
              {addOnObjs.map(a => (
                <div key={a.id} style={{ fontSize: 11.5, color: 'var(--brand)', fontWeight: 600 }}>• {a.name}</div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              className="btn btn-primary w-full"
              style={{ padding: '12px', fontSize: 14, fontWeight: 800 }}
              onClick={() => onNavigate('proposals', { stallId: stallObj?.id, packageId: pkgObj?.id, total, addOns: selectedAddOns })}
            >
              Generate Client Proposal →
            </button>
            <button
              className="btn btn-ghost w-full"
              style={{ fontSize: 12 }}
              onClick={() => setAiCopilotOpen(true)}
            >
              ✨ AI Custom Pitch Assistant
            </button>
          </div>
        </div>
      </div>

      <AiCopilotModal
        isOpen={aiCopilotOpen}
        onClose={() => setAiCopilotOpen(false)}
        defaultPrompt={`Generate a sponsorship proposal pitch for ${pkgObj?.name} tier in Stall ${stallObj?.label} valued at ${fmtAED(total)} for QIDS UAE 2026.`}
      />
    </div>
  );
}
