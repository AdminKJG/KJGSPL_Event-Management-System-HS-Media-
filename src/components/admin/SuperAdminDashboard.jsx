import React, { useState } from 'react';

// Initial Mock Data
const INITIAL_USERS = [
  { id: 1, name: 'Harshad Shah', email: 'harshad@hsmediaworld.com', role: 'Event Director', status: 'Active' },
  { id: 2, name: 'Priya Mehta', email: 'priya@hsmediaworld.com', role: 'Commercial Director', status: 'Active' },
  { id: 3, name: 'Tariq Al-Fayed', email: 'tariq@hsmediaworld.com', role: 'Operations Manager', status: 'Active' },
  { id: 4, name: 'Sarah Jones', email: 'sarah@hsmediaworld.com', role: 'Marketing Head', status: 'Active' },
  { id: 5, name: 'Master Admin', email: 'admin@hsmediaworld.com', role: 'System Administrator', status: 'Active' },
];

const INITIAL_VENUES = [
  { id: 1, name: 'GIIS School, Dubai', city: 'Dubai', capacity: '15,000', status: 'Verified' },
  { id: 2, name: 'Coca-Cola Arena', city: 'Dubai', capacity: '17,000', status: 'Verified' },
  { id: 3, name: 'Atlantis The Royal', city: 'Dubai', capacity: '2,500', status: 'Verified' },
];

const INITIAL_EVENTS = [
  { id: 'E1', name: 'KIDS ICONS UAE CHOTE KALAKAR', director: 'Harshad Shah', date: 'Oct 3, 2026', status: 'Active' },
];

const INITIAL_LOGS = [
  { id: 101, user: 'Priya Mehta', action: 'Updated Sponsorship Tier', target: 'Global Tech Awards', time: '10 mins ago', severity: 'low' },
  { id: 102, user: 'Tariq Al-Fayed', action: 'Resolved Incident INC-402', target: 'Command Centre', time: '1 hour ago', severity: 'medium' },
  { id: 103, user: 'Harshad Shah', action: 'Created New Event', target: 'Esports Championship', time: '2 hours ago', severity: 'low' },
  { id: 104, user: 'System', action: 'Failed Login Attempt', target: 'admin@hsmedia.com', time: '5 hours ago', severity: 'high' },
];

const Icons = {
  users: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  venue: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  event: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  settings: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  audit: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
};

export default function SuperAdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('users');
  
  // State
  const [users, setUsers] = useState(INITIAL_USERS);
  const [venues, setVenues] = useState(INITIAL_VENUES);
  const [events, setEvents] = useState(INITIAL_EVENTS);

  // Modals
  const [activeModal, setActiveModal] = useState(null); // 'user', 'venue', 'event'
  const [formData, setFormData] = useState({});

  const navItems = [
    { id: 'users', label: 'User Management', icon: Icons.users, group: 'Master Data' },
    { id: 'venues', label: 'Venue Master', icon: Icons.venue, group: 'Master Data' },
    { id: 'events', label: 'Event Master', icon: Icons.event, group: 'Master Data' },
    { id: 'settings', label: 'Global Settings', icon: Icons.settings, group: 'Master Data' },
    { id: 'audit', label: 'Audit Logs', icon: Icons.audit, group: 'Security & Platform' },
  ];

  const handleSaveUser = (e) => {
    e.preventDefault();
    setUsers([...users, { id: Date.now(), name: formData.name, email: formData.email, role: formData.role, status: 'Active' }]);
    setActiveModal(null);
    setFormData({});
  };

  const handleSaveVenue = (e) => {
    e.preventDefault();
    setVenues([...venues, { id: Date.now(), name: formData.name, city: formData.city, capacity: formData.capacity, status: 'Verified' }]);
    setActiveModal(null);
    setFormData({});
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    setEvents([...events, { id: 'E' + Date.now(), name: formData.name, director: formData.director, date: formData.date, status: 'Draft' }]);
    setActiveModal(null);
    setFormData({});
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* TopBar */}
      <header style={{
        height: 'var(--topbar-h)', background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>System Administration</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="avatar" style={{ width: 28, height: 28, fontSize: 10 }}>{user?.avatar}</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name} (Admin)</span>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onLogout}>Sign out</button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <aside style={{
          width: 'var(--sidebar-w)', minWidth: 'var(--sidebar-w)',
          height: '100%', background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', overflowY: 'auto',
          flexShrink: 0, padding: '10px 10px', gap: 2
        }}>
          {['Master Data', 'Security & Platform'].map(group => (
            <div key={group}>
              <div style={{
                fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)',
                textTransform: 'uppercase', letterSpacing: '0.09em',
                padding: '12px 8px 5px', opacity: 0.55,
              }}>
                {group}
              </div>
              {navItems.filter(item => item.group === group).map(item => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
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
                    {isActive && (
                      <div style={{ position: 'absolute', left: 0, top: 6, bottom: 6, width: 3, background: 'var(--brand)', borderRadius: '0 3px 3px 0' }} />
                    )}
                    <span style={{ flexShrink: 0, opacity: isActive ? 1 : 0.7, display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                    </span>
                    <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        {/* Content */}
        <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', paddingBottom: 64 }}>
            
            {activeTab === 'users' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>User Management</h2>
                  <button className="btn btn-primary" onClick={() => setActiveModal('user')} style={{ padding: '8px 16px', fontSize: 13 }}>+ Add User</button>
                </div>
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'var(--surface-3)', borderBottom: '1px solid var(--border)' }}>
                        <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Name</th>
                        <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Email</th>
                        <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Role</th>
                        <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '16px 20px', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</td>
                          <td style={{ padding: '16px 20px', fontSize: 13, color: 'var(--text-secondary)' }}>{u.email}</td>
                          <td style={{ padding: '16px 20px', fontSize: 13, color: 'var(--text-primary)' }}>{u.role}</td>
                          <td style={{ padding: '16px 20px' }}>
                            <span className={`badge ${u.status === 'Active' ? 'badge-success' : 'badge-neutral'}`}>{u.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'venues' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Venue Master</h2>
                  <button className="btn btn-primary" onClick={() => setActiveModal('venue')} style={{ padding: '8px 16px', fontSize: 13 }}>+ Add Venue</button>
                </div>
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'var(--surface-3)', borderBottom: '1px solid var(--border)' }}>
                        <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Venue Name</th>
                        <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>City</th>
                        <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Capacity</th>
                        <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {venues.map(v => (
                        <tr key={v.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '16px 20px', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{v.name}</td>
                          <td style={{ padding: '16px 20px', fontSize: 13, color: 'var(--text-secondary)' }}>{v.city}</td>
                          <td style={{ padding: '16px 20px', fontSize: 13, color: 'var(--text-primary)' }}>{v.capacity}</td>
                          <td style={{ padding: '16px 20px' }}>
                            <span className="badge badge-success">{v.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Event Master</h2>
                  <button className="btn btn-primary" onClick={() => setActiveModal('event')} style={{ padding: '8px 16px', fontSize: 13 }}>+ Create Event</button>
                </div>
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'var(--surface-3)', borderBottom: '1px solid var(--border)' }}>
                        <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Event Name</th>
                        <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Director</th>
                        <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Date</th>
                        <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map(e => (
                        <tr key={e.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '16px 20px', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{e.name}</td>
                          <td style={{ padding: '16px 20px', fontSize: 13, color: 'var(--text-secondary)' }}>{e.director}</td>
                          <td style={{ padding: '16px 20px', fontSize: 13, color: 'var(--text-secondary)' }}>{e.date}</td>
                          <td style={{ padding: '16px 20px' }}>
                            <span className={`badge ${e.status === 'Active' ? 'badge-success' : e.status === 'Planning' ? 'badge-warning' : 'badge-neutral'}`}>{e.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Global Settings</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>System-wide configurations and API integrations.</p>
                </div>
                <div className="card">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Default Currency</label>
                      <select style={{ width: 300, background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text-primary)', outline: 'none' }}>
                        <option>AED (د.إ)</option>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Stripe API Key</label>
                      <input type="password" value="sk_test_1234567890abcdef" readOnly style={{ width: 400, background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text-secondary)', outline: 'none' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Audit Logs</h2>
                  <button className="btn btn-secondary" style={{ fontSize: 12 }}>Export CSV</button>
                </div>
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'var(--surface-3)', borderBottom: '1px solid var(--border)' }}>
                        <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>User</th>
                        <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Action Taken</th>
                        <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Target</th>
                        <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {INITIAL_LOGS.map(log => (
                        <tr key={log.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '16px 20px', fontSize: 13, fontWeight: 600, color: log.severity === 'high' ? 'var(--danger)' : 'var(--text-primary)' }}>{log.user}</td>
                          <td style={{ padding: '16px 20px', fontSize: 13, color: 'var(--text-secondary)' }}>{log.action}</td>
                          <td style={{ padding: '16px 20px', fontSize: 13, color: 'var(--text-secondary)' }}>{log.target}</td>
                          <td style={{ padding: '16px 20px', fontSize: 12, color: 'var(--text-secondary)' }}>{log.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Modals */}
      {activeModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div className="card" style={{ width: 440, padding: 32, position: 'relative' }}>
            <button
              onClick={() => { setActiveModal(null); setFormData({}); }}
              style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 20 }}
            >
              ×
            </button>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>
              {activeModal === 'user' ? 'Add New User' : activeModal === 'venue' ? 'Add New Venue' : 'Create New Event'}
            </h3>
            
            {activeModal === 'user' && (
              <form onSubmit={handleSaveUser} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Full Name</label>
                  <input required value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text-primary)', outline: 'none' }} placeholder="John Doe" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Email Address</label>
                  <input required type="email" value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text-primary)', outline: 'none' }} placeholder="john@example.com" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Role</label>
                  <select required value={formData.role || ''} onChange={e => setFormData({ ...formData, role: e.target.value })} style={{ width: '100%', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text-primary)', outline: 'none' }}>
                    <option value="">Select a role...</option>
                    <option value="Event Director">Event Director</option>
                    <option value="Commercial Director">Commercial Director</option>
                    <option value="Operations Manager">Operations Manager</option>
                    <option value="Marketing Head">Marketing Head</option>
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                  <button type="button" className="btn btn-ghost" onClick={() => { setActiveModal(null); setFormData({}); }}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save User</button>
                </div>
              </form>
            )}

            {activeModal === 'venue' && (
              <form onSubmit={handleSaveVenue} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Venue Name</label>
                  <input required value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text-primary)', outline: 'none' }} placeholder="e.g. Grand Expo Center" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>City</label>
                  <input required value={formData.city || ''} onChange={e => setFormData({ ...formData, city: e.target.value })} style={{ width: '100%', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text-primary)', outline: 'none' }} placeholder="e.g. Dubai" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Capacity</label>
                  <input required value={formData.capacity || ''} onChange={e => setFormData({ ...formData, capacity: e.target.value })} style={{ width: '100%', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text-primary)', outline: 'none' }} placeholder="e.g. 5,000" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                  <button type="button" className="btn btn-ghost" onClick={() => { setActiveModal(null); setFormData({}); }}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Venue</button>
                </div>
              </form>
            )}

            {activeModal === 'event' && (
              <form onSubmit={handleSaveEvent} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Event Name</label>
                  <input required value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text-primary)', outline: 'none' }} placeholder="e.g. Tech Innovators 2027" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Event Director</label>
                  <select required value={formData.director || ''} onChange={e => setFormData({ ...formData, director: e.target.value })} style={{ width: '100%', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text-primary)', outline: 'none' }}>
                    <option value="">Select a director...</option>
                    {users.filter(u => u.role === 'Event Director').map(u => (
                      <option key={u.id} value={u.name}>{u.name}</option>
                    ))}
                    <option value="Unassigned">Leave Unassigned</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Date Range</label>
                  <input required value={formData.date || ''} onChange={e => setFormData({ ...formData, date: e.target.value })} style={{ width: '100%', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text-primary)', outline: 'none' }} placeholder="e.g. Jan 10-12, 2027" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                  <button type="button" className="btn btn-ghost" onClick={() => { setActiveModal(null); setFormData({}); }}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Create Event</button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
