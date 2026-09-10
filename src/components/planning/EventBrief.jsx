import React, { useState } from 'react';
import { eventBrief as initialBrief } from '../../data/eventData';

export default function EventBrief() {
  const [brief, setBrief] = useState(initialBrief);
  const [editBriefOpen, setEditBriefOpen] = useState(false);
  const [addStakeholderOpen, setAddStakeholderOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: brief.name,
    type: brief.type,
    date: brief.date,
    location: brief.location,
    expectedAudience: brief.expectedAudience,
    status: brief.status,
    permitAuthority: 'Dubai Civil Defence & DTCM',
    revenueTarget: 'AED 2,800,000',
    budgetCap: 'AED 950,000',
  });

  const [newStakeholder, setNewStakeholder] = useState({
    name: '',
    role: '',
    dept: 'Production',
    email: '',
    avatar: 'HS',
  });

  const handleSaveBrief = (e) => {
    e.preventDefault();
    setBrief(prev => ({ ...prev, ...formData }));
    setEditBriefOpen(false);
  };

  const handleAddStakeholder = (e) => {
    e.preventDefault();
    if (!newStakeholder.name) return;
    const initials = newStakeholder.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'ST';
    setBrief(prev => ({
      ...prev,
      stakeholders: [...prev.stakeholders, { ...newStakeholder, avatar: initials }],
    }));
    setAddStakeholderOpen(false);
    setNewStakeholder({ name: '', role: '', dept: 'Production', email: '', avatar: 'HS' });
  };

  return (
    <div className="page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 className="page-title">Event Brief & Specifications</h1>
          <p className="page-subtitle">Core event parameters, commercial objectives and key stakeholders</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setAddStakeholderOpen(true)} style={{ gap: 6 }}>
            <span>👤</span> + Add Stakeholder Form
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setEditBriefOpen(true)} style={{ gap: 6, fontWeight: 700 }}>
            <span>✏️</span> Edit Event Brief Form
          </button>
          <span className={`badge badge-${brief.status === 'Planning' ? 'warning' : 'success'}`} style={{ padding: '6px 16px', fontSize: 'var(--size-sm)' }}>
            {brief.status}
          </span>
        </div>
      </div>

      <div className="grid-2">
        {/* Core Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div className="section-title" style={{ margin: 0 }}>Event Details & Parameters</div>
              <button className="btn btn-ghost btn-sm" onClick={() => setEditBriefOpen(true)} style={{ fontSize: 11 }}>Edit Fields</button>
            </div>
            {[
              { label: 'Event Name', value: brief.name },
              { label: 'Type / Format', value: brief.type },
              { label: 'Date & Duration', value: brief.date },
              { label: 'Location & Venue', value: brief.location },
              { label: 'Expected Audience', value: brief.expectedAudience },
              { label: 'Target Revenue', value: formData.revenueTarget },
              { label: 'Approved Budget Cap', value: formData.budgetCap },
              { label: 'Permit Authority', value: formData.permitAuthority },
              { label: 'Lifecycle Status', value: brief.status },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ width: 160, flexShrink: 0, fontSize: 'var(--size-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>{row.label}</div>
                <div style={{ fontSize: 'var(--size-base)', color: 'var(--text-primary)', fontWeight: 600 }}>{row.value}</div>
              </div>
            ))}
          </div>

          {/* Stakeholders */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div className="section-title" style={{ margin: 0 }}>Key Stakeholders & Leads</div>
              <button className="btn btn-secondary btn-sm" onClick={() => setAddStakeholderOpen(true)} style={{ fontSize: 11 }}>+ Add Lead</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {brief.stakeholders.map((s, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--surface-raised)', borderRadius: 10 }}>
                  <div className="avatar">{s.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 'var(--size-md)', fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</div>
                    <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>{s.role}</div>
                  </div>
                  <span className="badge badge-neutral" style={{ fontSize: 10 }}>Lead</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Objectives & Goals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="section-title" style={{ marginBottom: 16 }}>Strategic Event Objectives</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {brief.objectives.map((obj, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 14px', background: 'var(--surface-raised)', borderRadius: 10 }}>
                  <span style={{ color: 'var(--brand)', fontWeight: 800, flexShrink: 0 }}>0{i+1}</span>
                  <span style={{ fontSize: 'var(--size-md)', color: 'var(--text-primary)', lineHeight: 1.4 }}>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="section-title" style={{ marginBottom: 16 }}>Commercial Business Goals</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {brief.businessGoals.map((g, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 14px', background: 'var(--brand-dim)', border: '1px solid var(--border)', borderRadius: 10 }}>
                  <span style={{ color: 'var(--brand)', flexShrink: 0 }}>💰</span>
                  <span style={{ fontSize: 'var(--size-md)', color: 'var(--text-primary)', lineHeight: 1.4, fontWeight: 500 }}>{g}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Event Brief Form Modal */}
      {editBriefOpen && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal" style={{ maxWidth: 650, maxHeight: '90vh', padding: 24 }}>
            <div className="modal-header" style={{ marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
              <div>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>Edit Event Brief Data Form</span>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Update event taxonomy, dates, capacity limits, and regulatory licensing.</p>
              </div>
              <button className="modal-close" onClick={() => setEditBriefOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveBrief} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 10 }}>
                  Core Event Fields
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Event Title *</label>
                    <input className="input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Format / Type *</label>
                    <input className="input" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Dates *</label>
                    <input className="input" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Location *</label>
                    <input className="input" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Lifecycle Status</label>
                    <select className="select" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="Planning">Planning</option>
                      <option value="Execution">Live Execution</option>
                      <option value="Post-Event">Post-Event Closure</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 10 }}>
                  Financial & Authority Fields
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Target Revenue (AED)</label>
                    <input className="input" value={formData.revenueTarget} onChange={e => setFormData({ ...formData, revenueTarget: e.target.value })} style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Budget Ceiling (AED)</label>
                    <input className="input" value={formData.budgetCap} onChange={e => setFormData({ ...formData, budgetCap: e.target.value })} style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Expected Attendance</label>
                    <input className="input" value={formData.expectedAudience} onChange={e => setFormData({ ...formData, expectedAudience: e.target.value })} style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Permit Authority</label>
                    <input className="input" value={formData.permitAuthority} onChange={e => setFormData({ ...formData, permitAuthority: e.target.value })} style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                <button type="button" className="btn btn-ghost" onClick={() => setEditBriefOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 22px', fontWeight: 700 }}>Save Brief</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Stakeholder Form Modal */}
      {addStakeholderOpen && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal" style={{ maxWidth: 500, padding: 24 }}>
            <div className="modal-header" style={{ marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
              <div>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>Add Stakeholder Form</span>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Assign a functional department owner or client sponsor.</p>
              </div>
              <button className="modal-close" onClick={() => setAddStakeholderOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleAddStakeholder} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Stakeholder Full Name *</label>
                <input className="input" value={newStakeholder.name} onChange={e => setNewStakeholder({ ...newStakeholder, name: e.target.value })} placeholder="e.g. Sarah Jenkins" required style={{ padding: '8px 10px', fontSize: 13 }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Role / Title *</label>
                <input className="input" value={newStakeholder.role} onChange={e => setNewStakeholder({ ...newStakeholder, role: e.target.value })} placeholder="e.g. Lead Show Producer & Lighting Director" required style={{ padding: '8px 10px', fontSize: 13 }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Department</label>
                  <select className="select" value={newStakeholder.dept} onChange={e => setNewStakeholder({ ...newStakeholder, dept: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                    <option value="Production">Production & Staging</option>
                    <option value="Commercial">Commercial & Sponsors</option>
                    <option value="Marketing">Marketing & PR</option>
                    <option value="Operations">Operations & Security</option>
                    <option value="Executive">Executive / Client</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Contact Email</label>
                  <input type="email" className="input" value={newStakeholder.email} onChange={e => setNewStakeholder({ ...newStakeholder, email: e.target.value })} placeholder="sarah@hsmedia.ae" style={{ padding: '8px 10px', fontSize: 13 }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                <button type="button" className="btn btn-ghost" onClick={() => setAddStakeholderOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 22px', fontWeight: 700 }}>Add Stakeholder</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

