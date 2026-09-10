import React from 'react';
import { programme } from '../../data/marketingData';

const typeColors = {
  ceremony: 'var(--brand)', keynote: 'var(--brand)', panel: 'var(--info)',
  break: 'var(--text-secondary)', sponsor: 'var(--warning)', performance: 'var(--purple)',
  awards: 'var(--brand)', close: 'var(--success)',
};
const typeIcons = {
  ceremony: '🎉', keynote: '🎤', panel: '💬', break: '☕',
  sponsor: '🤝', performance: '🎵', awards: '🏆', close: '👋',
};

export default function Programme() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Programme & Talent</h1>
          <p className="page-subtitle">Oct 3, 2026 — Day 1 Schedule · GIIS School, Dubai</p>
        </div>
        <button className="btn btn-primary btn-sm">+ Add Session</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {programme.map((p, i) => (
          <div key={p.id} style={{ display: 'flex', gap: 16, padding: '14px 18px', background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 12, borderLeft: `3px solid ${typeColors[p.type] || 'var(--border)'}`, transition: 'all 0.15s' }}>
            <div style={{ width: 80, flexShrink: 0, textAlign: 'center' }}>
              <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 'var(--size-lg)' }}>{p.time}</div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 2 }}>{p.duration}</div>
            </div>
            <div style={{ fontSize: 24, flexShrink: 0, width: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{typeIcons[p.type]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 'var(--size-lg)', marginBottom: 4 }}>{p.session}</div>
              <div style={{ display: 'flex', gap: 12, align: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>🎤 {p.speaker}</span>
                <span style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>📍 {p.stage}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <span className={`badge badge-${p.status === 'confirmed' ? 'success' : 'warning'}`}>{p.status === 'confirmed' ? 'Confirmed' : 'Pending'}</span>
              <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: 10, fontWeight: 600, background: `${typeColors[p.type]}20`, color: typeColors[p.type] }}>{p.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
