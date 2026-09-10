import React, { useState } from 'react';
import { vendors as initialVendors } from '../../data/operationsData';

const contractConfig = { signed: { label: 'Signed', cls: 'badge-success' }, draft: { label: 'Draft', cls: 'badge-warning' } };
const deliveryConfig = { 'on-track': { label: 'On Track', cls: 'badge-success' }, 'at-risk': { label: 'At Risk', cls: 'badge-warning' }, blocked: { label: 'Blocked', cls: 'badge-danger' } };
const riskConfig = { low: { label: 'Low', cls: 'badge-success' }, medium: { label: 'Medium', cls: 'badge-warning' }, high: { label: 'High', cls: 'badge-danger' } };
const paymentLabels = { 'paid-100': '100% Paid', 'paid-50': '50% Paid', 'paid-30': '30% Paid', 'paid-25': '25% Paid', 'not-paid': 'Not Paid' };
const fmt = (n) => n >= 1000000 ? `AED ${(n/1000000).toFixed(2)}M` : n >= 1000 ? `AED ${(n/1000).toFixed(0)}K` : `AED ${n.toLocaleString()}`;

export default function Vendors() {
  const [vendorList, setVendorList] = useState(initialVendors);
  const [vendorModalOpen, setVendorModalOpen] = useState(false);
  const [isEditingVendor, setIsEditingVendor] = useState(false);

  const [vendorForm, setVendorForm] = useState({
    id: '',
    name: '',
    category: 'AV & Staging',
    owner: 'Tariq Al-Mansoor',
    value: 120000,
    status: 'confirmed',
    contract: 'signed',
    payment: 'paid-50',
    delivery: 'on-track',
    risk: 'low',
    contactPerson: '',
    email: '',
    phone: '',
    scope: 'Stage LED screens, lighting truss, line-array audio & generator backup.',
  });

  const totalValue = vendorList.reduce((s, v) => s + v.value, 0);

  const handleOpenAdd = () => {
    setIsEditingVendor(false);
    setVendorForm({
      id: `v-${Date.now()}`,
      name: '',
      category: 'AV & Staging',
      owner: 'Tariq Al-Mansoor',
      value: 95000,
      status: 'confirmed',
      contract: 'draft',
      payment: 'paid-25',
      delivery: 'on-track',
      risk: 'low',
      contactPerson: '',
      email: '',
      phone: '',
      scope: 'Event infrastructure fitout & technical support.',
    });
    setVendorModalOpen(true);
  };

  const handleOpenEdit = (v) => {
    setIsEditingVendor(true);
    setVendorForm({
      id: v.id,
      name: v.name,
      category: v.category,
      owner: v.owner,
      value: v.value,
      status: v.status || 'confirmed',
      contract: v.contract,
      payment: v.payment,
      delivery: v.delivery,
      risk: v.risk,
      contactPerson: v.contactPerson || 'Vendor Lead',
      email: v.email || `ops@${v.name.toLowerCase().replace(/\s+/g, '')}.ae`,
      phone: v.phone || '+971 4 333 8888',
      scope: v.scope || 'Standard event supplier contract deliverables.',
    });
    setVendorModalOpen(true);
  };

  const handleSaveVendor = (e) => {
    e.preventDefault();
    if (!vendorForm.name) return;

    if (isEditingVendor) {
      setVendorList(prev => prev.map(v => v.id === vendorForm.id ? { ...v, ...vendorForm } : v));
    } else {
      setVendorList(prev => [vendorForm, ...prev]);
    }
    setVendorModalOpen(false);
  };

  return (
    <div className="page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Vendor & Procurement Control</h1>
          <p className="page-subtitle">{vendorList.length} vendors contracted · Total procurement value: {fmt(totalValue)}</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleOpenAdd} style={{ gap: 6, fontWeight: 700 }}>
          <span>🏢</span> + Add Vendor Form
        </button>
      </div>

      <div className="grid-4" style={{ marginBottom: 20 }}>
        {[
          { label: 'Total Vendors', value: vendorList.length, color: 'var(--text-primary)' },
          { label: 'Contracts Signed', value: vendorList.filter(v => v.contract === 'signed').length, color: 'var(--success)' },
          { label: 'Delivery At Risk', value: vendorList.filter(v => v.delivery === 'at-risk' || v.delivery === 'blocked').length, color: 'var(--warning)' },
          { label: 'High Risk', value: vendorList.filter(v => v.risk === 'high').length, color: 'var(--danger)' },
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
            {vendorList.map(v => (
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
                    <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: 11 }} onClick={() => handleOpenEdit(v)}>Edit Form</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vendor Form Modal */}
      {vendorModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal" style={{ maxWidth: 660, maxHeight: '90vh', padding: 24 }}>
            <div className="modal-header" style={{ marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
              <div>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>
                  {isEditingVendor ? `Edit Vendor Form — ${vendorForm.name}` : 'Add Vendor / Procurement Record Form'}
                </span>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                  Manage contractor scope, SLA terms, milestone payments, delivery status & risk audits.
                </p>
              </div>
              <button className="modal-close" onClick={() => setVendorModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveVendor} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 10 }}>
                  Supplier Identity & Category
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Vendor / Company Name *</label>
                    <input className="input" value={vendorForm.name} onChange={e => setVendorForm({ ...vendorForm, name: e.target.value })} placeholder="e.g. Dubai Sound & Stage Light LLC" required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Procurement Category *</label>
                    <select className="select" value={vendorForm.category} onChange={e => setVendorForm({ ...vendorForm, category: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="AV & Staging">AV & Staging</option>
                      <option value="Security & Crowd">Security & Crowd Control</option>
                      <option value="Fabrication & Booths">Fabrication & Booths</option>
                      <option value="Catering & F&B">Catering & F&B</option>
                      <option value="Logistics & Power">Logistics & Power Generators</option>
                      <option value="Printing & Signage">Printing & Signage</option>
                      <option value="Licensing & Permits">Licensing & Permits</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Internal Lead Owner</label>
                    <input className="input" value={vendorForm.owner} onChange={e => setVendorForm({ ...vendorForm, owner: e.target.value })} placeholder="Lead Name" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Contact Phone</label>
                    <input className="input" value={vendorForm.phone} onChange={e => setVendorForm({ ...vendorForm, phone: e.target.value })} placeholder="+971 4 000 0000" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Contact Email</label>
                    <input type="email" className="input" value={vendorForm.email} onChange={e => setVendorForm({ ...vendorForm, email: e.target.value })} placeholder="supplier@company.ae" style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 10 }}>
                  Financials, Contract & SLA Tracking
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Contract Value (AED) *</label>
                    <input type="number" className="input" value={vendorForm.value} onChange={e => setVendorForm({ ...vendorForm, value: Number(e.target.value) })} required style={{ padding: '8px 10px', fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Contract Status</label>
                    <select className="select" value={vendorForm.contract} onChange={e => setVendorForm({ ...vendorForm, contract: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="draft">Draft</option>
                      <option value="signed">Signed</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Payment Status</label>
                    <select className="select" value={vendorForm.payment} onChange={e => setVendorForm({ ...vendorForm, payment: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="not-paid">Not Paid</option>
                      <option value="paid-25">25% Advance Paid</option>
                      <option value="paid-50">50% Paid</option>
                      <option value="paid-100">100% Fully Paid</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Delivery Readiness</label>
                    <select className="select" value={vendorForm.delivery} onChange={e => setVendorForm({ ...vendorForm, delivery: e.target.value })} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
                      <option value="on-track">On Track</option>
                      <option value="at-risk">At Risk</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Scope of Work / Deliverables</label>
                  <input className="input" value={vendorForm.scope} onChange={e => setVendorForm({ ...vendorForm, scope: e.target.value })} placeholder="Detail deliverables and SLA penalties" style={{ padding: '8px 10px', fontSize: 13 }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                <button type="button" className="btn btn-ghost" onClick={() => setVendorModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 22px', fontWeight: 700 }}>
                  {isEditingVendor ? 'Save Vendor Updates' : 'Add Vendor to System'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

