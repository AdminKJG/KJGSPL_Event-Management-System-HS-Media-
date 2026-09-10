import React from 'react';

// ─── Clean SVG Icon Set ───────────────────────────────
const Icons = {
  home: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  brief: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  plan: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  check: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  map: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,
  package: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  proposal: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  pipeline: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  campaign: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  creator: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  programme: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  vendor: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  clock: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  live: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  alert: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  chart: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
};

const navSections = [
  {
    items: [
      { id: 'dashboard', label: 'Command Centre', icon: Icons.home },
    ],
  },
  {
    group: 'Event Planning',
    items: [
      { id: 'brief', label: 'Event Brief', icon: Icons.brief },
      { id: 'masterplan', label: 'Master Plan', icon: Icons.plan },
      { id: 'readiness', label: 'Readiness', icon: Icons.check, badge: '4', badgeType: 'danger' },
    ],
  },
  {
    group: 'Commercial',
    items: [
      { id: 'venuemap', label: 'Venue Map', icon: Icons.map },
      { id: 'packages', label: 'Package Builder', icon: Icons.package },
      { id: 'proposals', label: 'Proposals', icon: Icons.proposal },
      { id: 'pipeline', label: 'Pipeline', icon: Icons.pipeline },
    ],
  },
  {
    group: 'Marketing & Talent',
    items: [
      { id: 'campaigns', label: 'Campaigns', icon: Icons.campaign },
      { id: 'creators', label: 'Creators', icon: Icons.creator },
      { id: 'programme', label: 'Programme', icon: Icons.programme },
    ],
  },
  {
    group: 'Operations',
    items: [
      { id: 'vendors', label: 'Vendors', icon: Icons.vendor },
    ],
  },
  {
    group: 'Live Operations',
    items: [
      { id: 'runofshow', label: 'Run of Show', icon: Icons.clock },
      { id: 'livecommand', label: 'Live Command', icon: Icons.live, badge: 'LIVE', badgeType: 'danger' },
      { id: 'incidents', label: 'Incidents', icon: Icons.alert, badge: '2', badgeType: 'warning' },
    ],
  },
  {
    group: 'Post Event',
    items: [
      { id: 'closure', label: 'Closure Dashboard', icon: Icons.chart },
    ],
  },
];

export default function Sidebar({ active, onNavigate, event, user, isMobileOpen, onCloseMobile }) {
  const allowedGroups = {
    director: ['Command Centre', 'Event Planning', 'Commercial', 'Marketing & Talent', 'Operations', 'Live Operations', 'Post Event'],
    commercial: ['Command Centre', 'Commercial'],
    operations: ['Command Centre', 'Event Planning', 'Operations', 'Live Operations', 'Post Event'],
    marketing: ['Command Centre', 'Marketing & Talent'],
  };

  const roleGroups = allowedGroups[user?.roleId] || allowedGroups.director;
  const filteredNav = navSections.filter(sec => roleGroups.includes(sec.group || 'Command Centre'));

  return (
    <aside
      className={`app-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}
      style={{
        width: 'var(--sidebar-w)', minWidth: 'var(--sidebar-w)',
        height: '100vh', background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        flexShrink: 0, zIndex: 999,
      }}
    >
      {/* Brand Logo Header */}
      <div
        style={{
          padding: '16px 14px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div
          onClick={() => onNavigate && onNavigate('dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            flex: 1,
            minWidth: 0,
          }}
          title="Go to Command Centre"
        >
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(246,145,35,0.12)', border: '1.5px solid rgba(246,145,35,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(246,145,35,0.15)'
          }}>
            <img src="/hs-logoo-new-scaled.webp" alt="HS" style={{ width: 28, height: 28, objectFit: 'contain' }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px', lineHeight: 1.15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              HS Media World
            </div>
          
          </div>
        </div>

        {/* Mobile close button */}
        {onCloseMobile && (
          <button
            className="mobile-sidebar-close"
            onClick={onCloseMobile}
            style={{
              background: 'var(--surface-3)', border: '1px solid var(--border)',
              color: 'var(--text-secondary)', borderRadius: 6, width: 28, height: 28,
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredNav.map((section, si) => (
          <div key={si}>
            {section.group && (
              <div style={{
                fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)',
                textTransform: 'uppercase', letterSpacing: '0.09em',
                padding: '12px 8px 5px', opacity: 0.55,
              }}>
                {section.group}
              </div>
            )}
            {section.items.map(item => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 9,
                    padding: '8px 10px', borderRadius: 8,
                    background: isActive ? 'rgba(246,145,35,0.10)' : 'transparent',
                    color: isActive ? 'var(--brand)' : 'var(--text-secondary)',
                    border: 'none', width: '100%', textAlign: 'left',
                    cursor: 'pointer', transition: 'all 120ms ease',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: 13,
                    position: 'relative',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'var(--surface-3)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
                >
                  {/* Active bar */}
                  {isActive && (
                    <div style={{ position: 'absolute', left: 0, top: 6, bottom: 6, width: 3, background: 'var(--brand)', borderRadius: '0 3px 3px 0' }} />
                  )}
                  <span style={{ flexShrink: 0, opacity: isActive ? 1 : 0.7, display: 'flex', alignItems: 'center' }}>
                    {item.icon}
                  </span>
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span style={{
                      fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 99,
                      background: item.badgeType === 'danger' ? 'var(--danger-dim)' : 'var(--warning-dim)',
                      color: item.badgeType === 'danger' ? 'var(--danger)' : 'var(--warning)',
                      border: `1px solid ${item.badgeType === 'danger' ? 'var(--danger-border)' : 'var(--warning-border)'}`,
                      flexShrink: 0,
                    }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer / Current Event Info */}
      <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: event?.status === 'active' ? 'var(--success)' : 'var(--warning)', animation: event?.status === 'active' ? 'blink 2s ease-in-out infinite' : 'none', flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event?.name || 'Loading Event...'}</div>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event?.date}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
