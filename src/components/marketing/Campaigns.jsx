import React, { useState } from 'react';
import { campaigns as initialCampaigns } from '../../data/marketingData';
import AiCopilotModal from '../common/AiCopilotModal';

const statusColors = { completed: 'badge-success', active: 'badge-brand', scheduled: 'badge-neutral', draft: 'badge-neutral' };

export default function Campaigns() {
  const [campaignList, setCampaignList] = useState(initialCampaigns);
  const [filter, setFilter] = useState('all');
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);

  const [campaignForm, setCampaignForm] = useState({
    name: '',
    channel: 'Instagram & TikTok',
    creator: 'Maya & Kids UAE',
    start: 'Sep 15, 2026',
    end: 'Oct 02, 2026',
    budget: 'AED 35,000',
    impressions: 150000,
    reach: 110000,
    leads: 320,
    status: 'active',
    utmTag: 'qids_uae_social_sep26',
    contentFormat: 'Short-form Video Reels & Story Swipe-ups',
  });

  const filtered = filter === 'all' ? campaignList : campaignList.filter(c => c.status === filter);

  const handleSaveCampaign = (e) => {
    e.preventDefault();
    if (!campaignForm.name) return;
    const newCamp = {
      id: `camp-${Date.now()}`,
      name: campaignForm.name,
      channel: campaignForm.channel,
      creator: campaignForm.creator,
      start: campaignForm.start,
      end: campaignForm.end,
      impressions: Number(campaignForm.impressions) || 0,
      reach: Number(campaignForm.reach) || 0,
      leads: Number(campaignForm.leads) || 0,
      status: campaignForm.status,
    };
    setCampaignList(prev => [newCamp, ...prev]);
    setCampaignModalOpen(false);
    setCampaignForm({
      name: '',
      channel: 'Instagram & TikTok',
      creator: 'Maya & Kids UAE',
      start: 'Sep 15, 2026',
      end: 'Oct 02, 2026',
      budget: 'AED 35,000',
      impressions: 150000,
      reach: 110000,
      leads: 320,
      status: 'active',
      utmTag: 'qids_uae_social_sep26',
      contentFormat: 'Short-form Video Reels & Story Swipe-ups',
    });
  };

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="page-header" style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title" style={{ margin: 0 }}>Campaign Calendar & Performance</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>{campaignList.length} campaigns · {campaignList.filter(c => c.status === 'active').length} active for QIDS UAE 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setAiModalOpen(true)} style={{ gap: 6 }}>
            <span>✨</span> AI Copy & Blitz Generator
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setCampaignModalOpen(true)} style={{ gap: 6, fontWeight: 700 }}>
            <span>📢</span> + New Campaign Form
          </button>
        </div>
      </div>

      <div className="filter-bar" style={{ marginBottom: 0 }}>
        {['all', 'active', 'scheduled', 'completed', 'draft'].map(f => (
          <button key={f} className={`filter-chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="table-container" style={{ overflowX: 'auto', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Channel</th>
              <th>Creator / Agency</th>
              <th>Start</th>
              <th>End</th>
              <th>Impressions</th>
              <th>Reach</th>
              <th>Leads</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</td>
                <td style={{ color: 'var(--text-secondary)', fontSize: 'var(--size-sm)' }}>{c.channel}</td>
                <td>{c.creator}</td>
                <td style={{ color: 'var(--text-secondary)', fontSize: 'var(--size-sm)', whiteSpace: 'nowrap' }}>{c.start}</td>
                <td style={{ color: 'var(--text-secondary)', fontSize: 'var(--size-sm)', whiteSpace: 'nowrap' }}>{c.end}</td>
                <td style={{ fontWeight: 600 }}>{c.impressions > 0 ? `${(c.impressions/1000).toFixed(0)}K` : '—'}</td>
                <td>{c.reach > 0 ? `${(c.reach/1000).toFixed(0)}K` : '—'}</td>
                <td style={{ color: c.leads > 0 ? 'var(--success)' : 'var(--text-secondary)', fontWeight: 600 }}>{c.leads > 0 ? c.leads : '—'}</td>
                <td><span className={`badge ${statusColors[c.status]}`}>{c.status.charAt(0).toUpperCase() + c.status.slice(1)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Campaign Form Modal */}
      {campaignModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal" style={{ maxWidth: 650, maxHeight: '90vh', padding: 24 }}>
            <div className="modal-header" style={{ marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
              <div>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>Create Marketing Campaign Data Form</span>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Configure channels, creative format, budget allocations & KPI impression targets.</p>
              </div>
              <button className="modal-close" onClick={() => setCampaignModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveCampaign} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 10 }}>
                  Campaign Identity & Channels
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Campaign Title *</label>
                    <input className="input" value={campaignForm.name} onChange={e => setCampaignForm({ ...campaignForm, name: e.target.value })} placeholder="e.g. Dubai School Roadshow Viral Blitz" required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Primary Channel *</label>
                    <select className="select" value={campaignForm.channel} onChange={e => setCampaignForm({ ...campaignForm, channel: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="Instagram & TikTok">Instagram & TikTok (Social)</option>
                      <option value="YouTube Shorts">YouTube Shorts & Video</option>
                      <option value="School Roadshow">Onsite School Roadshows</option>
                      <option value="Outdoor Billboards">Outdoor & LED Billboards</option>
                      <option value="Email & PR News">Email & PR Syndication</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Creator / Agency Partner</label>
                    <input className="input" value={campaignForm.creator} onChange={e => setCampaignForm({ ...campaignForm, creator: e.target.value })} placeholder="e.g. Maya & Kids UAE" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Start Date *</label>
                    <input className="input" value={campaignForm.start} onChange={e => setCampaignForm({ ...campaignForm, start: e.target.value })} placeholder="e.g. Sep 20, 2026" required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>End Date *</label>
                    <input className="input" value={campaignForm.end} onChange={e => setCampaignForm({ ...campaignForm, end: e.target.value })} placeholder="e.g. Oct 03, 2026" required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 10 }}>
                  Budgets, KPIs & Tracking Schema
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Budget Allocated</label>
                    <input className="input" value={campaignForm.budget} onChange={e => setCampaignForm({ ...campaignForm, budget: e.target.value })} placeholder="AED 25,000" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Target Impressions</label>
                    <input type="number" className="input" value={campaignForm.impressions} onChange={e => setCampaignForm({ ...campaignForm, impressions: e.target.value })} style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Target Reach</label>
                    <input type="number" className="input" value={campaignForm.reach} onChange={e => setCampaignForm({ ...campaignForm, reach: e.target.value })} style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Target Leads</label>
                    <input type="number" className="input" value={campaignForm.leads} onChange={e => setCampaignForm({ ...campaignForm, leads: e.target.value })} style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>UTM / Tracking Parameter</label>
                    <input className="input" value={campaignForm.utmTag} onChange={e => setCampaignForm({ ...campaignForm, utmTag: e.target.value })} placeholder="qids_campaign_v1" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Status</label>
                    <select className="select" value={campaignForm.status} onChange={e => setCampaignForm({ ...campaignForm, status: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                <button type="button" className="btn btn-ghost" onClick={() => setCampaignModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 22px', fontWeight: 700 }}>Save & Launch Campaign</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AiCopilotModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        defaultPrompt="Draft an engaging social announcement copy and TikTok/IG caption for the QIDS UAE 2026 Talent Hunt launch."
      />
    </div>
  );
}

