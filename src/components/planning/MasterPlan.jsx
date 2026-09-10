import React, { useState } from 'react';
import { workstreams } from '../../data/eventData';

const statusColors = { done: 'var(--success)', 'in-progress': 'var(--brand)', blocked: 'var(--danger)', pending: 'var(--text-secondary)' };
const statusBadge = { done: 'badge-success', 'in-progress': 'badge-brand', blocked: 'badge-danger', pending: 'badge-neutral' };

export default function MasterPlan() {
  const [expanded, setExpanded] = useState({ 'ws-1': true, 'ws-4': true });
  const [filterStatus, setFilterStatus] = useState('all');

  const toggleWs = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const filteredWs = workstreams.map(ws => ({
    ...ws,
    tasks: filterStatus === 'all' ? ws.tasks : ws.tasks.filter(t => t.status === filterStatus),
  }));

  const totalTasks = workstreams.reduce((s, w) => s + w.tasks.length, 0);
  const doneTasks = workstreams.reduce((s, w) => s + w.tasks.filter(t => t.status === 'done').length, 0);
  const blockedTasks = workstreams.reduce((s, w) => s + w.tasks.filter(t => t.status === 'blocked').length, 0);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Master Plan</h1>
          <p className="page-subtitle">{workstreams.length} workstreams · {totalTasks} tasks · {doneTasks} completed</p>
        </div>
        <button className="btn btn-primary btn-sm">+ Add Task</button>
      </div>

      {/* Summary */}
      <div className="grid-4" style={{ marginBottom: 20 }}>
        {[
          { label: 'Total Tasks', value: totalTasks, color: 'var(--text-primary)' },
          { label: 'Completed', value: doneTasks, color: 'var(--success)' },
          { label: 'In Progress', value: workstreams.reduce((s, w) => s + w.tasks.filter(t => t.status === 'in-progress').length, 0), color: 'var(--brand)' },
          { label: 'Blocked', value: blockedTasks, color: 'var(--danger)' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="filter-bar">
        {['all', 'done', 'in-progress', 'blocked', 'pending'].map(f => (
          <button key={f} className={`filter-chip ${filterStatus === f ? 'active' : ''}`} onClick={() => setFilterStatus(f)}>
            {f === 'all' ? 'All Tasks' : f === 'in-progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Workstreams */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filteredWs.map(ws => (
          <div key={ws.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Workstream Header */}
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', cursor: 'pointer', background: 'var(--surface-card)' }}
              onClick={() => toggleWs(ws.id)}
            >
              <span style={{ fontSize: 16, transition: 'transform 0.2s', transform: expanded[ws.id] ? 'rotate(90deg)' : 'rotate(0deg)', color: 'var(--text-secondary)' }}>›</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 'var(--size-lg)', fontWeight: 700, color: 'var(--text-primary)' }}>{ws.name}</div>
                <div style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>{ws.owner} · {ws.tasks.length} tasks</div>
              </div>
              <div style={{ display: 'flex', align: 'center', gap: 14, flexShrink: 0 }}>
                <div style={{ width: 100 }}>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${ws.progress}%`, background: ws.status === 'on-track' ? 'var(--success)' : ws.status === 'blocked' ? 'var(--danger)' : 'var(--warning)' }} />
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)', textAlign: 'right', marginTop: 2 }}>{ws.progress}%</div>
                </div>
                <span className={`badge badge-${ws.status === 'on-track' ? 'success' : ws.status === 'blocked' ? 'danger' : 'warning'}`}>
                  {ws.status === 'on-track' ? 'On Track' : ws.status === 'blocked' ? 'Blocked' : 'At Risk'}
                </span>
                <span className={`badge badge-${ws.priority === 'critical' ? 'danger' : ws.priority === 'high' ? 'warning' : 'neutral'}`}>
                  {ws.priority}
                </span>
              </div>
            </div>

            {/* Tasks */}
            {expanded[ws.id] && ws.tasks.length > 0 && (
              <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
                {ws.tasks.map((task, i) => (
                  <div key={task.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 20px 10px 48px', borderBottom: i < ws.tasks.length - 1 ? '1px solid var(--border-subtle)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: statusColors[task.status], flexShrink: 0, marginTop: 4 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 'var(--size-md)', color: 'var(--text-primary)', fontWeight: 500 }}>{task.name}</div>
                      {task.blocker && (
                        <div style={{ fontSize: 'var(--size-sm)', color: 'var(--danger)', marginTop: 3, display: 'flex', gap: 6, alignItems: 'center' }}>
                          <span>⛔</span>{task.blocker}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', align: 'center', gap: 10, flexShrink: 0 }}>
                      <span style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>{task.due}</span>
                      <span className={`badge badge-${task.priority === 'critical' ? 'danger' : task.priority === 'high' ? 'warning' : 'neutral'}`} style={{ fontSize: 9 }}>{task.priority}</span>
                      <span className={`badge ${statusBadge[task.status]}`} style={{ fontSize: 9 }}>
                        {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
