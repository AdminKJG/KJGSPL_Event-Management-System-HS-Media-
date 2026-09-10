import React, { useState } from 'react';
import { events } from '../../data/eventList';

export default function EventHub({ user, onLogout, onSelectEvent }) {
  const [eventList, setEventList] = useState(events);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    type: 'Kids Talent & Education',
    date: 'Nov 14-16, 2026',
    location: 'Dubai World Trade Centre, UAE',
    expectedAudience: '15,000 Attendees',
    revenueTarget: 'AED 1,800,000',
    budgetAllocated: 'AED 650,000',
    director: 'Harshad Shah',
    client: 'HS Media World',
    status: 'planning',
    coverColor: '#F69123',
    objectives: 'Drive student talent discovery and scale regional brand sponsorships.',
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.name) return;
    const created = {
      id: `evt-${eventList.length + 1}`,
      name: newEvent.name,
      date: newEvent.date,
      location: newEvent.location,
      status: newEvent.status,
      coverColor: newEvent.coverColor,
      metrics: {
        readiness: '45%',
        revenue: newEvent.revenueTarget,
        tickets: '1,200 / 15,000',
      },
    };
    setEventList(prev => [created, ...prev]);
    setShowCreateModal(false);
    setNewEvent({
      name: '',
      type: 'Kids Talent & Education',
      date: 'Nov 14-16, 2026',
      location: 'Dubai World Trade Centre, UAE',
      expectedAudience: '15,000 Attendees',
      revenueTarget: 'AED 1,800,000',
      budgetAllocated: 'AED 650,000',
      director: 'Harshad Shah',
      client: 'HS Media World',
      status: 'planning',
      coverColor: '#F69123',
      objectives: 'Drive student talent discovery and scale regional brand sponsorships.',
    });
  };

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 14 }}>
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: 6 }}>Your Events</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Select an event to open the Command Centre, or create a new event schema.</p>
            </div>
            <button className="btn btn-primary" onClick={() => setShowCreateModal(true)} style={{ padding: '12px 20px', fontSize: 14, fontWeight: 700 }}>
              + Create New Event
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {eventList.map(evt => (
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

      {/* Create New Event Form Modal */}
      {showCreateModal && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal" style={{ maxWidth: 660, maxHeight: '90vh', padding: 24 }}>
            <div className="modal-header" style={{ marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>
                    Create New Event Master Form
                  </span>
                  <span className="badge badge-brand" style={{ fontSize: 10 }}>Event Schema</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                  Define core parameters, budget ceilings, venue location & audience metrics.
                </p>
              </div>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Section 1: Basic Event Identity */}
              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
                  1. Event Identity & Scope
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Event Title *</label>
                    <input className="input" value={newEvent.name} onChange={e => setNewEvent({ ...newEvent, name: e.target.value })} placeholder="e.g. UAE Youth Coding Summit 2026" required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Event Category *</label>
                    <select className="select" value={newEvent.type} onChange={e => setNewEvent({ ...newEvent, type: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="Kids Talent & Education">Kids Talent & Education</option>
                      <option value="Corporate Festival">Corporate Festival</option>
                      <option value="Tech Summit & Expo">Tech Summit & Expo</option>
                      <option value="Sports & Fitness">Sports & Fitness Championship</option>
                      <option value="Music & Cultural">Music & Cultural Awards</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Dates / Duration *</label>
                    <input className="input" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} placeholder="e.g. Oct 3-5, 2026" required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Venue / City *</label>
                    <input className="input" value={newEvent.location} onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} placeholder="e.g. DWTC, Dubai" required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Initial Status</label>
                    <select className="select" value={newEvent.status} onChange={e => setNewEvent({ ...newEvent, status: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="planning">Planning Phase</option>
                      <option value="active">Active Execution</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Financials & Demographics */}
              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
                  2. Financial Targets & Attendance Metrics
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Target Revenue (AED) *</label>
                    <input className="input" value={newEvent.revenueTarget} onChange={e => setNewEvent({ ...newEvent, revenueTarget: e.target.value })} placeholder="AED 2,500,000" required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Budget Ceiling (AED) *</label>
                    <input className="input" value={newEvent.budgetAllocated} onChange={e => setNewEvent({ ...newEvent, budgetAllocated: e.target.value })} placeholder="AED 800,000" required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Expected Attendance *</label>
                    <input className="input" value={newEvent.expectedAudience} onChange={e => setNewEvent({ ...newEvent, expectedAudience: e.target.value })} placeholder="10,000 Attendees" required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                </div>
              </div>

              {/* Section 3: Governance & Objectives */}
              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
                  3. Leadership & Strategic Objectives
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Event Lead / Director</label>
                    <input className="input" value={newEvent.director} onChange={e => setNewEvent({ ...newEvent, director: e.target.value })} placeholder="Lead Name" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Primary Client / Brand</label>
                    <input className="input" value={newEvent.client} onChange={e => setNewEvent({ ...newEvent, client: e.target.value })} placeholder="e.g. HS Media" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Primary Strategic Objectives</label>
                  <textarea className="input" rows={2} value={newEvent.objectives} onChange={e => setNewEvent({ ...newEvent, objectives: e.target.value })} style={{ resize: 'none', padding: '8px 10px', fontSize: 13 }} />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '9px 24px', fontWeight: 700 }}>
                  Create & Initialize Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

