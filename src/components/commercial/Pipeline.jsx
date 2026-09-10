import React, { useState } from 'react';
import { pipeline, pipelineStages } from '../../data/commercialData';

const stageColors = {
  'New': 'var(--text-secondary)',
  'Contacted': 'var(--info)',
  'Interested': 'var(--warning)',
  'Proposal Sent': 'var(--brand)',
  'Negotiation': 'var(--purple)',
  'Won': 'var(--success)',
  'Lost': 'var(--danger)',
};

const fmt = (n) => n >= 1000000 ? `AED ${(n/1000000).toFixed(2)}M` : n >= 1000 ? `AED ${(n/1000).toFixed(0)}K` : `AED ${n.toLocaleString()}`;

export default function Pipeline({ onNavigate }) {
  const [opportunities, setOpportunities] = useState(pipeline);
  const [selected, setSelected] = useState(null);

  const moveCard = (id, direction) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id !== id) return opp;
      const idx = pipelineStages.indexOf(opp.stage);
      const newIdx = direction === 'forward' ? Math.min(idx + 1, pipelineStages.length - 1) : Math.max(idx - 1, 0);
      return { ...opp, stage: pipelineStages[newIdx] };
    }));
  };

  const totalPipeline = opportunities.filter(o => o.stage !== 'Lost').reduce((s, o) => s + o.value, 0);
  const wonValue = opportunities.filter(o => o.stage === 'Won').reduce((s, o) => s + o.value, 0);
  const selectedOpp = opportunities.find(o => o.id === selected);

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="page-header" style={{ marginBottom: 16 }}>
        <div>
          <h1 className="page-title">Commercial Pipeline</h1>
          <p className="page-subtitle">{opportunities.filter(o => o.stage !== 'Lost').length} active opportunities · Pipeline: {fmt(totalPipeline)}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('proposals')}>View Proposals</button>
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('packages')}>+ New Opportunity</button>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        {pipelineStages.map(stage => {
          const items = opportunities.filter(o => o.stage === stage);
          const val = items.reduce((s, o) => s + o.value, 0);
          return (
            <div key={stage} style={{ flex: 1, minWidth: 90, padding: '10px 12px', background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 10, borderTop: `2px solid ${stageColors[stage]}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: stageColors[stage], textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{stage}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{items.length}</div>
              {val > 0 && <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{fmt(val)}</div>}
            </div>
          );
        })}
      </div>

      {/* Kanban */}
      <div style={{ display: 'flex', gap: 12, flex: 1, overflowX: 'auto', paddingBottom: 8 }}>
        {pipelineStages.map(stage => {
          const stageOpps = opportunities.filter(o => o.stage === stage);
          return (
            <div key={stage} style={{ minWidth: 220, maxWidth: 220, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Column header */}
              <div style={{ padding: '8px 12px', borderRadius: 8, background: 'var(--surface-card)', border: `1px solid ${stageColors[stage]}30`, borderTop: `2px solid ${stageColors[stage]}`, marginBottom: 2 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: stageColors[stage], textTransform: 'uppercase' }}>{stage}</div>
                <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{stageOpps.length} · {fmt(stageOpps.reduce((s, o) => s + o.value, 0))}</div>
              </div>

              {/* Cards */}
              {stageOpps.map(opp => (
                <div
                  key={opp.id}
                  onClick={() => setSelected(selected === opp.id ? null : opp.id)}
                  style={{ padding: '12px 14px', background: 'var(--surface-card)', border: `1px solid ${selected === opp.id ? 'var(--brand)' : 'var(--border)'}`, borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s' }}
                >
                  <div style={{ fontWeight: 700, fontSize: 'var(--size-md)', color: 'var(--text-primary)', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opp.sponsor}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 8 }}>{opp.package} · {opp.stall}</div>
                  <div style={{ fontWeight: 800, color: 'var(--brand)', fontSize: 16, marginBottom: 8 }}>{fmt(opp.value)}</div>
                  <div style={{ display: 'flex', align: 'center', gap: 6, marginBottom: 8 }}>
                    <div className="avatar" style={{ width: 20, height: 20, fontSize: 9 }}>{opp.owner.split(' ').map(n => n[0]).join('')}</div>
                    <span style={{ fontSize: 10, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opp.owner.split(' ')[0]}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-secondary)' }}>Close: {opp.closeDate}</span>
                  </div>
                  {opp.nextAction !== '—' && (
                    <div style={{ fontSize: 9, padding: '4px 8px', background: 'var(--surface-raised)', borderRadius: 6, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      → {opp.nextAction}
                    </div>
                  )}
                  {selected === opp.id && stage !== 'Won' && stage !== 'Lost' && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                      <button className="btn btn-ghost btn-sm" style={{ flex: 1, padding: '4px 8px', fontSize: 10 }} onClick={(e) => { e.stopPropagation(); moveCard(opp.id, 'back'); }}>← Back</button>
                      <button className="btn btn-primary btn-sm" style={{ flex: 1, padding: '4px 8px', fontSize: 10 }} onClick={(e) => { e.stopPropagation(); moveCard(opp.id, 'forward'); }}>Next →</button>
                    </div>
                  )}
                  {opp.lostReason && (
                    <div style={{ marginTop: 6, fontSize: 10, color: 'var(--danger)' }}>Reason: {opp.lostReason}</div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
