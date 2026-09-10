import React, { useState } from 'react';
import { creators as initialCreators } from '../../data/marketingData';

const statusConfig = {
  contracted: { label: 'Contracted', badgeClass: 'badge-success' },
  shortlisted: { label: 'Shortlisted', badgeClass: 'badge-brand' },
  outreach: { label: 'Outreach', badgeClass: 'badge-neutral' },
};

export default function Creators() {
  const [creatorList, setCreatorList] = useState(initialCreators);
  const [filter, setFilter] = useState('all');
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [isEditingCreator, setIsEditingCreator] = useState(false);

  const [creatorForm, setCreatorForm] = useState({
    id: '',
    name: '',
    handle: '@',
    category: 'Family & Parenting',
    platform: 'Instagram',
    audience: '250K',
    engagement: '5.2%',
    location: 'Dubai, UAE',
    relevance: 92,
    fee: 'AED 15,000',
    deliverables: '2 Reels + 3 Stories + 1 Onsite Appearance',
    status: 'shortlisted',
    email: '',
    phone: '',
  });

  const filtered = filter === 'all' ? creatorList : creatorList.filter(c => c.status === filter);

  const handleOpenAddCreator = () => {
    setIsEditingCreator(false);
    setCreatorForm({
      id: `c-${Date.now()}`,
      name: '',
      handle: '@',
      category: 'Family & Parenting',
      platform: 'Instagram',
      audience: '180K',
      engagement: '4.8%',
      location: 'Dubai, UAE',
      relevance: 90,
      fee: 'AED 12,000',
      deliverables: '2 Reels + 3 IG Stories + Live Red Carpet',
      status: 'shortlisted',
      email: '',
      phone: '',
    });
    setCreatorModalOpen(true);
  };

  const handleOpenEditCreator = (c) => {
    setIsEditingCreator(true);
    setCreatorForm({
      id: c.id,
      name: c.name,
      handle: c.handle || `@${c.name.toLowerCase().replace(/\s+/g, '')}`,
      category: c.category,
      platform: c.platform,
      audience: c.audience,
      engagement: c.engagement,
      location: c.location,
      relevance: c.relevance,
      fee: c.fee || 'AED 18,000',
      deliverables: c.deliverables || '2 Reels + 3 Stories + Onstage Jury Host',
      status: c.status,
      email: c.email || `management@${c.name.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: c.phone || '+971 55 123 4567',
    });
    setCreatorModalOpen(true);
  };

  const handleSaveCreator = (e) => {
    e.preventDefault();
    if (!creatorForm.name) return;

    if (isEditingCreator) {
      setCreatorList(prev => prev.map(c => c.id === creatorForm.id ? { ...c, ...creatorForm } : c));
    } else {
      setCreatorList(prev => [creatorForm, ...prev]);
    }
    setCreatorModalOpen(false);
  };

  return (
    <div className="page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Creator Intelligence & Roster</h1>
          <p className="page-subtitle">{creatorList.length} creators tracked · {creatorList.filter(c => c.status === 'contracted').length} contracted</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleOpenAddCreator} style={{ gap: 6, fontWeight: 700 }}>
          <span>🌟</span> + Add Creator / Talent Form
        </button>
      </div>

      <div className="filter-bar">
        {['all', 'contracted', 'shortlisted', 'outreach'].map(f => (
          <button key={f} className={`filter-chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
        {filtered.map(c => {
          const cfg = statusConfig[c.status] || statusConfig.outreach;
          return (
            <div key={c.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="avatar" style={{ width: 44, height: 44, fontSize: 16, flexShrink: 0 }}>{c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 'var(--size-md)' }}>{c.name}</div>
                    <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>{c.category}</div>
                  </div>
                </div>
                <span className={`badge ${cfg.badgeClass}`}>{cfg.label}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { label: 'Platform', value: c.platform },
                  { label: 'Audience', value: c.audience },
                  { label: 'Engagement', value: c.engagement },
                  { label: 'Location', value: c.location },
                ].map(row => (
                  <div key={row.label} style={{ padding: '8px', background: 'var(--surface-raised)', borderRadius: 8 }}>
                    <div style={{ fontSize: 9, color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>{row.label}</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 'var(--size-sm)', marginTop: 2 }}>{row.value}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="label-row" style={{ marginBottom: 4 }}>
                  <span className="label-text">Relevance Match</span>
                  <span className="label-value" style={{ color: 'var(--brand)' }}>{c.relevance}%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${c.relevance}%` }} /></div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => handleOpenEditCreator(c)}>
                  Profile & Form
                </button>
                {c.status !== 'contracted' && (
                  <button
                    className="btn btn-ghost btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => {
                      setCreatorList(prev => prev.map(item => item.id === c.id ? { ...item, status: 'contracted' } : item));
                    }}
                  >
                    Contract ✓
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Creator Form Modal */}
      {creatorModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal" style={{ maxWidth: 640, maxHeight: '90vh', padding: 24 }}>
            <div className="modal-header" style={{ marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
              <div>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>
                  {isEditingCreator ? `Edit Creator Profile Form — ${creatorForm.name}` : 'Creator & Influencer Onboarding Form'}
                </span>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                  Manage creator metrics, commercial fees, deliverables scope & contract agreements.
                </p>
              </div>
              <button className="modal-close" onClick={() => setCreatorModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveCreator} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 10 }}>
                  Creator Identity & Channels
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Full Name *</label>
                    <input className="input" value={creatorForm.name} onChange={e => setCreatorForm({ ...creatorForm, name: e.target.value })} placeholder="e.g. Layla Al-Hashimi" required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Social Handle</label>
                    <input className="input" value={creatorForm.handle} onChange={e => setCreatorForm({ ...creatorForm, handle: e.target.value })} placeholder="@layla_kids" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Primary Platform</label>
                    <select className="select" value={creatorForm.platform} onChange={e => setCreatorForm({ ...creatorForm, platform: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="Instagram">Instagram</option>
                      <option value="TikTok">TikTok</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Snapchat">Snapchat</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Niche / Category</label>
                    <select className="select" value={creatorForm.category} onChange={e => setCreatorForm({ ...creatorForm, category: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="Family & Parenting">Family & Parenting</option>
                      <option value="EdTech & Coding">EdTech & Coding</option>
                      <option value="Kids Entertainment">Kids Entertainment</option>
                      <option value="Youth Sports & Dance">Youth Sports & Dance</option>
                      <option value="Lifestyle & Tech">Lifestyle & Tech</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Base Location</label>
                    <input className="input" value={creatorForm.location} onChange={e => setCreatorForm({ ...creatorForm, location: e.target.value })} placeholder="Dubai, UAE" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 10 }}>
                  Audience Analytics & Commercials
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Follower Count</label>
                    <input className="input" value={creatorForm.audience} onChange={e => setCreatorForm({ ...creatorForm, audience: e.target.value })} placeholder="250K" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Engagement Rate</label>
                    <input className="input" value={creatorForm.engagement} onChange={e => setCreatorForm({ ...creatorForm, engagement: e.target.value })} placeholder="4.5%" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Remuneration Fee</label>
                    <input className="input" value={creatorForm.fee} onChange={e => setCreatorForm({ ...creatorForm, fee: e.target.value })} placeholder="AED 15,000" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Contract Status</label>
                    <select className="select" value={creatorForm.status} onChange={e => setCreatorForm({ ...creatorForm, status: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="outreach">Outreach</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="contracted">Contracted</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Contract Deliverables Scope</label>
                  <input className="input" value={creatorForm.deliverables} onChange={e => setCreatorForm({ ...creatorForm, deliverables: e.target.value })} placeholder="e.g. 2 Reels + 3 IG Stories + 1 Live Onstage Segment" style={{ padding: '8px 10px', fontSize: 13 }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                <button type="button" className="btn btn-ghost" onClick={() => setCreatorModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 22px', fontWeight: 700 }}>
                  {isEditingCreator ? 'Update Creator Profile' : 'Add Creator to Roster'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

