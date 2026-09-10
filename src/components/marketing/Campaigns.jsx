import React, { useState } from 'react';
import { campaigns } from '../../data/marketingData';
import AiCopilotModal from '../common/AiCopilotModal';

const statusColors = { completed: 'badge-success', active: 'badge-brand', scheduled: 'badge-neutral', draft: 'badge-neutral' };

export default function Campaigns() {
  const [filter, setFilter] = useState('all');
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const filtered = filter === 'all' ? campaigns : campaigns.filter(c => c.status === filter);

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="page-header" style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title" style={{ margin: 0 }}>Campaign Calendar</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>{campaigns.length} campaigns · {campaigns.filter(c => c.status === 'active').length} active for QIDS UAE 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setAiModalOpen(true)} style={{ gap: 6 }}>
            <span>✨</span> AI Copy & Blitz Generator
          </button>
          <button className="btn btn-primary btn-sm">+ New Campaign</button>
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
              <th>Creator</th>
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

      <AiCopilotModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        defaultPrompt="Draft an engaging social announcement copy and TikTok/IG caption for the QIDS UAE 2026 Talent Hunt launch."
      />
    </div>
  );
}
