import React from 'react';
import { postEventData } from '../../data/marketingData';

const fmt = (n) => n >= 1000000 ? `AED ${(n/1000000).toFixed(2)}M` : n >= 1000 ? `AED ${(n/1000).toFixed(0)}K` : `AED ${n.toLocaleString()}`;

export default function ClosureDashboard() {
  const d = postEventData;
  const revenueAchieved = Math.round((d.revenue.total / d.revenue.target) * 100);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Post-Event Closure Dashboard</h1>
          <p className="page-subtitle">QIDS UAE Talent Hunt 2026 — Oct 17, 2026 · Event concluded</p>
        </div>
        <button className="btn btn-primary btn-sm">Download Report</button>
      </div>

      {/* Hero KPIs */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Attendance', value: d.attendance.total.toLocaleString(), sub: `Target: ${d.attendance.target.toLocaleString()}`, iconClass: 'info', icon: '👥' },
          { label: 'Total Revenue', value: fmt(d.revenue.total), sub: `${revenueAchieved}% of target`, iconClass: 'brand', icon: '💰' },
          { label: 'NPS Score', value: `${d.nps}`, sub: 'Net Promoter Score', iconClass: 'success', icon: '⭐' },
          { label: 'Campaign Reach', value: `${(d.campaignReach/1000).toFixed(0)}K`, sub: 'Total audience reached', iconClass: 'purple', icon: '📣' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span className={`stat-icon ${s.iconClass}`}>{s.icon}</span>
            </div>
            <div className="stat-value" style={{ fontSize: 28 }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        {/* Revenue breakdown */}
        <div className="card">
          <div className="section-title" style={{ marginBottom: 16 }}>Revenue Breakdown</div>
          <div style={{ marginBottom: 12 }}>
            <div className="label-row">
              <span className="label-text">vs Target</span>
              <span className="label-value" style={{ color: revenueAchieved >= 100 ? 'var(--success)' : 'var(--warning)' }}>{revenueAchieved}%</span>
            </div>
            <div className="progress-bar" style={{ height: 8 }}><div className="progress-fill" style={{ width: `${Math.min(revenueAchieved, 100)}%`, background: 'var(--success)' }} /></div>
          </div>
          {[
            { label: 'Sponsorships', value: d.revenue.sponsorships, color: 'var(--brand)' },
            { label: 'Ticket Sales', value: d.revenue.tickets, color: 'var(--info)' },
            { label: 'Exhibition', value: d.revenue.exhibition, color: 'var(--purple)' },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: 'var(--size-md)', color: 'var(--text-secondary)' }}>{r.label}</span>
              <span style={{ fontWeight: 700, color: r.color }}>{fmt(r.value)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontWeight: 800, fontSize: 18 }}>
            <span>Total</span>
            <span style={{ color: 'var(--brand)' }}>{fmt(d.revenue.total)}</span>
          </div>
        </div>

        {/* Sponsor performance */}
        <div className="card">
          <div className="section-title" style={{ marginBottom: 16 }}>Sponsor Performance</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {d.sponsorPerformance.map(s => (
              <div key={s.sponsor} style={{ padding: '10px 12px', background: 'var(--surface-raised)', borderRadius: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{s.sponsor}</div>
                  <span className={`badge badge-${s.status === 'exceeded' ? 'success' : 'brand'}`}>{s.status === 'exceeded' ? '🏆 Exceeded' : '✓ Met'}</span>
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>
                  <span>{s.package}</span>
                  <span style={{ color: 'var(--brand)', fontWeight: 600 }}>{fmt(s.value)}</span>
                  <span>💼 {s.leads} leads</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Incidents & Follow-ups */}
      <div className="grid-2">
        <div className="card">
          <div className="section-title" style={{ marginBottom: 16 }}>Incident Summary</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <div style={{ textAlign: 'center', padding: '14px', background: 'var(--surface-raised)', borderRadius: 10 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)' }}>{d.incidents.total}</div>
              <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>Total</div>
            </div>
            <div style={{ textAlign: 'center', padding: '14px', background: 'var(--success-dim)', borderRadius: 10 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--success)' }}>{d.incidents.resolved}</div>
              <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>Resolved</div>
            </div>
            <div style={{ textAlign: 'center', padding: '14px', background: 'var(--brand-dim)', borderRadius: 10 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--brand)' }}>{d.incidents.avgResolutionTime}</div>
              <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>Avg Resolution</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="section-title" style={{ marginBottom: 16 }}>Follow-ups Required</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {d.followUps.map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--surface-raised)', borderRadius: 10, gap: 10 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 'var(--size-sm)' }}>{f.stakeholder}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.action}</div>
                </div>
                <span className={`badge badge-${f.status === 'pending' ? 'warning' : 'success'}`} style={{ fontSize: 9 }}>{f.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
