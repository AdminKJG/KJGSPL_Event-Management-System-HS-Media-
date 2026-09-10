import React, { useState } from 'react';
import { runOfShow } from '../../data/operationsData';

const statusConfig = {
  completed: { label: 'Completed', color: 'var(--success)', icon: '✓', badgeClass: 'badge-success' },
  'on-track': { label: 'On Track', color: 'var(--brand)', icon: '▶', badgeClass: 'badge-brand' },
  upcoming: { label: 'Upcoming', color: 'var(--text-secondary)', icon: '○', badgeClass: 'badge-neutral' },
  delayed: { label: 'Delayed', color: 'var(--danger)', icon: '!', badgeClass: 'badge-danger' },
};

export default function RunOfShow() {
  const [items, setItems] = useState(runOfShow);
  const [selected, setSelected] = useState(null);

  const updateStatus = (id, status) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    setSelected(null);
  };

  const currentActivity = items.find(i => i.status === 'on-track');
  const nextActivity = items.find((i, idx) => i.status === 'upcoming' && (idx === 0 || items[idx - 1].status !== 'upcoming'));

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Run of Show</h1>
          <p className="page-subtitle">QIDS UAE Talent Hunt 2026 — Day 1 · Oct 3, 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost btn-sm">Export PDF</button>
          <button className="btn btn-primary btn-sm">+ Add Item</button>
        </div>
      </div>

      {/* Current & Next */}
      {(currentActivity || nextActivity) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
          {currentActivity && (
            <div style={{ padding: '14px 18px', background: 'linear-gradient(135deg, rgba(246,145,35,0.1), rgba(246,145,35,0.03))', border: '1px solid rgba(246,145,35,0.25)', borderRadius: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>▶ Now Running</div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 'var(--size-xl)', marginBottom: 4 }}>{currentActivity.time} — {currentActivity.activity}</div>
              <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>{currentActivity.location} · {currentActivity.owner}</div>
            </div>
          )}
          {nextActivity && (
            <div style={{ padding: '14px 18px', background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>○ Up Next</div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 'var(--size-xl)', marginBottom: 4 }}>{nextActivity.time} — {nextActivity.activity}</div>
              <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>{nextActivity.location} · {nextActivity.owner}</div>
            </div>
          )}
        </div>
      )}

      {/* Progress */}
      <div style={{ marginBottom: 20 }}>
        <div className="label-row">
          <span className="label-text">Schedule Progress</span>
          <span className="label-value">{items.filter(i => i.status === 'completed').length} / {items.length} items completed</span>
        </div>
        <div className="progress-bar" style={{ height: 6 }}>
          <div className="progress-fill" style={{ width: `${(items.filter(i => i.status === 'completed').length / items.length) * 100}%` }} />
        </div>
      </div>

      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map(item => {
          const cfg = statusConfig[item.status] || statusConfig.upcoming;
          const isSelected = selected === item.id;
          return (
            <div
              key={item.id}
              style={{ display: 'flex', gap: 16, padding: '14px 18px', background: 'var(--surface-card)', border: `1px solid ${isSelected ? 'var(--brand)' : item.status === 'on-track' ? 'rgba(246,145,35,0.3)' : 'var(--border)'}`, borderRadius: 12, cursor: 'pointer', transition: 'all 0.15s', borderLeft: `3px solid ${cfg.color}`, opacity: item.status === 'completed' ? 0.7 : 1 }}
              onClick={() => setSelected(isSelected ? null : item.id)}
            >
              {/* Time */}
              <div style={{ width: 60, flexShrink: 0, textAlign: 'center' }}>
                <div style={{ fontWeight: 800, color: cfg.color, fontSize: 'var(--size-lg)' }}>{item.time}</div>
                <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{item.duration}</div>
              </div>

              {/* Status icon */}
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${cfg.color}20`, border: `2px solid ${cfg.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: cfg.color, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>
                {cfg.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 'var(--size-md)', marginBottom: 4 }}>{item.activity}</div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>👤 {item.owner}</span>
                  <span style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>📍 {item.location}</span>
                  {item.notes && <span style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>📝 {item.notes}</span>}
                </div>
                {isSelected && (
                  <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                    <button className="btn btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); updateStatus(item.id, 'on-track'); }}>▶ Start</button>
                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--success)', borderColor: 'rgba(34,197,94,0.2)' }} onClick={(e) => { e.stopPropagation(); updateStatus(item.id, 'completed'); }}>✓ Complete</button>
                    <button className="btn btn-danger btn-sm" onClick={(e) => { e.stopPropagation(); updateStatus(item.id, 'delayed'); }}>⚠ Mark Delayed</button>
                  </div>
                )}
              </div>

              <span className={`badge ${cfg.badgeClass}`} style={{ flexShrink: 0, alignSelf: 'flex-start' }}>{cfg.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
