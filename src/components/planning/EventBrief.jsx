import React from 'react';
import { eventBrief } from '../../data/eventData';

export default function EventBrief() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Event Brief</h1>
          <p className="page-subtitle">Core event overview, objectives and stakeholders</p>
        </div>
        <span className={`badge badge-${eventBrief.status === 'Planning' ? 'warning' : 'success'}`} style={{ padding: '6px 16px', fontSize: 'var(--size-sm)' }}>
          {eventBrief.status}
        </span>
      </div>

      <div className="grid-2">
        {/* Core Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="section-title" style={{ marginBottom: 16 }}>Event Details</div>
            {[
              { label: 'Event Name', value: eventBrief.name },
              { label: 'Type', value: eventBrief.type },
              { label: 'Date', value: eventBrief.date },
              { label: 'Location', value: eventBrief.location },
              { label: 'Expected Audience', value: eventBrief.expectedAudience },
              { label: 'Status', value: eventBrief.status },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ width: 160, flexShrink: 0, fontSize: 'var(--size-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>{row.label}</div>
                <div style={{ fontSize: 'var(--size-base)', color: 'var(--text-primary)', fontWeight: 500 }}>{row.value}</div>
              </div>
            ))}
          </div>

          {/* Stakeholders */}
          <div className="card">
            <div className="section-title" style={{ marginBottom: 16 }}>Key Stakeholders</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {eventBrief.stakeholders.map(s => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', background: 'var(--surface-raised)', borderRadius: 10 }}>
                  <div className="avatar">{s.avatar}</div>
                  <div>
                    <div style={{ fontSize: 'var(--size-md)', fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</div>
                    <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>{s.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Objectives & Goals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="section-title" style={{ marginBottom: 16 }}>Event Objectives</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {eventBrief.objectives.map((obj, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 12px', background: 'var(--surface-raised)', borderRadius: 10 }}>
                  <span style={{ color: 'var(--brand)', fontWeight: 700, flexShrink: 0 }}>0{i+1}</span>
                  <span style={{ fontSize: 'var(--size-md)', color: 'var(--text-primary)' }}>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="section-title" style={{ marginBottom: 16 }}>Business Goals</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {eventBrief.businessGoals.map((g, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 12px', background: 'var(--brand-dim)', border: '1px solid var(--border)', borderRadius: 10 }}>
                  <span style={{ color: 'var(--brand)', flexShrink: 0 }}>💰</span>
                  <span style={{ fontSize: 'var(--size-md)', color: 'var(--text-primary)' }}>{g}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
