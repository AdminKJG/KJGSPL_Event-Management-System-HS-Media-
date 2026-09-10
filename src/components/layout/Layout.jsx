import React, { Suspense, useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100%', gap: 10, color: 'var(--text-secondary)', fontSize: 13,
    }}>
      <div style={{ width: 18, height: 18, border: '2px solid var(--border)', borderTop: '2px solid var(--brand)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      Loading…
    </div>
  );
}

export default function Layout({ active, onNavigate, user, onLogout, event, onBackToHub, children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleNavigate = (pageId, params) => {
    setMobileSidebarOpen(false);
    onNavigate(pageId, params);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: 'var(--bg)', position: 'relative' }}>
      {/* Mobile Drawer Overlay Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 998,
            background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)',
            transition: 'opacity 0.2s ease',
          }}
          className="mobile-backdrop"
        />
      )}

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <Sidebar
        active={active}
        onNavigate={handleNavigate}
        event={event}
        onBackToHub={onBackToHub}
        user={user}
        isMobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Pane */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        <TopBar
          active={active}
          onNavigate={handleNavigate}
          user={user}
          onLogout={onLogout}
          event={event}
          onToggleMobileSidebar={() => setMobileSidebarOpen(prev => !prev)}
        />
        <main style={{ flex: 1, overflow: 'auto', background: 'var(--bg)' }}>
          <Suspense fallback={<PageLoader />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
