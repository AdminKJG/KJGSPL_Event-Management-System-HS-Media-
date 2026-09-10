import React, { useState } from 'react';
import { creators } from '../../data/marketingData';

const statusConfig = {
  contracted: { label: 'Contracted', badgeClass: 'badge-success' },
  shortlisted: { label: 'Shortlisted', badgeClass: 'badge-brand' },
  outreach: { label: 'Outreach', badgeClass: 'badge-neutral' },
};

export default function Creators() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? creators : creators.filter(c => c.status === filter);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Creator Intelligence</h1>
          <p className="page-subtitle">{creators.length} creators tracked · {creators.filter(c => c.status === 'contracted').length} contracted</p>
        </div>
        <button className="btn btn-primary btn-sm">+ Add Creator</button>
      </div>
      <div className="filter-bar">
        {['all', 'contracted', 'shortlisted', 'outreach'].map(f => (
          <button key={f} className={`filter-chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {filtered.map(c => {
          const cfg = statusConfig[c.status];
          return (
            <div key={c.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', align: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', align: 'center', gap: 10 }}>
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
                  <span className="label-text">Relevance</span>
                  <span className="label-value" style={{ color: 'var(--brand)' }}>{c.relevance}%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${c.relevance}%` }} /></div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>View Profile</button>
                {c.status !== 'contracted' && (
                  <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>Shortlist</button>
                )}
                <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>+ Campaign</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
