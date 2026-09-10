import React, { useState } from 'react';
import { programme as initialProgramme } from '../../data/marketingData';

const typeColors = {
  ceremony: 'var(--brand)', keynote: 'var(--brand)', panel: 'var(--info)',
  break: 'var(--text-secondary)', sponsor: 'var(--warning)', performance: 'var(--purple)',
  awards: 'var(--brand)', close: 'var(--success)',
};
const typeIcons = {
  ceremony: '🎉', keynote: '🎤', panel: '💬', break: '☕',
  sponsor: '🤝', performance: '🎵', awards: '🏆', close: '👋',
};

export default function Programme() {
  const [sessionList, setSessionList] = useState(initialProgramme);
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [isEditingSession, setIsEditingSession] = useState(false);

  const [sessionForm, setSessionForm] = useState({
    id: '',
    time: '11:00 AM',
    duration: '45 mins',
    session: '',
    speaker: 'Harshad Shah & VIP Panel',
    stage: 'Main Arena Stage',
    type: 'keynote',
    status: 'confirmed',
    avNotes: '4K Backdrop Wall + 4 Lav Mics + Live Broadcast Feed',
  });

  const handleOpenAdd = () => {
    setIsEditingSession(false);
    setSessionForm({
      id: `p-${Date.now()}`,
      time: '02:30 PM',
      duration: '45 mins',
      session: '',
      speaker: '',
      stage: 'Main Arena Stage',
      type: 'keynote',
      status: 'confirmed',
      avNotes: '4K Backdrop Wall + 2 Wireless Lav Mics',
    });
    setSessionModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setIsEditingSession(true);
    setSessionForm({
      id: p.id,
      time: p.time,
      duration: p.duration,
      session: p.session,
      speaker: p.speaker,
      stage: p.stage,
      type: p.type,
      status: p.status,
      avNotes: p.avNotes || '4K Backdrop Wall + Stage Sound Console',
    });
    setSessionModalOpen(true);
  };

  const handleSaveSession = (e) => {
    e.preventDefault();
    if (!sessionForm.session) return;

    if (isEditingSession) {
      setSessionList(prev => prev.map(p => p.id === sessionForm.id ? { ...p, ...sessionForm } : p));
    } else {
      setSessionList(prev => [...prev, sessionForm]);
    }
    setSessionModalOpen(false);
  };

  return (
    <div className="page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Programme & Talent Schedule</h1>
          <p className="page-subtitle">Oct 3, 2026 — Day 1 Schedule · GIIS School, Dubai · {sessionList.length} scheduled segments</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleOpenAdd} style={{ gap: 6, fontWeight: 700 }}>
          <span>🎤</span> + Add Session Form
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sessionList.map((p) => (
          <div
            key={p.id}
            onClick={() => handleOpenEdit(p)}
            style={{
              display: 'flex', gap: 16, padding: '14px 18px',
              background: 'var(--surface-card)', border: '1px solid var(--border)',
              borderRadius: 12, borderLeft: `4px solid ${typeColors[p.type] || 'var(--border)'}`,
              transition: 'all 0.15s', cursor: 'pointer',
            }}
            className="session-row-hover"
          >
            <div style={{ width: 80, flexShrink: 0, textAlign: 'center' }}>
              <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 'var(--size-lg)' }}>{p.time}</div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 2 }}>{p.duration}</div>
            </div>
            <div style={{ fontSize: 24, flexShrink: 0, width: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{typeIcons[p.type] || '📌'}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 'var(--size-lg)', marginBottom: 4 }}>{p.session}</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>🎤 {p.speaker}</span>
                <span style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>📍 {p.stage}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <span className={`badge badge-${p.status === 'confirmed' ? 'success' : 'warning'}`}>{p.status === 'confirmed' ? 'Confirmed' : 'Pending'}</span>
              <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: 10, fontWeight: 600, background: `${typeColors[p.type]}20`, color: typeColors[p.type] }}>{p.type}</span>
              <span style={{ fontSize: 11, color: 'var(--brand)', textDecoration: 'underline' }}>Edit</span>
            </div>
          </div>
        ))}
      </div>

      {/* Programme Session Form Modal */}
      {sessionModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal" style={{ maxWidth: 620, maxHeight: '90vh', padding: 24 }}>
            <div className="modal-header" style={{ marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
              <div>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>
                  {isEditingSession ? `Edit Session Data Form — ${sessionForm.session}` : 'Add New Programme Session Form'}
                </span>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                  Define run-of-show timing, stage assignment, key speakers & AV technical specs.
                </p>
              </div>
              <button className="modal-close" onClick={() => setSessionModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveSession} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 10 }}>
                  Session Timing & Stage Location
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Start Time *</label>
                    <input className="input" value={sessionForm.time} onChange={e => setSessionForm({ ...sessionForm, time: e.target.value })} placeholder="e.g. 10:30 AM" required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Duration *</label>
                    <input className="input" value={sessionForm.duration} onChange={e => setSessionForm({ ...sessionForm, duration: e.target.value })} placeholder="e.g. 45 mins" required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Stage / Hall *</label>
                    <select className="select" value={sessionForm.stage} onChange={e => setSessionForm({ ...sessionForm, stage: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="Main Arena Stage">Main Arena Stage</option>
                      <option value="Hall A Interactive Stage">Hall A Interactive Stage</option>
                      <option value="Workshop Zone B">Workshop Zone B</option>
                      <option value="VIP Creator Lounge">VIP Creator Lounge</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Session Title / Topic *</label>
                    <input className="input" value={sessionForm.session} onChange={e => setSessionForm({ ...sessionForm, session: e.target.value })} placeholder="e.g. Artificial Intelligence for Young Inventors" required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Session Type</label>
                    <select className="select" value={sessionForm.type} onChange={e => setSessionForm({ ...sessionForm, type: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="keynote">Keynote Address</option>
                      <option value="ceremony">Ceremony / Opening</option>
                      <option value="panel">Panel Discussion</option>
                      <option value="performance">Talent Performance</option>
                      <option value="awards">Awards Presentation</option>
                      <option value="sponsor">Sponsor Feature</option>
                      <option value="break">Networking Break</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 10 }}>
                  Speaker & Technical Production
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Lead Speaker / Performer</label>
                    <input className="input" value={sessionForm.speaker} onChange={e => setSessionForm({ ...sessionForm, speaker: e.target.value })} placeholder="e.g. Dr. Ramesh Gupta (STEM Director)" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Confirmation Status</label>
                    <select className="select" value={sessionForm.status} onChange={e => setSessionForm({ ...sessionForm, status: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending Speaker Confirmation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>AV & Stage Rigging Requirements</label>
                  <input className="input" value={sessionForm.avNotes} onChange={e => setSessionForm({ ...sessionForm, avNotes: e.target.value })} placeholder="e.g. 4K Backdrop Video + 3 Wireless Handheld Mics" style={{ padding: '8px 10px', fontSize: 13 }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                <button type="button" className="btn btn-ghost" onClick={() => setSessionModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 22px', fontWeight: 700 }}>
                  {isEditingSession ? 'Save Session Changes' : 'Add Session to Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

