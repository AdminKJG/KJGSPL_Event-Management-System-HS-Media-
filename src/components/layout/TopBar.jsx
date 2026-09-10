import React, { useState } from 'react';
import AiCopilotModal from '../common/AiCopilotModal';

const pageTitles = {
  dashboard: { title: 'Event Command Centre', sub: 'QIDS UAE Talent Hunt 2026' },
  brief: { title: 'Event Brief', sub: 'Event overview, objectives and stakeholders' },
  masterplan: { title: 'Master Plan', sub: 'Workstreams, tasks and timelines' },
  readiness: { title: 'Readiness & Blockers', sub: 'Workstream health and critical blockers' },
  venuemap: { title: 'Venue Map', sub: 'Interactive floor plan — GIIS School, Dubai' },
  packages: { title: 'Package Builder', sub: 'Build and price custom sponsor packages' },
  proposals: { title: 'Proposals', sub: 'Sponsor proposals and documents' },
  pipeline: { title: 'Commercial Pipeline', sub: 'Sponsor opportunity pipeline' },
  campaigns: { title: 'Campaigns', sub: 'Marketing campaign calendar and performance' },
  creators: { title: 'Creator Intelligence', sub: 'Creator shortlist and engagement data' },
  programme: { title: 'Programme & Talent', sub: 'Sessions, speakers and performers' },
  vendors: { title: 'Vendor Control', sub: 'Vendor contracts, payments and delivery' },
  runofshow: { title: 'Run of Show', sub: 'Day-of event timeline' },
  livecommand: { title: 'Live Command Centre', sub: 'Real-time event status' },
  incidents: { title: 'Incident Management', sub: 'Create, assign, escalate and resolve incidents' },
  closure: { title: 'Post-Event Closure', sub: 'Outcomes, follow-ups and retrospective' },
};

export default function TopBar({ active, onNavigate, user, onLogout, event, onToggleMobileSidebar }) {
  const [search, setSearch] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const info = pageTitles[active] || pageTitles.dashboard;

  return (
    <>
      <header style={{
        height: 'var(--topbar-h)', background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', flexShrink: 0, gap: 12,
      }}>
        {/* Left: Mobile hamburger + Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          {/* Mobile hamburger button */}
          <button
            className="mobile-hamburger-btn"
            onClick={onToggleMobileSidebar}
            aria-label="Toggle navigation menu"
            style={{
              background: 'var(--surface-3)', border: '1px solid var(--border)',
              borderRadius: 8, width: 34, height: 34, display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)',
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{ fontSize: 11, color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500, transition: 'color 120ms', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}
                onClick={() => onNavigate('dashboard')}
                onMouseEnter={e => e.target.style.color = 'var(--brand)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >
                {event?.name || 'QIDS UAE 2026'}
              </span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-secondary)', opacity: 0.4 }}><polyline points="9 18 15 12 9 6" /></svg>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{info.title}</span>
            </div>
            <div className="topbar-subtitle" style={{ fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 350 }}>
              {info.sub}
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {/* AI Copilot Sparkle Button */}
          <button
            onClick={() => setIsAiModalOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'linear-gradient(135deg, rgba(246, 145, 35, 0.2), rgba(246, 145, 35, 0.05))',
              border: '1.5px solid rgba(246, 145, 35, 0.4)',
              borderRadius: 99, padding: '5px 12px', color: 'var(--brand)',
              fontSize: 12, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 0 12px rgba(246, 145, 35, 0.15)',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.borderColor = 'var(--brand)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(246, 145, 35, 0.4)'; }}
          >
            <span style={{ fontSize: 14 }}>✨</span>
            <span className="ai-btn-text">AI Copilot</span>
          </button>

          {/* Search (Collapsible on mobile) */}
          <div className="topbar-search" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--surface-3)', border: '1px solid var(--border)',
            borderRadius: 99, padding: '6px 12px',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-secondary)', flexShrink: 0 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text" placeholder="Search event…"
              value={search} onChange={e => setSearch(e.target.value)}
              style={{
                background: 'none', border: 'none', outline: 'none',
                fontSize: 12, color: 'var(--text-primary)', fontFamily: 'var(--font)',
                width: 110,
              }}
            />
          </div>

          {/* User profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'var(--brand-dim)', border: '1.5px solid var(--border-brand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 800, color: 'var(--brand)', flexShrink: 0,
            }}>
              {user?.avatar || 'HS'}
            </div>
            <div className="topbar-user-info" style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{user?.name || 'Harshad Shah'}</span>
              <span style={{ fontSize: 10, color: 'var(--text-secondary)', lineHeight: 1 }}>{user?.role || 'Director'}</span>
            </div>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              style={{
                padding: '5px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600,
                background: 'transparent', border: '1px solid var(--border)',
                color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font)',
                transition: 'all 120ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--danger)'; e.currentTarget.style.borderColor = 'var(--danger-border)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              Sign out
            </button>
          )}
        </div>
      </header>

      {/* Global AI Copilot Modal */}
      <AiCopilotModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </>
  );
}
