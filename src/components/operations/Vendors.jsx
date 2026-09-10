import React from 'react';
import { vendors } from '../../data/operationsData';

const contractConfig = { signed: { label: 'Signed', cls: 'badge-success' }, draft: { label: 'Draft', cls: 'badge-warning' } };
const deliveryConfig = { 'on-track': { label: 'On Track', cls: 'badge-success' }, 'at-risk': { label: 'At Risk', cls: 'badge-warning' }, blocked: { label: 'Blocked', cls: 'badge-danger' } };
const riskConfig = { low: { label: 'Low', cls: 'badge-success' }, medium: { label: 'Medium', cls: 'badge-warning' }, high: { label: 'High', cls: 'badge-danger' } };
const paymentLabels = { 'paid-100': '100% Paid', 'paid-50': '50% Paid', 'paid-30': '30% Paid', 'paid-25': '25% Paid', 'not-paid': 'Not Paid' };
const fmt = (n) => n >= 1000000 ? `AED ${(n/1000000).toFixed(2)}M` : n >= 1000 ? `AED ${(n/1000).toFixed(0)}K` : `AED ${n.toLocaleString()}`;

export default function Vendors() {
  const totalValue = vendors.reduce((s, v) => s + v.value, 0);
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Vendor Control</h1>
          <p className="page-subtitle">{vendors.length} vendors · Total value: {fmt(totalValue)}</p>
        </div>
        <button className="btn btn-primary btn-sm">+ Add Vendor</button>
      </div>
      <div className="grid-4" style={{ marginBottom: 20 }}>
        {[
          { label: 'Total Vendors', value: vendors.length, color: 'var(--text-primary)' },
          { label: 'Contracts Signed', value: vendors.filter(v => v.contract === 'signed').length, color: 'var(--success)' },
          { label: 'Delivery At Risk', value: vendors.filter(v => v.delivery === 'at-risk' || v.delivery === 'blocked').length, color: 'var(--warning)' },
          { label: 'High Risk', value: vendors.filter(v => v.risk === 'high').length, color: 'var(--danger)' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr><th>Vendor</th><th>Category</th><th>Owner</th><th>Value</th><th>Status</th><th>Contract</th><th>Payment</th><th>Delivery</th><th>Risk</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {vendors.map(v => (
              <tr key={v.id}>
                <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{v.name}</td>
                <td><span className="badge badge-neutral" style={{ fontSize: 10 }}>{v.category}</span></td>
                <td style={{ color: 'var(--text-secondary)', fontSize: 'var(--size-sm)' }}>{v.owner}</td>
                <td style={{ fontWeight: 700, color: 'var(--brand)' }}>{fmt(v.value)}</td>
                <td><span className={`badge ${v.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>{v.status}</span></td>
                <td><span className={`badge ${contractConfig[v.contract]?.cls || 'badge-neutral'}`}>{contractConfig[v.contract]?.label || v.contract}</span></td>
                <td style={{ fontSize: 'var(--size-sm)', color: v.payment === 'paid-100' ? 'var(--success)' : v.payment === 'not-paid' ? 'var(--danger)' : 'var(--text-secondary)' }}>{paymentLabels[v.payment]}</td>
                <td><span className={`badge ${deliveryConfig[v.delivery]?.cls || 'badge-neutral'}`}>{deliveryConfig[v.delivery]?.label || v.delivery}</span></td>
                <td><span className={`badge ${riskConfig[v.risk]?.cls || 'badge-neutral'}`}>{riskConfig[v.risk]?.label || v.risk}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px', fontSize: 11 }}>View</button>
                    <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: 11 }}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
