import React from 'react';
import { events } from '../../data/eventList';

export default function EventHub({ user, onLogout, onSelectEvent }) {
  return (
    <div style={{
      minHeight: '100vh', width: '100vw', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* TopBar minimal */}
      <header style={{
        height: 'var(--topbar-h)', background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/hs-logoo-new-scaled.webp" alt="HS" style={{ height: 26, objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(246,145,35,0.3))' }} />
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>HS Events Platform</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="avatar" style={{ width: 28, height: 28, fontSize: 10 }}>{user?.avatar}</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name}</span>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onLogout}>Sign out</button>
        </div>
      </header>

      {/* Main */}
      <div style={{ flex: 1, padding: '48px 32px', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1000 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: 6 }}>Your Events</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Select an event to open the Command Centre, or create a new one.</p>
            </div>
            <button className="btn btn-primary" style={{ padding: '12px 20px', fontSize: 14 }}>
              + Create New Event
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {events.map(evt => (
              <div
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="card card-interactive"
                style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                {/* Cover block */}
                <div style={{ height: 80, background: `linear-gradient(135deg, ${evt.coverColor} 0%, rgba(0,0,0,0.4) 100%)`, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 12, right: 12 }}>
                    <span className={`badge ${evt.status === 'active' ? 'badge-success' : evt.status === 'planning' ? 'badge-warning' : 'badge-neutral'}`} style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                      {evt.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.3 }}>{evt.name}</h3>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4, display: 'flex', gap: 6, alignItems: 'center' }}>
                    📅 {evt.date}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, display: 'flex', gap: 6, alignItems: 'center' }}>
                    📍 {evt.location}
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', gap: 16, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                    {user?.roleId === 'operations' ? (
                      <>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Readiness</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>{evt.metrics.readiness}</div>
                        </div>
                        <div style={{ width: 1, background: 'var(--border)' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Vendors</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>14 Active</div>
                        </div>
                      </>
                    ) : user?.roleId === 'marketing' ? (
                      <>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Registrations</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>{evt.metrics.tickets}</div>
                        </div>
                        <div style={{ width: 1, background: 'var(--border)' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Campaigns</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>3 Live</div>
                        </div>
                      </>
                    ) : user?.roleId === 'commercial' ? (
                      <>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Revenue</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--brand)' }}>{evt.metrics.revenue}</div>
                        </div>
                        <div style={{ width: 1, background: 'var(--border)' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Stalls Booked</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>14/15</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Readiness</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>{evt.metrics.readiness}</div>
                        </div>
                        <div style={{ width: 1, background: 'var(--border)' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Revenue</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--brand)' }}>{evt.metrics.revenue}</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
