import React, { useState, useEffect } from 'react';
import { runOfShow, incidents } from '../../data/operationsData';

export default function LiveCommand({ onNavigate }) {
  const [time, setTime] = useState(new Date());
  const [eventStatus, setEventStatus] = useState('on-track'); // on-track, attention, critical

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const currentItem = runOfShow.find(i => i.status === 'on-track');
  const nextItem = runOfShow.find((i, idx) => i.status === 'upcoming' && (idx === 0 || runOfShow[idx - 1].status !== 'upcoming'));
  const openIncidents = incidents.filter(i => i.status !== 'resolved');
  const completedItems = runOfShow.filter(i => i.status === 'completed').length;

  const statusConfig = {
    'on-track': { icon: '🟢', label: 'On Track', color: 'var(--success)', bg: 'var(--success-dim)' },
    'attention': { icon: '🟡', label: 'Attention Required', color: 'var(--warning)', bg: 'var(--warning-dim)' },
    'critical': { icon: '🔴', label: 'Critical', color: 'var(--danger)', bg: 'var(--danger-dim)' },
  };
  const sCfg = statusConfig[eventStatus];

  return (
    <div className="page">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div className="live-indicator"><div className="live-dot" />LIVE EVENT DAY</div>
            <span style={{ fontWeight: 700, fontSize: 22, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
              {time.toLocaleTimeString('en-AE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
          <h1 className="page-title">Live Command Centre</h1>
          <p className="page-subtitle">QIDS UAE Talent Hunt 2026 · Oct 3, 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-danger btn-sm" onClick={() => onNavigate('incidents')}>⚠️ Create Incident</button>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('runofshow')}>⏱️ Run of Show</button>
        </div>
      </div>

      {/* Event Status Banner */}
      <div style={{ padding: '18px 22px', background: sCfg.bg, border: `1px solid ${sCfg.color}40`, borderRadius: 14, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 32 }}>{sCfg.icon}</span>
          <div>
            <div style={{ fontWeight: 800, color: sCfg.color, fontSize: 22 }}>Event Status: {sCfg.label}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--size-sm)' }}>
              {completedItems}/{runOfShow.length} schedule items completed · {openIncidents.length} open incidents
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--warning)' }} onClick={() => setEventStatus('attention')}>🟡 Attention</button>
          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => setEventStatus('critical')}>🔴 Critical</button>
          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--success)' }} onClick={() => setEventStatus('on-track')}>🟢 On Track</button>
        </div>
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
        {/* Stats */}
        {[
          { label: 'Attendees In Venue', value: '8,340', icon: '👥', iconClass: 'info' },
          { label: 'Active Incidents', value: openIncidents.length, icon: '⚠️', iconClass: openIncidents.length > 0 ? 'danger' : 'success' },
          { label: 'Schedule Progress', value: `${completedItems}/${runOfShow.length}`, icon: '📋', iconClass: 'brand' },
          { label: 'Exhibitor Stalls Open', value: '14/14', icon: '🏟️', iconClass: 'success' },
          { label: 'Safety Status', value: 'Clear', icon: '🛡️', iconClass: 'success' },
          { label: 'Production Status', value: 'Live', icon: '📡', iconClass: 'brand' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className={`stat-icon ${s.iconClass}`}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Current & Next */}
        <div className="card">
          <div className="section-title" style={{ marginBottom: 16 }}>Current & Next Activity</div>
          {currentItem && (
            <div style={{ padding: '14px 16px', background: 'var(--brand-dim)', border: '1px solid rgba(246,145,35,0.25)', borderRadius: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 6 }}>▶ NOW RUNNING</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--size-lg)', color: 'var(--text-primary)', marginBottom: 4 }}>{currentItem.time} — {currentItem.activity}</div>
              <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>📍 {currentItem.location} · 👤 {currentItem.owner}</div>
              {currentItem.notes && <div style={{ marginTop: 6, fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>📝 {currentItem.notes}</div>}
            </div>
          )}
          {nextItem && (
            <div style={{ padding: '14px 16px', background: 'var(--surface-raised)', border: '1px solid var(--border)', borderRadius: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>○ UP NEXT</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--size-lg)', color: 'var(--text-primary)', marginBottom: 4 }}>{nextItem.time} — {nextItem.activity}</div>
              <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>📍 {nextItem.location} · 👤 {nextItem.owner}</div>
            </div>
          )}
        </div>

        {/* Incidents */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div className="section-title" style={{ color: openIncidents.length > 0 ? 'var(--warning)' : 'var(--text-primary)' }}>
              {openIncidents.length > 0 ? `⚠️ ${openIncidents.length} Active Incidents` : '✅ No Active Incidents'}
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('incidents')}>Manage →</button>
          </div>
          {openIncidents.length === 0 ? (
            <div className="empty-state" style={{ padding: '20px 0' }}>
              <div style={{ fontSize: 28 }}>✅</div>
              <div style={{ fontSize: 'var(--size-md)', color: 'var(--success)' }}>All clear — no active incidents</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {openIncidents.map(inc => (
                <div key={inc.id} style={{ padding: '10px 14px', background: 'var(--surface-raised)', borderRadius: 10, borderLeft: `3px solid ${inc.severity === 'critical' ? 'var(--danger)' : 'var(--warning)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 'var(--size-sm)' }}>{inc.id}</span>
                    <span className={`badge badge-${inc.severity === 'critical' ? 'danger' : 'warning'}`} style={{ fontSize: 9 }}>{inc.severity}</span>
                  </div>
                  <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-primary)', marginBottom: 4 }}>{inc.title}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Owner: {inc.owner} · Reported: {inc.reported}</div>
                  <button className="btn btn-primary btn-sm" style={{ marginTop: 8, padding: '4px 10px', fontSize: 10 }} onClick={() => onNavigate('incidents', { incidentId: inc.id })}>View & Act</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
