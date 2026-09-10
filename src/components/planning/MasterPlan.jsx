import React, { useState } from 'react';
import { workstreams as initialWorkstreams } from '../../data/eventData';

const statusColors = { done: 'var(--success)', 'in-progress': 'var(--brand)', blocked: 'var(--danger)', pending: 'var(--text-secondary)' };
const statusBadge = { done: 'badge-success', 'in-progress': 'badge-brand', blocked: 'badge-danger', pending: 'badge-neutral' };

export default function MasterPlan() {
  const [wsList, setWsList] = useState(initialWorkstreams);
  const [expanded, setExpanded] = useState({ 'ws-1': true, 'ws-4': true, 'ws-2': true });
  const [filterStatus, setFilterStatus] = useState('all');

  // Task Form Modal State
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [taskForm, setTaskForm] = useState({
    id: '',
    wsId: 'ws-1',
    name: '',
    owner: 'Fatima Al-Nuaimi',
    due: 'Sep 25, 2026',
    priority: 'high',
    status: 'in-progress',
    budget: 'AED 45,000',
    dependency: 'Permits Submission',
    blocker: '',
  });

  const toggleWs = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const filteredWs = wsList.map(ws => ({
    ...ws,
    tasks: filterStatus === 'all' ? ws.tasks : ws.tasks.filter(t => t.status === filterStatus),
  }));

  const totalTasks = wsList.reduce((s, w) => s + w.tasks.length, 0);
  const doneTasks = wsList.reduce((s, w) => s + w.tasks.filter(t => t.status === 'done').length, 0);
  const blockedTasks = wsList.reduce((s, w) => s + w.tasks.filter(t => t.status === 'blocked').length, 0);

  const handleOpenAddTask = (wsId = 'ws-1') => {
    setIsEditingTask(false);
    setTaskForm({
      id: `task-${Date.now()}`,
      wsId,
      name: '',
      owner: 'Harshad Shah',
      due: 'Oct 01, 2026',
      priority: 'high',
      status: 'pending',
      budget: 'AED 30,000',
      dependency: 'None',
      blocker: '',
    });
    setTaskModalOpen(true);
  };

  const handleOpenEditTask = (task, wsId) => {
    setIsEditingTask(true);
    setTaskForm({
      id: task.id,
      wsId,
      name: task.name,
      owner: task.owner || 'Department Lead',
      due: task.due,
      priority: task.priority,
      status: task.status,
      budget: task.budget || 'AED 25,000',
      dependency: task.dependency || 'None',
      blocker: task.blocker || '',
    });
    setTaskModalOpen(true);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!taskForm.name) return;

    if (isEditingTask) {
      setWsList(prev => prev.map(ws => {
        if (ws.id !== taskForm.wsId) {
          return {
            ...ws,
            tasks: ws.tasks.filter(t => t.id !== taskForm.id),
          };
        }
        return {
          ...ws,
          tasks: ws.tasks.map(t => t.id === taskForm.id ? { ...t, ...taskForm } : t),
        };
      }));
    } else {
      setWsList(prev => prev.map(ws => {
        if (ws.id === taskForm.wsId) {
          return {
            ...ws,
            tasks: [
              ...ws.tasks,
              {
                id: taskForm.id,
                name: taskForm.name,
                due: taskForm.due,
                priority: taskForm.priority,
                status: taskForm.status,
                blocker: taskForm.blocker,
              },
            ],
          };
        }
        return ws;
      }));
      setExpanded(p => ({ ...p, [taskForm.wsId]: true }));
    }
    setTaskModalOpen(false);
  };

  return (
    <div className="page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 className="page-title">Master Plan & Milestones</h1>
          <p className="page-subtitle">{wsList.length} workstreams · {totalTasks} tasks · {doneTasks} completed</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => handleOpenAddTask('ws-1')} style={{ gap: 6, fontWeight: 700 }}>
          <span>📋</span> + Add Task / Milestone Form
        </button>
      </div>

      {/* Summary */}
      <div className="grid-4" style={{ marginBottom: 20 }}>
        {[
          { label: 'Total Tasks', value: totalTasks, color: 'var(--text-primary)' },
          { label: 'Completed', value: doneTasks, color: 'var(--success)' },
          { label: 'In Progress', value: wsList.reduce((s, w) => s + w.tasks.filter(t => t.status === 'in-progress').length, 0), color: 'var(--brand)' },
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={(e) => { e.stopPropagation(); handleOpenAddTask(ws.id); }}
                  style={{ fontSize: 11, padding: '4px 8px' }}
                >
                  + Add Task
                </button>
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
                  <div
                    key={task.id}
                    onClick={() => handleOpenEditTask(task, ws.id)}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      padding: '12px 20px 12px 48px',
                      borderBottom: i < ws.tasks.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                      background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    className="task-row-hover"
                  >
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: statusColors[task.status], flexShrink: 0, marginTop: 4 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 'var(--size-md)', color: 'var(--text-primary)', fontWeight: 600 }}>{task.name}</div>
                      {task.blocker && (
                        <div style={{ fontSize: 'var(--size-sm)', color: 'var(--danger)', marginTop: 3, display: 'flex', gap: 6, alignItems: 'center' }}>
                          <span>⛔</span>{task.blocker}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                      <span style={{ fontSize: 'var(--size-sm)', color: 'var(--text-secondary)' }}>📅 {task.due}</span>
                      <span className={`badge badge-${task.priority === 'critical' ? 'danger' : task.priority === 'high' ? 'warning' : 'neutral'}`} style={{ fontSize: 9 }}>{task.priority}</span>
                      <span className={`badge ${statusBadge[task.status]}`} style={{ fontSize: 9 }}>
                        {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--brand)', textDecoration: 'underline' }}>Edit</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Task & Milestone Form Modal */}
      {taskModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal" style={{ maxWidth: 620, maxHeight: '90vh', padding: 24 }}>
            <div className="modal-header" style={{ marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
              <div>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>
                  {isEditingTask ? 'Edit Task & Milestone Data Form' : 'Add New Task & Milestone Form'}
                </span>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                  Assign workstreams, specify deadlines, budget allocations, and dependency blockers.
                </p>
              </div>
              <button className="modal-close" onClick={() => setTaskModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveTask} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 10 }}>
                  Task Scope & Assignment
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Workstream / Department *</label>
                    <select className="select" value={taskForm.wsId} onChange={e => setTaskForm({ ...taskForm, wsId: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      {wsList.map(w => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Assignee / Owner *</label>
                    <input className="input" value={taskForm.owner} onChange={e => setTaskForm({ ...taskForm, owner: e.target.value })} required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Task Title / Deliverable *</label>
                  <input className="input" value={taskForm.name} onChange={e => setTaskForm({ ...taskForm, name: e.target.value })} placeholder="e.g. Confirm Civil Defence Onsite Inspection" required style={{ padding: '8px 10px', fontSize: 13 }} />
                </div>
              </div>

              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 10 }}>
                  Schedule, Status & Financials
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Due Date *</label>
                    <input className="input" value={taskForm.due} onChange={e => setTaskForm({ ...taskForm, due: e.target.value })} placeholder="e.g. Sep 28, 2026" required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Priority Level</label>
                    <select className="select" value={taskForm.priority} onChange={e => setTaskForm({ ...taskForm, priority: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Execution Status</label>
                    <select className="select" value={taskForm.status} onChange={e => setTaskForm({ ...taskForm, status: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done / Completed</option>
                      <option value="blocked">Blocked / At Risk</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Budget Allocated (AED)</label>
                    <input className="input" value={taskForm.budget} onChange={e => setTaskForm({ ...taskForm, budget: e.target.value })} placeholder="AED 40,000" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Dependencies / Prerequisites</label>
                    <input className="input" value={taskForm.dependency} onChange={e => setTaskForm({ ...taskForm, dependency: e.target.value })} placeholder="e.g. Venue Permit Approved" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                </div>
              </div>

              {taskForm.status === 'blocked' && (
                <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 10, padding: '12px 14px' }}>
                  <label style={{ fontSize: 11, fontWeight: 800, color: 'var(--danger)', display: 'block', marginBottom: 4 }}>Blocker Reason / Mitigation Required *</label>
                  <input className="input" value={taskForm.blocker} onChange={e => setTaskForm({ ...taskForm, blocker: e.target.value })} placeholder="e.g. Awaiting final stamp from municipality" required style={{ padding: '8px 10px', fontSize: 13 }} />
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                <button type="button" className="btn btn-ghost" onClick={() => setTaskModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 22px', fontWeight: 700 }}>
                  {isEditingTask ? 'Save Task Updates' : 'Add Task to Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

