import React, { useState } from 'react';
import { stalls, venueZones } from '../../data/commercialData';
import AiCopilotModal from '../common/AiCopilotModal';

const statusColors = {
  available: '#10B981', // green
  interested: '#F59E0B', // amber
  booked: '#EF4444',    // red
};

const statusLabel = {
  available: 'Available',
  interested: 'Reserved / Interested',
  booked: 'Booked & Confirmed'
};

const fmtAED = (n) => `AED ${(n || 0).toLocaleString()}`;
const fmtAEDK = (n) => `AED ${(n / 1000).toFixed(0)}K`;

export default function VenueMap({ onNavigate }) {
  const [selected, setSelected] = useState('A1');
  const [filterZone, setFilterZone] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAiHeatmap, setShowAiHeatmap] = useState(false);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'ai' | 'sponsor'
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [customRates, setCustomRates] = useState({});

  const filtered = stalls.filter(s => {
    if (filterZone !== 'all' && s.zone !== filterZone) return false;
    if (filterStatus !== 'all' && s.status !== filterStatus) return false;
    return true;
  });

  const selectedStall = stalls.find(s => s.id === selected) || stalls[0];
  const currentRate = customRates[selectedStall?.id] || selectedStall?.rate || 0;

  // AI dynamic recommended price calculation (demand-based)
  const aiRecommendedRate = selectedStall?.demand === 'High'
    ? Math.round(currentRate * 1.08 / 1000) * 1000
    : currentRate;

  const handleApplyAiPrice = () => {
    setCustomRates(prev => ({ ...prev, [selectedStall.id]: aiRecommendedRate }));
  };

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', gap: 18, height: '100%' }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 0, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <h1 className="page-title" style={{ margin: 0, fontSize: 'clamp(20px, 2.5vw, 26px)' }}>Interactive Venue Map</h1>
            <span style={{ fontSize: 11, background: 'rgba(246, 145, 35, 0.15)', color: 'var(--brand)', border: '1px solid rgba(246, 145, 35, 0.3)', padding: '2px 8px', borderRadius: 99, fontWeight: 700 }}>
              GIIS School, Dubai
            </span>
          </div>
          <p className="page-subtitle" style={{ margin: 0 }}>
            Live spatial management, sponsor booth allocations & AI footfall optimization
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowAiHeatmap(!showAiHeatmap)}
            className="btn"
            style={{
              background: showAiHeatmap ? 'linear-gradient(135deg, #F69123, #d97706)' : 'var(--surface-3)',
              color: showAiHeatmap ? '#000' : 'var(--text-primary)',
              border: showAiHeatmap ? '1px solid #F69123' : '1px solid var(--border)',
              fontWeight: 700, fontSize: 13, gap: 6,
              boxShadow: showAiHeatmap ? '0 0 15px rgba(246, 145, 35, 0.4)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <span>⚡</span>
            {showAiHeatmap ? 'AI Heatmap: ON' : 'Show AI Footfall Heatmap'}
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setAiModalOpen(true)}
            style={{ gap: 6 }}
          >
            <span>🤖</span> Ask Venue AI
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => onNavigate('packages', { stallId: selectedStall?.id })}
            style={{ gap: 6 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            Build Package
          </button>
        </div>
      </div>

      {/* Quick KPI Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 12,
      }}>
        {[
          { label: 'Total Stalls', value: stalls.length, sub: '15 Active Zones', color: 'var(--brand)' },
          { label: 'Available', value: stalls.filter(s => s.status === 'available').length, sub: 'Ready for sale', color: 'var(--success)' },
          { label: 'Interested', value: stalls.filter(s => s.status === 'interested').length, sub: 'Under negotiation', color: 'var(--warning)' },
          { label: 'Confirmed Booked', value: stalls.filter(s => s.status === 'booked').length, sub: 'AED 1.88M committed', color: 'var(--danger)' },
        ].map((s, idx) => (
          <div key={idx} style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 2
          }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color, lineHeight: 1.2 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Filter Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 10, padding: '8px 12px'
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Zone:</span>
        <button className={`filter-chip ${filterZone === 'all' ? 'active' : ''}`} onClick={() => setFilterZone('all')}>All Zones</button>
        {venueZones.filter(z => ['hall-a', 'hall-b', 'hall-c'].includes(z.id)).map(z => (
          <button key={z.id} className={`filter-chip ${filterZone === z.id ? 'active' : ''}`} onClick={() => setFilterZone(z.id)}>
            {z.label.replace('— ', '')}
          </button>
        ))}

        <span style={{ width: 1, height: 16, background: 'var(--border)', margin: '0 4px' }} />

        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Status:</span>
        {['all', 'available', 'interested', 'booked'].map(f => (
          <button key={f} className={`filter-chip ${filterStatus === f ? 'active' : ''}`} onClick={() => setFilterStatus(f)}>
            {f === 'all' ? 'All Stalls' : statusLabel[f].split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Interactive Main Floor Plan & Side Drawer (Responsive Stack) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(320px, 360px)',
        gap: 18,
        flex: 1,
        minHeight: 520,
      }} className="venue-map-responsive-grid">

        {/* Architectural SVG Map Container */}
        <div style={{
          background: '#090B10',
          border: '1px solid var(--border)',
          borderRadius: 14,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)',
          minHeight: 460,
        }}>
          {/* Subtle Blueprint Grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(246, 145, 35, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(246, 145, 35, 0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px', pointerEvents: 'none',
          }} />

          {/* SVG Map Canvas */}
          <svg viewBox="0 0 640 590" width="100%" height="100%" style={{ display: 'block', position: 'relative', zIndex: 1, flex: 1 }}>
            <defs>
              <linearGradient id="stagePulse" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(246,145,35,0.4)" />
                <stop offset="100%" stopColor="rgba(246,145,35,0.15)" />
              </linearGradient>

              {/* Radial Heatmap Gradients */}
              <radialGradient id="heatStage" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(239, 68, 68, 0.6)" />
                <stop offset="50%" stopColor="rgba(245, 158, 11, 0.35)" />
                <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
              </radialGradient>
              <radialGradient id="heatAisle" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(245, 158, 11, 0.45)" />
                <stop offset="60%" stopColor="rgba(16, 185, 129, 0.2)" />
                <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
              </radialGradient>
            </defs>

            {/* AI Heatmap Footfall Overlays (When Toggled) */}
            {showAiHeatmap && (
              <g style={{ transition: 'opacity 0.3s ease' }}>
                <circle cx="320" cy="90" r="130" fill="url(#heatStage)" pointerEvents="none" />
                <circle cx="160" cy="220" r="100" fill="url(#heatAisle)" pointerEvents="none" />
                <circle cx="310" cy="380" r="110" fill="url(#heatAisle)" pointerEvents="none" />
                <circle cx="560" cy="420" r="90" fill="url(#heatStage)" pointerEvents="none" />
              </g>
            )}

            {/* Entrance / Registration Foyer */}
            <rect x="200" y="16" width="240" height="30" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <text x="320" y="35" textAnchor="middle" fill="#CBD5E1" fontSize="10" fontWeight="800" letterSpacing="0.08em">MAIN ENTRANCE & REGISTRATION FOYER</text>

            {/* Main Stage */}
            <rect x="230" y="60" width="180" height="54" rx="8" fill="url(#stagePulse)" stroke="#F69123" strokeWidth="1.5" />
            <text x="320" y="86" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" letterSpacing="0.06em">MAIN STAGE & AWARDS</text>
            <circle cx="275" cy="100" r="3.5" fill="#EF4444" />
            <text x="330" y="103" textAnchor="middle" fill="#FDE68A" fontSize="9.5" fontWeight="600">Celebrity Jury & Talent Live</text>

            {/* VIP Lounge (Left) */}
            <rect x="30" y="60" width="140" height="48" rx="8" fill="rgba(246,145,35,0.06)" stroke="rgba(246,145,35,0.3)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="100" y="85" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="700">VIP / CREATOR LOUNGE</text>
            <text x="100" y="98" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8.5">Access Gate A</text>

            {/* Tech / Control Booth (Right) */}
            <rect x="470" y="60" width="140" height="48" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <text x="540" y="85" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="700">AV & SOUND CONSOLE</text>
            <text x="540" y="98" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8.5">Live Broadcast Feed</text>

            {/* Hall A Zone Box */}
            <rect x="30" y="132" width="580" height="135" rx="12" fill="rgba(59,130,246,0.03)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" strokeDasharray="4 4" />
            <text x="44" y="152" fill="#60A5FA" fontSize="10.5" fontWeight="800" letterSpacing="0.06em">HALL A — PREMIUM INNOVATION (HIGH FOOTFALL)</text>

            {/* Hall B Zone Box */}
            <rect x="30" y="290" width="470" height="115" rx="12" fill="rgba(16,185,129,0.03)" stroke="rgba(16,185,129,0.2)" strokeWidth="1" strokeDasharray="4 4" />
            <text x="44" y="310" fill="#34D399" fontSize="10.5" fontWeight="800" letterSpacing="0.06em">HALL B — STANDARD TALENT & EDTECH</text>

            {/* Hall C Zone Box */}
            <rect x="30" y="435" width="470" height="135" rx="12" fill="rgba(139,92,246,0.03)" stroke="rgba(139,92,246,0.2)" strokeWidth="1" strokeDasharray="4 4" />
            <text x="44" y="455" fill="#A78BFA" fontSize="10.5" fontWeight="800" letterSpacing="0.06em">HALL C — IMMERSIVE BRAND EXPERIENCES</text>

            {/* Food Zone (Right vertical) */}
            <rect x="520" y="290" width="90" height="280" rx="10" fill="rgba(245,158,11,0.05)" stroke="rgba(245,158,11,0.25)" strokeWidth="1" />
            <text x="565" y="420" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="800" letterSpacing="0.08em" style={{ writingMode: 'vertical-rl' }}>FOOD & REFRESHMENTS LOUNGE</text>
            <text x="565" y="520" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8.5" style={{ writingMode: 'vertical-rl' }}>High Dwell Time</text>

            {/* Aisle markers */}
            <text x="265" y="278" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" letterSpacing="0.12em">◀ CENTRAL CORRIDOR — 8M WIDTH ▶</text>
            <text x="265" y="420" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" letterSpacing="0.12em">◀ ACTIVITY AISLE 2 ▶</text>

            {/* Stalls Rendering */}
            {stalls.map(s => {
              const isFiltered = filtered.includes(s);
              const isSelected = s.id === selectedStall?.id;
              const color = statusColors[s.status];
              const stallRate = customRates[s.id] || s.rate;

              return (
                <g
                  key={s.id}
                  onClick={() => setSelected(s.id)}
                  style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                >
                  {/* Stall background */}
                  <rect
                    x={s.x} y={s.y} width={s.w} height={s.h}
                    rx="8"
                    fill={isSelected ? 'rgba(246, 145, 35, 0.25)' : isFiltered ? `${color}18` : 'rgba(255,255,255,0.02)'}
                    stroke={isSelected ? '#F69123' : isFiltered ? color : 'rgba(255,255,255,0.1)'}
                    strokeWidth={isSelected ? 2.5 : 1}
                    filter={isSelected ? 'drop-shadow(0 0 8px rgba(246, 145, 35, 0.5))' : 'none'}
                    opacity={isFiltered ? 1 : 0.25}
                  />

                  {/* Stall Code & Square Feet */}
                  <text
                    x={s.x + s.w / 2} y={s.y + s.h / 2 - 5}
                    textAnchor="middle"
                    fill={isSelected ? '#FFFFFF' : isFiltered ? '#F8FAFC' : 'rgba(255,255,255,0.3)'}
                    fontSize="12.5" fontWeight="900" letterSpacing="0.02em"
                  >
                    {s.label}
                  </text>

                  <text
                    x={s.x + s.w / 2} y={s.y + s.h / 2 + 10}
                    textAnchor="middle"
                    fill={isSelected ? '#FDE68A' : isFiltered ? color : 'rgba(255,255,255,0.2)'}
                    fontSize="9.5" fontWeight="700"
                  >
                    {fmtAEDK(stallRate)}
                  </text>

                  {/* Status Indicator Dot */}
                  <circle
                    cx={s.x + s.w - 12} cy={s.y + 12}
                    r="4"
                    fill={color}
                    stroke="#090B10"
                    strokeWidth="1.5"
                  />

                  {/* Sponsor Name Badge if booked */}
                  {s.sponsor && isFiltered && (
                    <text
                      x={s.x + s.w / 2} y={s.y + s.h - 5}
                      textAnchor="middle"
                      fill="#CBD5E1"
                      fontSize="8" fontWeight="700"
                    >
                      {s.sponsor}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Map Legend Overlay */}
          <div style={{
            position: 'absolute', bottom: 12, left: 12, right: 12,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: 'rgba(11, 13, 19, 0.85)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '8px 14px',
            flexWrap: 'wrap', gap: 10, zIndex: 2
          }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              {[
                { label: 'Available', color: statusColors.available },
                { label: 'Reserved / Interested', color: statusColors.interested },
                { label: 'Confirmed Booked', color: statusColors.booked },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600 }}>{item.label}</span>
                </div>
              ))}
            </div>
            {showAiHeatmap && (
              <span style={{ fontSize: 11, color: 'var(--brand)', fontWeight: 700 }}>
                🔥 Red/Amber = Peak Kids Audience Flow (2,500+ Dwell)
              </span>
            )}
          </div>
        </div>

        {/* Right Detail Pane (Polished, Non-Cutoff, Tabbed) */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-md)',
          overflowY: 'auto',
          maxHeight: '100%',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)' }}>
                  Stall {selectedStall.label}
                </span>
                <span className={`badge badge-${selectedStall.status === 'available' ? 'success' : selectedStall.status === 'interested' ? 'warning' : 'danger'}`} style={{ fontSize: 10 }}>
                  {statusLabel[selectedStall.status]}
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                {selectedStall.zone.replace('hall-', 'Hall ').toUpperCase()} · {selectedStall.category} Tier
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'flex', background: 'var(--surface-3)', borderRadius: 8, padding: 3,
            marginBottom: 16, border: '1px solid var(--border)'
          }}>
            {[
              { id: 'specs', label: 'Specifications' },
              { id: 'ai', label: '✨ AI Advisor' },
              { id: 'sponsor', label: 'Sponsorship' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, padding: '6px 0', border: 'none', borderRadius: 6,
                  fontSize: 11.5, fontWeight: activeTab === tab.id ? 700 : 500,
                  background: activeTab === tab.id ? 'var(--surface)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--brand)' : 'var(--text-secondary)',
                  cursor: 'pointer', transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Specifications */}
          {activeTab === 'specs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              <div style={{
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: 10, padding: '14px 16px'
              }}>
                <div className="label-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Listed Rate:</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--brand)' }}>{fmtAED(currentRate)}</span>
                </div>
                <div className="label-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Floor Area:</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)' }}>{selectedStall.sqft} sq ft</span>
                </div>
                <div className="label-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Dimensions:</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)' }}>{selectedStall.size}</span>
                </div>
                <div className="label-row" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Traffic Demand:</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: selectedStall.demand === 'High' ? 'var(--danger)' : 'var(--warning)' }}>{selectedStall.demand} Traffic</span>
                </div>
              </div>

              {selectedStall.sponsor && (
                <div style={{
                  padding: '12px 14px', background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 10
                }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--danger)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>
                    Current Confirmed Sponsor
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>
                    {selectedStall.sponsor}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                    Package: {selectedStall.package}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: AI Advisor */}
          {activeTab === 'ai' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(246, 145, 35, 0.12), rgba(246, 145, 35, 0.02))',
                border: '1px solid rgba(246, 145, 35, 0.25)', borderRadius: 10, padding: '12px 14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 14 }}>🤖</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase' }}>
                    AI Dynamic Pricing Analysis
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                  Due to high footfall from the Main Stage corridor, AI predicts high demand for this stall.
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
                  padding: '8px 12px', marginTop: 10
                }}>
                  <div>
                    <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>AI Suggested Value:</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--brand)' }}>{fmtAED(aiRecommendedRate)}</div>
                  </div>
                  <button
                    onClick={handleApplyAiPrice}
                    className="btn btn-sm btn-primary"
                    style={{ fontSize: 11, padding: '4px 10px' }}
                  >
                    Apply Rate
                  </button>
                </div>
              </div>

              <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase' }}>
                  🎯 Best-Fit Sponsor Sectors
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['Kids EdTech & STEM', 'Youth Banking App', 'Children Footwear / Apparel'].map((sec, i) => (
                    <span key={i} style={{ fontSize: 11, background: 'var(--surface-3)', border: '1px solid var(--border)', padding: '4px 8px', borderRadius: 6, color: 'var(--text-primary)' }}>
                      ✓ {sec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Sponsorship */}
          {activeTab === 'sponsor' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 4 }}>Default Sponsor Tier</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--brand)' }}>{selectedStall.package}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                  Includes 10 VIP passes, logo on stage backdrop & branding in all printed materials.
                </div>
              </div>

              <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 4 }}>Sponsor Pitch Quick Action</div>
                <p style={{ fontSize: 12, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                  Send pre-configured deck for Stall {selectedStall.label} directly to the proposals desk.
                </p>
                <button
                  onClick={() => onNavigate('proposals', { stallId: selectedStall.id })}
                  className="btn btn-secondary btn-sm w-full"
                >
                  View / Create Proposal
                </button>
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              className="btn btn-primary w-full"
              style={{ padding: '11px', fontSize: 13.5, fontWeight: 700 }}
              onClick={() => onNavigate('packages', { stallId: selectedStall.id })}
            >
              Build Package for Stall {selectedStall.label}
            </button>
            <button
              className="btn btn-ghost w-full"
              style={{ fontSize: 12 }}
              onClick={() => setAiModalOpen(true)}
            >
              ✨ Ask Copilot to Pitch Stall {selectedStall.label}
            </button>
          </div>
        </div>
      </div>

      {/* Global AI Copilot Modal */}
      <AiCopilotModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        defaultPrompt={`Analyze Stall ${selectedStall.label} (${selectedStall.size}, ${selectedStall.sqft} sqft) in Hall ${selectedStall.zone.replace('hall-', '').toUpperCase()} and generate a pitch for UAE sponsors.`}
      />
    </div>
  );
}
