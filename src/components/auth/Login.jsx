import React, { useState } from 'react';

const USERS = [
  { email: 'harshad@hsmediaworld.com', password: 'HSMedia@2026', name: 'Harshad Shah', role: 'Event Director', roleId: 'director', avatar: 'HS' },
  { email: 'priya@hsmediaworld.com', password: 'HSMedia@2026', name: 'Priya Mehta', role: 'Commercial Director', roleId: 'commercial', avatar: 'PM' },
  { email: 'tariq@hsmediaworld.com', password: 'HSMedia@2026', name: 'Tariq Al-Fayed', role: 'Operations Manager', roleId: 'operations', avatar: 'TA' },
  { email: 'sarah@hsmediaworld.com', password: 'HSMedia@2026', name: 'Sarah Jones', role: 'Marketing Head', roleId: 'marketing', avatar: 'SJ' },
  { email: 'admin@hsmediaworld.com', password: 'HSMedia@2026', name: 'Master Admin', role: 'System Administrator', roleId: 'superadmin', avatar: 'MA' },
];

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const user = USERS.find(u => u.email === email && u.password === password);
      if (user) { onLogin(user); }
      else { setError('Invalid email or password. Please try again.'); }
      setLoading(false);
    }, 600);
  };

  const quickLogin = (user) => {
    setLoading(true);
    setTimeout(() => { onLogin(user); setLoading(false); }, 400);
  };

  return (
    <div className="login-screen-wrapper">
      {/* ── Left panel — branding (Hidden on mobile via CSS) ── */}
      <div className="login-left-panel">
        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: -120, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(246,145,35,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, right: -60, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(246,145,35,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Logo Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'rgba(246,145,35,0.12)', border: '1.5px solid rgba(246,145,35,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
          }}>
            <img src="/hs-logoo-new-scaled.webp" alt="HS" style={{ width: 38, height: 38, objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>HS Media World</div>
            <div style={{ fontSize: 11, color: 'var(--brand)', fontWeight: 700, marginTop: 3, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Event Command Centre
            </div>
          </div>
        </div>

        {/* Hero text */}
        <div style={{ position: 'relative', zIndex: 1, margin: '40px 0' }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--brand)',
            textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 14,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{ width: 24, height: 1.5, background: 'var(--brand)' }} />
            DUBAI 2026
          </div>
          <h1 style={{
            fontSize: 38, fontWeight: 900, color: 'var(--text-primary)',
            lineHeight: 1.15, letterSpacing: '-0.5px', marginBottom: 16,
          }}>
            Plan. Execute.<br />
            <span style={{ color: 'var(--brand)' }}>Deliver.</span>
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 360 }}>
            The complete event command system for the QIDS UAE Talent Hunt & Awards 2026. From spatial planning to live broadcast execution.
          </p>

          {/* Event stats */}
          <div style={{ display: 'flex', gap: 24, marginTop: 32, flexWrap: 'wrap' }}>
            {[
              { value: '2,500+', label: 'Expected Attendees' },
              { value: 'AED 18M', label: 'Commercial Target' },
              { value: 'Oct 3', label: 'Event Date' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--brand)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', position: 'relative', zIndex: 1 }}>
          © 2026 HS Media World · GIIS School, Dubai
        </div>
      </div>

      {/* ── Right panel — login form ── */}
      <div className="login-right-panel">
        <div style={{ width: '100%', maxWidth: 440, padding: '20px 0' }}>

          {/* Mobile-Only Header Brand Banner */}
          <div className="login-mobile-header" style={{ marginBottom: 24, textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: 'rgba(246,145,35,0.12)', border: '1.5px solid rgba(246,145,35,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
              boxShadow: '0 4px 20px rgba(246,145,35,0.2)'
            }}>
              <img src="/hs-logoo-new-scaled.webp" alt="HS" style={{ width: 40, height: 40, objectFit: 'contain' }} />
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--text-primary)' }}>HS Media World</div>
            <div style={{ fontSize: 11.5, color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>
              QIDS UAE 2026 Command Centre
            </div>
          </div>

          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px', marginBottom: 4 }}>
              Sign In
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
              Access the Event Command Centre & Commercial System
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
            {/* Email */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 6 }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', pointerEvents: 'none' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input
                  type="email" required autoComplete="email"
                  placeholder="you@hsmediaworld.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%', background: 'var(--surface-3)',
                    border: '1px solid var(--border)', borderRadius: 10,
                    padding: '11px 14px 11px 38px',
                    color: 'var(--text-primary)', fontSize: 13, fontFamily: 'var(--font)',
                    outline: 'none', transition: 'border-color 200ms', boxSizing: 'border-box'
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--brand)'; e.target.style.boxShadow = '0 0 0 3px rgba(246,145,35,0.10)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, flexWrap: 'nowrap' }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Password
                </label>
                <span style={{ fontSize: 11, color: 'var(--brand)', cursor: 'pointer', fontWeight: 600 }}>
                  Forgot password?
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', pointerEvents: 'none' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input
                  type={showPass ? 'text' : 'password'} required autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  style={{
                    width: '100%', background: 'var(--surface-3)',
                    border: '1px solid var(--border)', borderRadius: 10,
                    padding: '11px 40px 11px 38px',
                    color: 'var(--text-primary)', fontSize: 13, fontFamily: 'var(--font)',
                    outline: 'none', transition: 'border-color 200ms', boxSizing: 'border-box'
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--brand)'; e.target.style.boxShadow = '0 0 0 3px rgba(246,145,35,0.10)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
                <button
                  type="button" tabIndex={-1}
                  onClick={() => setShowPass(v => !v)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  {showPass
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ padding: '10px 14px', background: 'var(--danger-dim)', border: '1px solid var(--danger-border)', borderRadius: 8, fontSize: 12, color: 'var(--danger)', fontWeight: 600 }}>
                ⚠ {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '12px', borderRadius: 99,
                background: loading ? 'rgba(246,145,35,0.6)' : 'var(--brand)', color: '#000',
                border: 'none', fontSize: 14, fontWeight: 800, fontFamily: 'var(--font)',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 200ms', boxShadow: '0 4px 20px rgba(246,145,35,0.25)',
                marginTop: 6,
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = 'var(--brand-light)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
              onMouseLeave={e => { e.currentTarget.style.background = loading ? 'rgba(246,145,35,0.6)' : 'var(--brand)'; e.currentTarget.style.transform = 'none'; }}
            >
              {loading
                ? <><span style={{ width: 14, height: 14, border: '2px solid rgba(0,0,0,0.25)', borderTop: '2px solid #000', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} /> Signing in…</>
                : 'Sign In →'
              }
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>Quick Demo Access</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Quick login grid (Responsive) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: 8 }}>
            {USERS.map(u => (
              <button
                key={u.email}
                onClick={() => quickLogin(u)} disabled={loading}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 10px', background: 'var(--surface-2)',
                  border: '1px solid var(--border)', borderRadius: 10,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font)', textAlign: 'left',
                  transition: 'all 150ms', width: '100%',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-brand)'; e.currentTarget.style.background = 'var(--brand-dim)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface-2)'; }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: 'var(--brand-dim)', border: '1.5px solid var(--border-brand)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 800, color: 'var(--brand)',
                }}>{u.avatar}</div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div>
                  <div style={{ fontSize: 9.5, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.role}</div>
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
