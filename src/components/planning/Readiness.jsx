import React, { useState } from 'react';
import { workstreams, blockers, readinessScore } from '../../data/eventData';

const statusConfig = {
  'on-track': { label: 'On Track', color: 'var(--success)', bg: 'var(--success-dim)', badgeClass: 'badge-success' },
  'at-risk': { label: 'At Risk', color: 'var(--warning)', bg: 'var(--warning-dim)', badgeClass: 'badge-warning' },
  blocked: { label: 'Blocked', color: 'var(--danger)', bg: 'var(--danger-dim)', badgeClass: 'badge-danger' },
  'on-track': { label: 'On Track', color: 'var(--success)', bg: 'var(--success-dim)', badgeClass: 'badge-success' },
};

export default function Readiness({ onNavigate }) {
  const [selectedWs, setSelectedWs] = useState(null);

  const onTrack = workstreams.filter(w => w.status === 'on-track');
  const atRisk = workstreams.filter(w => w.status === 'at-risk');
  const blocked = workstreams.filter(w => w.status === 'blocked');

  const readinessColor = readinessScore >= 80 ? 'var(--success)' : readinessScore >= 60 ? 'var(--warning)' : 'var(--danger)';

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Readiness & Blockers</h1>
          <p className="page-subtitle">Workstream health, critical blockers and dependency alerts</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('masterplan')}>Master Plan</button>
          <button className="btn btn-primary btn-sm">Escalate All</button>
        </div>
      </div>

      {/* Overall Score */}
      <div className="card" style={{ marginBottom: 20, background: 'linear-gradient(135deg, rgba(246,145,35,0.06), transparent)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ textAlign: 'center', minWidth: 100 }}>
            <div style={{ fontSize: 52, fontWeight: 800, color: readinessColor, lineHeight: 1 }}>{readinessScore}%</div>
            <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)', marginTop: 4 }}>Overall Readiness</div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="progress-bar" style={{ height: 12, marginBottom: 12 }}>
              <div className="progress-fill" style={{ width: `${readinessScore}%`, background: readinessColor }} />
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              {[
                { label: 'On Track', count: onTrack.length, color: 'var(--success)' },
                { label: 'At Risk', count: atRisk.length, color: 'var(--warning)' },
                { label: 'Blocked', count: blocked.length, color: 'var(--danger)' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', align: 'center', gap: 8 }}>
                  <span style={{ color: s.color, fontWeight: 700, fontSize: 18 }}>{s.count}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--size-sm)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Critical Blockers — always prominent */}
      {blockers.length > 0 && (
        <div className="card" style={{ marginBottom: 20, border: '1px solid rgba(239,68,68,0.25)', background: 'linear-gradient(135deg, rgba(239,68,68,0.05), transparent)' }}>
          <div className="section-header" style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ color: 'var(--danger)' }}>⛔ Critical Blockers — Action Required</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {blockers.map(b => (
              <div key={b.id} style={{ padding: '14px 16px', background: 'var(--surface-raised)', borderRadius: 12, borderLeft: `4px solid ${b.severity === 'critical' ? 'var(--danger)' : 'var(--warning)'}` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                  <div>
                    <div style={{ display: 'flex', align: 'center', gap: 8, marginBottom: 4 }}>
                      <span className={`badge badge-${b.severity === 'critical' ? 'danger' : 'warning'}`}>{b.severity.toUpperCase()}</span>
                      <span style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>{b.workstream}</span>
                    </div>
                    <div style={{ fontSize: 'var(--size-md)', color: 'var(--text-primary)', fontWeight: 500 }}>{b.issue}</div>
                    <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)', marginTop: 4 }}>Owner: {b.owner} · Open {b.daysOpen} days</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button className="btn btn-ghost btn-sm">Reassign</button>
                    <button className="btn btn-danger btn-sm">Escalate</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workstream Grid */}
      <div className="section-header"><div className="section-title">All Workstreams</div></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {workstreams.map(ws => {
          const cfg = statusConfig[ws.status] || { label: ws.status, color: 'var(--text-secondary)', bg: 'var(--surface-raised)', badgeClass: 'badge-neutral' };
          const blockedTasks = ws.tasks.filter(t => t.status === 'blocked');
          return (
            <div key={ws.id} className="card card-sm" style={{ cursor: 'pointer', borderColor: selectedWs === ws.id ? 'var(--brand)' : 'var(--border)' }} onClick={() => setSelectedWs(selectedWs === ws.id ? null : ws.id)}>
              <div style={{ display: 'flex', align: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 'var(--size-md)' }}>{ws.name}</div>
                <span className={`badge ${cfg.badgeClass}`}>{cfg.label}</span>
              </div>
              <div style={{ display: 'flex', align: 'center', gap: 8, marginBottom: 8 }}>
                <div className="avatar" style={{ width: 24, height: 24, fontSize: 10 }}>{ws.ownerAvatar}</div>
                <span style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>{ws.owner}</span>
              </div>
              <div>
                <div className="label-row" style={{ marginBottom: 4 }}>
                  <span className="label-text">Progress</span>
                  <span className="label-value" style={{ color: cfg.color }}>{ws.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${ws.progress}%`, background: cfg.color }} />
                </div>
              </div>
              {blockedTasks.length > 0 && (
                <div style={{ marginTop: 10, padding: '6px 10px', background: 'var(--danger-dim)', borderRadius: 8, fontSize: 'var(--size-sm)', color: 'var(--danger)' }}>
                  ⛔ {blockedTasks.length} blocked task{blockedTasks.length > 1 ? 's' : ''}
                </div>
              )}
              {selectedWs === ws.id && (
                <div style={{ marginTop: 12, borderTop: '1px solid var(--border-subtle)', paddingTop: 12 }}>
                  {ws.tasks.map(t => (
                    <div key={t.id} style={{ display: 'flex', align: 'center', gap: 8, padding: '5px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--size-sm)' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.status === 'done' ? 'var(--success)' : t.status === 'blocked' ? 'var(--danger)' : t.status === 'in-progress' ? 'var(--brand)' : 'var(--text-secondary)', flexShrink: 0 }} />
                      <span style={{ flex: 1, color: 'var(--text-primary)' }}>{t.name}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{t.due}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
