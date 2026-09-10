import React from 'react';
import { workstreams, blockers, readinessScore, milestones } from '../../data/eventData';
import { pipeline, stalls } from '../../data/commercialData';
import { incidents } from '../../data/operationsData';

const fmt = (n) => n >= 1000000 ? `AED ${(n/1000000).toFixed(2)}M` : n >= 1000 ? `AED ${(n/1000).toFixed(0)}K` : `AED ${n.toLocaleString()}`;

function StatCard({ icon, label, value, sub, iconClass, trend }) {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className={`stat-icon ${iconClass}`}>{icon}</span>
        {trend && <span style={{ fontSize: 'var(--size-sm)', color: trend > 0 ? 'var(--success)' : 'var(--danger)' }}>{trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>}
      </div>
      <div className="stat-value" style={{ fontSize: 'var(--size-4xl)', marginTop: 6 }}>{value}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

export default function CommandCentre({ onNavigate }) {
  const pipelineValue = pipeline.filter(p => p.stage !== 'Lost').reduce((s, p) => s + p.value, 0);
  const wonValue = pipeline.filter(p => p.stage === 'Won').reduce((s, p) => s + p.value, 0);
  const openIncidents = incidents.filter(i => i.status !== 'resolved').length;
  const confirmedSponsors = pipeline.filter(p => p.stage === 'Won').length;
  const tickets = 4240;
  const ticketTarget = 12000;

  const readinessColor = readinessScore >= 80 ? 'var(--success)' : readinessScore >= 60 ? 'var(--warning)' : 'var(--danger)';
  const wsOnTrack = workstreams.filter(w => w.status === 'on-track').length;
  const wsBlocked = workstreams.filter(w => w.status === 'blocked').length;
  const wsAtRisk = workstreams.filter(w => w.status === 'at-risk').length;

  const quickActions = [
    { label: '+ Create Task', icon: '✏️', page: 'masterplan' },
    { label: '📋 Master Plan', icon: '', page: 'masterplan' },
    { label: '🏟️ Venue Map', icon: '', page: 'venuemap' },
    { label: '📄 Create Proposal', icon: '', page: 'packages' },
    { label: '💰 Open Pipeline', icon: '', page: 'pipeline' },
    { label: '⏱️ Run of Show', icon: '', page: 'runofshow' },
  ];

  return (
    <div className="page" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div className="live-indicator"><div className="live-dot" />LIVE</div>
            <span style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>GIIS School, Dubai · Day 1 of 3</span>
          </div>
          <h1 className="page-title">Event Command Centre</h1>
          <p className="page-subtitle">QIDS UAE Talent Hunt 2026 — Oct 3, 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('livecommand')}>🚨 Live Status</button>
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('incidents')}>⚠️ Incidents ({openIncidents})</button>
        </div>
      </div>

      {/* Readiness Banner */}
      <div className="card" style={{ marginBottom: 20, background: 'linear-gradient(135deg, rgba(246,145,35,0.08), rgba(246,145,35,0.03))', border: '1px solid rgba(246,145,35,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: readinessColor, lineHeight: 1 }}>{readinessScore}%</div>
              <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)', marginTop: 2 }}>Overall Readiness</div>
            </div>
            <div style={{ width: 1, height: 50, background: 'var(--border)' }} />
            <div style={{ display: 'flex', gap: 20 }}>
              <div style={{ display: 'flex', align: 'center', gap: 6 }}>
                <span style={{ color: 'var(--success)', fontWeight: 700 }}>{wsOnTrack}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--size-sm)' }}>On Track</span>
              </div>
              <div style={{ display: 'flex', align: 'center', gap: 6 }}>
                <span style={{ color: 'var(--warning)', fontWeight: 700 }}>{wsAtRisk}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--size-sm)' }}>At Risk</span>
              </div>
              <div style={{ display: 'flex', align: 'center', gap: 6 }}>
                <span style={{ color: 'var(--danger)', fontWeight: 700 }}>{wsBlocked}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--size-sm)' }}>Blocked</span>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, maxWidth: 400 }}>
            <div className="label-row">
              <span className="label-text">Event Readiness Progress</span>
              <span className="label-value" style={{ color: readinessColor }}>{readinessScore}%</span>
            </div>
            <div className="progress-bar" style={{ height: 8 }}>
              <div className="progress-fill" style={{ width: `${readinessScore}%`, background: readinessColor }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('readiness')}>View Blockers</button>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('masterplan')}>Master Plan</button>
          </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid-stats" style={{ marginBottom: 24 }}>
        <StatCard icon="⚠️" iconClass="danger" label="Open Blockers" value={blockers.filter(b => b.severity === 'critical').length} sub="Critical — need action" />
        <StatCard icon="🕐" iconClass="warning" label="Pending Approvals" value="7" sub="Awaiting sign-off" />
        <StatCard icon="💰" iconClass="brand" label="Commercial Pipeline" value={fmt(pipelineValue)} sub={`${fmt(wonValue)} confirmed`} />
        <StatCard icon="🤝" iconClass="success" label="Confirmed Sponsors" value={confirmedSponsors} sub="Pipeline: 8 active" />
        <StatCard icon="🎟️" iconClass="info" label="Registrations" value={tickets.toLocaleString()} sub={`${Math.round(tickets/ticketTarget*100)}% of ${ticketTarget.toLocaleString()} target`} />
        <StatCard icon="📅" iconClass="purple" label="Days to Event" value="35" sub="Oct 3, 2026" />
        <StatCard icon="🚨" iconClass="danger" label="Active Incidents" value={openIncidents} sub="2 need escalation" />
        <StatCard icon="✅" iconClass="success" label="Tasks Completed" value="48/124" sub="39% completion" />
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

        {/* A. Readiness */}
        <div className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Workstream Readiness</div>
              <div className="section-sub">{workstreams.length} workstreams tracked</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('readiness')}>View All →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {workstreams.slice(0, 6).map(ws => (
              <div key={ws.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 130, flexShrink: 0 }}>
                  <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-primary)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ws.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{ws.owner.split(' ')[0]}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${ws.progress}%`, background: ws.status === 'on-track' ? 'var(--success)' : ws.status === 'blocked' ? 'var(--danger)' : 'var(--warning)' }} />
                  </div>
                </div>
                <div style={{ width: 36, textAlign: 'right', fontSize: 'var(--size-sm)', fontWeight: 600, color: ws.status === 'on-track' ? 'var(--success)' : ws.status === 'blocked' ? 'var(--danger)' : 'var(--warning)' }}>{ws.progress}%</div>
                <span className={`badge badge-${ws.status === 'on-track' ? 'success' : ws.status === 'blocked' ? 'danger' : 'warning'}`} style={{ fontSize: 9 }}>
                  {ws.status === 'on-track' ? 'On Track' : ws.status === 'blocked' ? 'Blocked' : 'At Risk'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* B. Commercial */}
        <div className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Commercial Overview</div>
              <div className="section-sub">Pipeline & sponsor activity</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('pipeline')}>Pipeline →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div style={{ background: 'var(--brand-dim)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>Total Pipeline</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--brand)' }}>{fmt(pipelineValue)}</div>
            </div>
            <div style={{ background: 'var(--success-dim)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>Won / Confirmed</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--success)' }}>{fmt(wonValue)}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {pipeline.filter(p => p.stage !== 'Lost').slice(0, 4).map(opp => (
              <div key={opp.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'var(--surface-raised)', borderRadius: 8 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 'var(--size-md)', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{opp.sponsor}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{opp.package} • {opp.stall}</div>
                </div>
                <div style={{ fontSize: 'var(--size-md)', fontWeight: 600, color: 'var(--brand)', flexShrink: 0 }}>{fmt(opp.value)}</div>
                <span className={`badge badge-${opp.stage === 'Won' ? 'success' : opp.stage === 'Negotiation' || opp.stage === 'Proposal Sent' ? 'warning' : 'neutral'}`} style={{ fontSize: 9 }}>{opp.stage}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary btn-sm w-full" onClick={() => onNavigate('venuemap')}>🏟️ Venue Map</button>
            <button className="btn btn-primary btn-sm w-full" onClick={() => onNavigate('packages')}>+ Build Package</button>
          </div>
        </div>

        {/* C. Critical Blockers */}
        <div className="card" style={{ border: '1px solid rgba(239,68,68,0.2)', background: 'linear-gradient(135deg, rgba(239,68,68,0.04), transparent)' }}>
          <div className="section-header">
            <div>
              <div className="section-title" style={{ color: 'var(--danger)' }}>⚠️ Critical Blockers</div>
              <div className="section-sub">{blockers.length} blockers require immediate action</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('readiness')}>Manage →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {blockers.map(b => (
              <div key={b.id} style={{ padding: '10px 12px', background: 'var(--surface-raised)', borderRadius: 10, borderLeft: `3px solid ${b.severity === 'critical' ? 'var(--danger)' : 'var(--warning)'}` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 'var(--size-sm)', fontWeight: 600, color: b.severity === 'critical' ? 'var(--danger)' : 'var(--warning)', marginBottom: 3 }}>{b.workstream}</div>
                    <div style={{ fontSize: 'var(--size-md)', color: 'var(--text-primary)' }}>{b.issue}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 4 }}>Owner: {b.owner} · {b.daysOpen}d open</div>
                  </div>
                  <span className={`badge badge-${b.severity === 'critical' ? 'danger' : 'warning'}`} style={{ fontSize: 9 }}>{b.severity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* D. Upcoming Milestones */}
        <div className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Upcoming Milestones</div>
              <div className="section-sub">Key deadlines ahead</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < milestones.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <div style={{ width: 52, flexShrink: 0, textAlign: 'center', padding: '4px 6px', background: m.status === 'overdue' ? 'var(--danger-dim)' : m.status === 'event' ? 'var(--brand-dim)' : 'var(--surface-raised)', borderRadius: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: m.status === 'overdue' ? 'var(--danger)' : m.status === 'event' ? 'var(--brand)' : 'var(--text-secondary)' }}>{m.date}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--size-md)', fontWeight: 500, color: 'var(--text-primary)' }}>{m.name}</div>
                </div>
                <span className={`badge badge-${m.status === 'overdue' ? 'danger' : m.status === 'event' ? 'brand' : 'neutral'}`} style={{ fontSize: 9 }}>
                  {m.status === 'overdue' ? 'OVERDUE' : m.status === 'event' ? 'EVENT DAY' : 'Upcoming'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Live Ops + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Live Ops */}
        <div className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Live Operations</div>
              <div className="section-sub">Current event status</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('livecommand')}>Live View →</button>
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, background: 'var(--success-dim)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 10, padding: '10px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>Event Status</div>
              <div style={{ color: 'var(--success)', fontWeight: 700, fontSize: 16 }}>🟢 On Track</div>
            </div>
            <div style={{ flex: 1, background: 'var(--warning-dim)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 10, padding: '10px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>Active Incidents</div>
              <div style={{ color: 'var(--warning)', fontWeight: 700, fontSize: 22 }}>{openIncidents}</div>
            </div>
          </div>
          <div style={{ padding: '10px 12px', background: 'var(--surface-raised)', borderRadius: 10, marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>CURRENT ACTIVITY</div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>10:00 — Opening Ceremony</div>
            <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>Main Stage · Owner: Harshad Shah</div>
          </div>
          <div style={{ padding: '10px 12px', background: 'var(--surface-raised)', borderRadius: 10 }}>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>NEXT ACTIVITY</div>
            <div style={{ fontWeight: 600, color: 'var(--brand)', marginTop: 2 }}>10:45 — Keynote: Future of Media in MENA</div>
            <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>Ahmed Al-Khalifa · Main Stage</div>
          </div>
          {openIncidents > 0 && (
            <button className="btn btn-danger btn-sm w-full" style={{ marginTop: 12 }} onClick={() => onNavigate('incidents')}>
              ⚠️ {openIncidents} Active Incidents — View Now
            </button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="section-header">
            <div className="section-title">Quick Actions</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {quickActions.map((a, i) => (
              <button
                key={i}
                className="btn btn-ghost"
                style={{ justifyContent: 'flex-start', padding: '14px 16px', borderRadius: 10, fontSize: 'var(--size-md)', fontWeight: 600, gap: 8 }}
                onClick={() => onNavigate(a.page)}
              >
                {a.label}
              </button>
            ))}
          </div>

          {/* Ticket progress */}
          <div style={{ marginTop: 20 }}>
            <div className="label-row">
              <span className="label-text">Ticket / Registration Progress</span>
              <span className="label-value">{tickets.toLocaleString()} / {ticketTarget.toLocaleString()}</span>
            </div>
            <div className="progress-bar" style={{ height: 6, marginTop: 6 }}>
              <div className="progress-fill" style={{ width: `${Math.round(tickets/ticketTarget*100)}%` }} />
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 4 }}>{Math.round(tickets/ticketTarget*100)}% of target · {(ticketTarget - tickets).toLocaleString()} remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
}
