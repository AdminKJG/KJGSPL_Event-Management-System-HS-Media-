import React, { useState } from 'react';
import { pipeline, pipelineStages } from '../../data/commercialData';

const stageColors = {
  'New': 'var(--text-secondary)',
  'Contacted': 'var(--info)',
  'Interested': 'var(--warning)',
  'Proposal Sent': 'var(--brand)',
  'Negotiation': 'var(--purple)',
  'Won': 'var(--success)',
  'Lost': 'var(--danger)',
};

const fmt = (n) => n >= 1000000 ? `AED ${(n/1000000).toFixed(2)}M` : n >= 1000 ? `AED ${(n/1000).toFixed(0)}K` : `AED ${n.toLocaleString()}`;

export default function Pipeline({ onNavigate }) {
  const [opportunities, setOpportunities] = useState(pipeline);
  const [selected, setSelected] = useState(null);
  const [oppModalOpen, setOppModalOpen] = useState(false);
  const [isEditingOpp, setIsEditingOpp] = useState(false);

  const [oppForm, setOppForm] = useState({
    id: '',
    sponsor: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    package: 'Gold Sponsor',
    stall: 'A-03',
    value: 195000,
    probability: 60,
    stage: 'New',
    owner: 'Harshad Shah',
    closeDate: 'Sep 28, 2026',
    nextAction: 'Send initial package one-pager',
    lostReason: '',
  });

  const moveCard = (id, direction) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id !== id) return opp;
      const idx = pipelineStages.indexOf(opp.stage);
      const newIdx = direction === 'forward' ? Math.min(idx + 1, pipelineStages.length - 1) : Math.max(idx - 1, 0);
      return { ...opp, stage: pipelineStages[newIdx] };
    }));
  };

  const totalPipeline = opportunities.filter(o => o.stage !== 'Lost').reduce((s, o) => s + o.value, 0);
  const wonValue = opportunities.filter(o => o.stage === 'Won').reduce((s, o) => s + o.value, 0);

  const handleOpenAdd = () => {
    setIsEditingOpp(false);
    setOppForm({
      id: `opp-${Date.now()}`,
      sponsor: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      package: 'Gold Sponsor',
      stall: 'A-03',
      value: 195000,
      probability: 60,
      stage: 'New',
      owner: 'Harshad Shah',
      closeDate: 'Sep 28, 2026',
      nextAction: 'Send tailored commercial proposal',
      lostReason: '',
    });
    setOppModalOpen(true);
  };

  const handleOpenEdit = (opp) => {
    setIsEditingOpp(true);
    setOppForm({
      id: opp.id,
      sponsor: opp.sponsor,
      contactName: opp.contactName || 'Brand Partnership Lead',
      contactEmail: opp.contactEmail || `contact@${opp.sponsor.toLowerCase().replace(/\s+/g, '')}.com`,
      contactPhone: opp.contactPhone || '+971 4 555 1234',
      package: opp.package,
      stall: opp.stall,
      value: opp.value,
      probability: opp.probability || 70,
      stage: opp.stage,
      owner: opp.owner,
      closeDate: opp.closeDate,
      nextAction: opp.nextAction,
      lostReason: opp.lostReason || '',
    });
    setOppModalOpen(true);
  };

  const handleSaveOpp = (e) => {
    e.preventDefault();
    if (!oppForm.sponsor) return;

    if (isEditingOpp) {
      setOpportunities(prev => prev.map(o => o.id === oppForm.id ? { ...o, ...oppForm } : o));
    } else {
      setOpportunities(prev => [oppForm, ...prev]);
    }
    setOppModalOpen(false);
  };

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="page-header" style={{ marginBottom: 16 }}>
        <div>
          <h1 className="page-title">Commercial Pipeline & Deals</h1>
          <p className="page-subtitle">{opportunities.filter(o => o.stage !== 'Lost').length} active opportunities · Total Pipeline: {fmt(totalPipeline)} · Won: {fmt(wonValue)}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('proposals')}>View Proposals</button>
          <button className="btn btn-primary btn-sm" onClick={handleOpenAdd} style={{ gap: 6, fontWeight: 700 }}>
            <span>🤝</span> + New Opportunity Form
          </button>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        {pipelineStages.map(stage => {
          const items = opportunities.filter(o => o.stage === stage);
          const val = items.reduce((s, o) => s + o.value, 0);
          return (
            <div key={stage} style={{ flex: 1, minWidth: 90, padding: '10px 12px', background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 10, borderTop: `2px solid ${stageColors[stage]}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: stageColors[stage], textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{stage}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{items.length}</div>
              {val > 0 && <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{fmt(val)}</div>}
            </div>
          );
        })}
      </div>

      {/* Kanban */}
      <div style={{ display: 'flex', gap: 12, flex: 1, overflowX: 'auto', paddingBottom: 8 }}>
        {pipelineStages.map(stage => {
          const stageOpps = opportunities.filter(o => o.stage === stage);
          return (
            <div key={stage} style={{ minWidth: 220, maxWidth: 220, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Column header */}
              <div style={{ padding: '8px 12px', borderRadius: 8, background: 'var(--surface-card)', border: `1px solid ${stageColors[stage]}30`, borderTop: `2px solid ${stageColors[stage]}`, marginBottom: 2 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: stageColors[stage], textTransform: 'uppercase' }}>{stage}</div>
                <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{stageOpps.length} · {fmt(stageOpps.reduce((s, o) => s + o.value, 0))}</div>
              </div>

              {/* Cards */}
              {stageOpps.map(opp => (
                <div
                  key={opp.id}
                  onClick={() => setSelected(selected === opp.id ? null : opp.id)}
                  style={{ padding: '12px 14px', background: 'var(--surface-card)', border: `1px solid ${selected === opp.id ? 'var(--brand)' : 'var(--border)'}`, borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 'var(--size-md)', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{opp.sponsor}</div>
                    <button
                      className="btn btn-ghost btn-icon"
                      style={{ padding: '2px 4px', fontSize: 10, color: 'var(--brand)' }}
                      onClick={(e) => { e.stopPropagation(); handleOpenEdit(opp); }}
                      title="Edit Opportunity Form"
                    >
                      ✏️
                    </button>
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 8 }}>{opp.package} · {opp.stall}</div>
                  <div style={{ fontWeight: 800, color: 'var(--brand)', fontSize: 16, marginBottom: 8 }}>{fmt(opp.value)}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <div className="avatar" style={{ width: 20, height: 20, fontSize: 9 }}>{opp.owner.split(' ').map(n => n[0]).join('')}</div>
                    <span style={{ fontSize: 10, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opp.owner.split(' ')[0]}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-secondary)' }}>Close: {opp.closeDate}</span>
                  </div>
                  {opp.nextAction !== '—' && (
                    <div style={{ fontSize: 9, padding: '4px 8px', background: 'var(--surface-raised)', borderRadius: 6, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      → {opp.nextAction}
                    </div>
                  )}
                  {selected === opp.id && stage !== 'Won' && stage !== 'Lost' && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                      <button className="btn btn-ghost btn-sm" style={{ flex: 1, padding: '4px 8px', fontSize: 10 }} onClick={(e) => { e.stopPropagation(); moveCard(opp.id, 'back'); }}>← Back</button>
                      <button className="btn btn-primary btn-sm" style={{ flex: 1, padding: '4px 8px', fontSize: 10 }} onClick={(e) => { e.stopPropagation(); moveCard(opp.id, 'forward'); }}>Next →</button>
                    </div>
                  )}
                  {opp.lostReason && (
                    <div style={{ marginTop: 6, fontSize: 10, color: 'var(--danger)' }}>Reason: {opp.lostReason}</div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Opportunity / Deal Form Modal */}
      {oppModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal" style={{ maxWidth: 660, maxHeight: '90vh', padding: 24 }}>
            <div className="modal-header" style={{ marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
              <div>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>
                  {isEditingOpp ? `Edit Deal Data Form — ${oppForm.sponsor}` : 'Add Sponsorship Opportunity Data Form'}
                </span>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                  Structure deal value, assigned booth code, closing probability % & next account actions.
                </p>
              </div>
              <button className="modal-close" onClick={() => setOppModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveOpp} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 10 }}>
                  Account & Contact Details
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Sponsor / Brand Name *</label>
                    <input className="input" value={oppForm.sponsor} onChange={e => setOppForm({ ...oppForm, sponsor: e.target.value })} placeholder="e.g. Noon.com" required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Contact Person Name</label>
                    <input className="input" value={oppForm.contactName} onChange={e => setOppForm({ ...oppForm, contactName: e.target.value })} placeholder="e.g. Tariq Al-Nuaimi" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Contact Email</label>
                    <input type="email" className="input" value={oppForm.contactEmail} onChange={e => setOppForm({ ...oppForm, contactEmail: e.target.value })} placeholder="partnerships@brand.com" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Contact Phone</label>
                    <input className="input" value={oppForm.contactPhone} onChange={e => setOppForm({ ...oppForm, contactPhone: e.target.value })} placeholder="+971 50 123 4567" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 10 }}>
                  Package, Stall & Financial Structure
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Sponsorship Tier *</label>
                    <select className="select" value={oppForm.package} onChange={e => setOppForm({ ...oppForm, package: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="Title Partner">Title Partner (AED 500K)</option>
                      <option value="Platinum Sponsor">Platinum Sponsor (AED 285K)</option>
                      <option value="Gold Sponsor">Gold Sponsor (AED 195K)</option>
                      <option value="Silver Sponsor">Silver Sponsor (AED 95K)</option>
                      <option value="Bronze Sponsor">Bronze Sponsor (AED 72K)</option>
                      <option value="Custom Booth">Custom Stand</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Assigned Stall</label>
                    <input className="input" value={oppForm.stall} onChange={e => setOppForm({ ...oppForm, stall: e.target.value })} placeholder="e.g. A-02" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Deal Value (AED) *</label>
                    <input type="number" className="input" value={oppForm.value} onChange={e => setOppForm({ ...oppForm, value: Number(e.target.value) })} required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Pipeline Stage</label>
                    <select className="select" value={oppForm.stage} onChange={e => setOppForm({ ...oppForm, stage: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      {pipelineStages.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Win Probability (%)</label>
                    <input type="number" className="input" value={oppForm.probability} onChange={e => setOppForm({ ...oppForm, probability: Number(e.target.value) })} style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Target Close Date</label>
                    <input className="input" value={oppForm.closeDate} onChange={e => setOppForm({ ...oppForm, closeDate: e.target.value })} placeholder="Sep 30, 2026" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Next Action Item</label>
                <input className="input" value={oppForm.nextAction} onChange={e => setOppForm({ ...oppForm, nextAction: e.target.value })} placeholder="e.g. Schedule commercial negotiation call with VP" style={{ padding: '8px 10px', fontSize: 13 }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                <button type="button" className="btn btn-ghost" onClick={() => setOppModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 22px', fontWeight: 700 }}>
                  {isEditingOpp ? 'Update Deal Data' : 'Add Deal to Pipeline'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

