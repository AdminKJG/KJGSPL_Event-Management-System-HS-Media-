import React, { useState } from 'react';
import { incidents as initialIncidents } from '../../data/operationsData';

const severityConfig = {
  critical: { label: 'Critical', badgeClass: 'badge-danger', color: 'var(--danger)' },
  high: { label: 'High', badgeClass: 'badge-warning', color: 'var(--warning)' },
  medium: { label: 'Medium', badgeClass: 'badge-brand', color: 'var(--brand)' },
  low: { label: 'Low', badgeClass: 'badge-neutral', color: 'var(--text-secondary)' },
};

const statusConfig = {
  open: { label: 'Open', badgeClass: 'badge-danger' },
  'in-progress': { label: 'In Progress', badgeClass: 'badge-warning' },
  escalated: { label: 'Escalated', badgeClass: 'badge-brand' },
  resolved: { label: 'Resolved', badgeClass: 'badge-success' },
};

const typeColors = { brand: 'var(--brand)', neutral: 'var(--text-secondary)', warning: 'var(--warning)', success: 'var(--success)', danger: 'var(--danger)', info: 'var(--info)' };

export default function Incidents({ navParams }) {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [selected, setSelected] = useState(navParams?.incidentId || incidents[0]?.id);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSeverity, setNewSeverity] = useState('medium');

  const inc = incidents.find(i => i.id === selected);

  const act = (id, action) => {
    setIncidents(prev => prev.map(i => {
      if (i.id !== id) return i;
      const now = new Date().toLocaleTimeString('en-AE', { hour: '2-digit', minute: '2-digit' });
      const updates = {
        assign: { status: 'in-progress', timeline: [...i.timeline, { time: now, event: 'Assigned and being actioned', user: 'Harshad Shah', type: 'info' }] },
        escalate: { escalated: true, timeline: [...i.timeline, { time: now, event: 'Escalated — senior management notified', user: 'System', type: 'danger' }] },
        resolve: { status: 'resolved', resolvedAt: now, timeline: [...i.timeline, { time: now, event: 'Incident resolved ✓', user: 'Harshad Shah', type: 'success' }] },
      };
      return { ...i, ...updates[action] };
    }));
  };

  const createIncident = () => {
    if (!newTitle) return;
    const newId = `INC-00${incidents.length + 1}`;
    const now = new Date().toLocaleTimeString('en-AE', { hour: '2-digit', minute: '2-digit' });
    const newInc = { id: newId, title: newTitle, description: newDesc, severity: newSeverity, status: 'open', owner: 'Harshad Shah', reported: now, reportedBy: 'Harshad Shah', escalated: false, timeline: [{ time: now, event: 'Incident created', user: 'Harshad Shah', type: 'brand' }] };
    setIncidents(prev => [newInc, ...prev]);
    setSelected(newId);
    setNewTitle(''); setNewDesc(''); setNewSeverity('medium');
    setShowCreate(false);
  };

  return (
    <div className="page" style={{ display: 'flex', gap: 20 }}>
      {/* List */}
      <div style={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div>
            <div className="page-title" style={{ fontSize: 'var(--size-3xl)' }}>Incidents</div>
            <div className="page-subtitle">{incidents.filter(i => i.status !== 'resolved').length} open</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowCreate(!showCreate)}>+ Create</button>
        </div>

        {/* Create form */}
        {showCreate && (
          <div style={{ padding: '14px 16px', background: 'var(--surface-card)', border: '1px solid var(--brand)', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontWeight: 700, color: 'var(--brand)', fontSize: 'var(--size-md)', marginBottom: 2 }}>New Incident</div>
            <input className="input" placeholder="Incident title *" value={newTitle} onChange={e => setNewTitle(e.target.value)} style={{ fontSize: 'var(--size-sm)', padding: '8px 10px' }} />
            <textarea className="input" placeholder="Description" value={newDesc} onChange={e => setNewDesc(e.target.value)} rows={2} style={{ resize: 'none', fontSize: 'var(--size-sm)', padding: '8px 10px' }} />
            <select className="select" value={newSeverity} onChange={e => setNewSeverity(e.target.value)} style={{ fontSize: 'var(--size-sm)', padding: '6px 10px', width: '100%' }}>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={createIncident}>Create</button>
            </div>
          </div>
        )}

        {incidents.map(i => {
          const sCfg = severityConfig[i.severity] || severityConfig.medium;
          const stCfg = statusConfig[i.status] || statusConfig.open;
          return (
            <div
              key={i.id}
              className="card card-sm"
              style={{ cursor: 'pointer', borderColor: selected === i.id ? 'var(--brand)' : i.status === 'resolved' ? 'var(--border-subtle)' : `${sCfg.color}40`, background: selected === i.id ? 'var(--brand-dim)' : 'var(--surface-card)', opacity: i.status === 'resolved' ? 0.65 : 1 }}
              onClick={() => setSelected(i.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: sCfg.color }}>{i.id}</span>
                  {i.escalated && <span className="badge badge-danger" style={{ fontSize: 8 }}>ESCALATED</span>}
                </div>
                <span className={`badge ${stCfg.badgeClass}`} style={{ fontSize: 9 }}>{stCfg.label}</span>
              </div>
              <div style={{ fontSize: 'var(--size-sm)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{i.title}</div>
              <div style={{ display: 'flex', gap: 10 }}>
                <span className={`badge ${sCfg.badgeClass}`} style={{ fontSize: 9 }}>{i.severity}</span>
                <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{i.owner.split(' ')[0]} · {i.reported}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail */}
      {inc ? (
        <div style={{ flex: 1, minWidth: 0, background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', background: `linear-gradient(135deg, ${severityConfig[inc.severity]?.color}08, transparent)`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <span className={`badge ${severityConfig[inc.severity]?.badgeClass}`}>{inc.severity?.toUpperCase()} SEVERITY</span>
                <span className={`badge ${statusConfig[inc.status]?.badgeClass}`}>{statusConfig[inc.status]?.label}</span>
                {inc.escalated && <span className="badge badge-danger">ESCALATED</span>}
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>{inc.title}</div>
              <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>
                {inc.id} · Reported {inc.reported} by {inc.reportedBy} · Owner: <strong style={{ color: 'var(--text-primary)' }}>{inc.owner}</strong>
              </div>
            </div>
            {inc.status !== 'resolved' && (
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => act(inc.id, 'assign')}>👤 Assign</button>
                {!inc.escalated && (
                  <button className="btn btn-danger btn-sm" onClick={() => act(inc.id, 'escalate')}>🔺 Escalate</button>
                )}
                <button className="btn btn-primary btn-sm" style={{ background: 'var(--success)', color: '#fff' }} onClick={() => act(inc.id, 'resolve')}>✓ Resolve</button>
              </div>
            )}
            {inc.status === 'resolved' && (
              <span className="badge badge-success" style={{ padding: '8px 14px', fontSize: 'var(--size-sm)' }}>✓ Resolved at {inc.resolvedAt}</span>
            )}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {/* Description */}
            <div style={{ marginBottom: 20 }}>
              <div className="label-text" style={{ marginBottom: 8 }}>Description</div>
              <div style={{ padding: '12px 16px', background: 'var(--surface-raised)', borderRadius: 10, fontSize: 'var(--size-md)', color: 'var(--text-primary)', lineHeight: 1.6 }}>{inc.description}</div>
            </div>

            {/* Details grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {[
                { label: 'Incident ID', value: inc.id },
                { label: 'Severity', value: inc.severity?.toUpperCase() },
                { label: 'Owner', value: inc.owner },
                { label: 'Reported By', value: inc.reportedBy },
                { label: 'Status', value: statusConfig[inc.status]?.label },
                { label: 'Reported At', value: inc.reported },
              ].map(row => (
                <div key={row.label} style={{ padding: '10px 14px', background: 'var(--surface-raised)', borderRadius: 10 }}>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>{row.label}</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 'var(--size-md)' }}>{row.value}</div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div>
              <div className="label-text" style={{ marginBottom: 12 }}>Timeline</div>
              <div className="timeline">
                {inc.timeline.map((ev, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className={`timeline-dot ${ev.type}`} />
                    <div className="timeline-content">
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <span className="timeline-time">{ev.time}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>· {ev.user}</span>
                      </div>
                      <div className="timeline-text" style={{ marginTop: 2, color: typeColors[ev.type] || 'var(--text-primary)' }}>{ev.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state" style={{ flex: 1 }}>
          <div className="empty-icon">⚠️</div>
          <div>Select an incident to view</div>
        </div>
      )}
    </div>
  );
}
