import React, { useState } from 'react';
import { proposals } from '../../data/commercialData';
import AiCopilotModal from '../common/AiCopilotModal';

const statusConfig = {
  draft: { label: 'Draft', badgeClass: 'badge-neutral' },
  sent: { label: 'Sent to Sponsor', badgeClass: 'badge-warning' },
  accepted: { label: 'Accepted & Confirmed', badgeClass: 'badge-success' },
  declined: { label: 'Declined', badgeClass: 'badge-danger' },
};

const fmtAED = (n) => `AED ${(n || 0).toLocaleString()}`;
const fmtAEDK = (n) => `AED ${((n || 0) / 1000).toFixed(0)}K`;

export default function Proposals({ onNavigate, navParams }) {
  const matchedProp = navParams?.stallId ? proposals.find(p => p.stall === navParams.stallId) : null;
  const [selected, setSelected] = useState(matchedProp ? matchedProp.id : proposals[0]?.id);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiGeneratedEmail, setAiGeneratedEmail] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);

  const prop = proposals.find(p => p.id === selected) || proposals[0];

  const handleGenerateAiEmail = () => {
    setIsGeneratingEmail(true);
    setTimeout(() => {
      setAiGeneratedEmail(`Subject: Partnership Proposal: ${prop.sponsor} × QIDS UAE Talent Hunt & Awards 2026

Dear ${prop.contact},

On behalf of HS Media World and Suie Events Production, it is our pleasure to invite ${prop.sponsor} as an official ${prop.package} Sponsor for the upcoming QIDS UAE Talent Hunt & Awards 2026, taking place on 3rd October 2026 at GIIS School, Dubai.

As the UAE's most prestigious youth talent & future icon platform, this event gathers 2,500+ attendees, leading educators, celebrity jury members, and top family demographics across Dubai, Abu Dhabi & Sharjah.

Key Partnership Highlights for ${prop.sponsor}:
• Exclusive Stall Placement at ${prop.stall}
• High-Impact Tier: ${prop.package} Sponsor (${fmtAED(prop.total)})
• Value Add-ons Included: ${prop.addOns.join(', ')}
• Guaranteed Reach: 350,000+ multi-channel views & digital broadcasts

Please find attached the official sponsorship document. We would love to schedule a brief 15-minute briefing call this week to finalize the assets.

Warm regards,
Commercial Partnerships Team
HS Media World | Dubai, UAE`);
      setIsGeneratingEmail(false);
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(aiGeneratedEmail);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title" style={{ margin: 0, fontSize: 'clamp(20px, 2.5vw, 26px)' }}>Sponsorship Proposals</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>
            Manage customized proposals, AI pitch decks, and commercial contracts in AED
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setAiModalOpen(true)}>
            ✨ AI Pitch Assistant
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('packages')}>
            + Create New Proposal
          </button>
        </div>
      </div>

      {/* Main Responsive Split Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 340px) minmax(0, 1fr)',
        gap: 20,
        minHeight: 520,
      }} className="proposals-responsive-grid">

        {/* Left Proposals List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Active Proposals ({proposals.length})
          </div>

          {proposals.map(p => {
            const cfg = statusConfig[p.status] || statusConfig.draft;
            const isSelected = selected === p.id;
            return (
              <div
                key={p.id}
                className="card card-interactive"
                style={{
                  padding: '14px 16px', cursor: 'pointer',
                  border: `1.5px solid ${isSelected ? 'var(--brand)' : 'var(--border)'}`,
                  background: isSelected ? 'rgba(246, 145, 35, 0.12)' : 'var(--surface)',
                  borderRadius: 12, transition: 'all 0.15s ease'
                }}
                onClick={() => { setSelected(p.id); setAiGeneratedEmail(''); }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 14.5 }}>{p.sponsor}</span>
                  <span className={`badge ${cfg.badgeClass}`} style={{ fontSize: 9.5 }}>{cfg.label}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  {p.package} Tier · Stall {p.stall} · Ref: {p.id}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 900, color: 'var(--brand)', fontSize: 15 }}>{fmtAED(p.total)}</span>
                  <span style={{ fontSize: 10.5, color: 'var(--text-secondary)' }}>Valid till {p.validity}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Proposal Preview Card */}
        {prop && (
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: 'var(--shadow-md)'
          }}>
            {/* Proposal Banner */}
            <div style={{
              padding: '20px 24px', borderBottom: '1px solid var(--border)',
              background: 'linear-gradient(135deg, rgba(246, 145, 35, 0.12), transparent)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14
            }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                  Official Partnership Agreement · {prop.id}
                </div>
                <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 4 }}>
                  Sponsorship Proposal for {prop.sponsor}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  Attn: <strong style={{ color: 'var(--text-primary)' }}>{prop.contact}</strong> ({prop.email}) · Created {prop.createdAt}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleGenerateAiEmail}
                  disabled={isGeneratingEmail}
                  style={{ gap: 6 }}
                >
                  <span>✨</span> {isGeneratingEmail ? 'Writing…' : 'AI Pitch Email'}
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onNavigate('pipeline', { highlight: prop.stall })}
                >
                  Convert to Pipeline Won
                </button>
              </div>
            </div>

            {/* Proposal Content */}
            <div style={{ padding: '22px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* AI Generated Email Preview Box (If generated) */}
              {aiGeneratedEmail && (
                <div style={{
                  background: 'var(--surface-3)', border: '1px solid rgba(246, 145, 35, 0.3)',
                  borderRadius: 12, padding: '16px 20px', animation: 'fadeIn 0.2s ease-out'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--brand)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>✨</span> AI Generated Executive Email Draft
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="btn btn-ghost btn-sm"
                      style={{ fontSize: 11, padding: '4px 10px' }}
                    >
                      {emailCopied ? '✓ Copied' : '📋 Copy to Clipboard'}
                    </button>
                  </div>
                  <pre style={{
                    margin: 0, fontSize: 12, color: 'var(--text-primary)',
                    whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.6
                  }}>
                    {aiGeneratedEmail}
                  </pre>
                </div>
              )}

              {/* Sponsor & Venue Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>
                    Sponsor Information
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)', marginBottom: 2 }}>{prop.sponsor}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{prop.contact}</div>
                  <div style={{ fontSize: 12, color: 'var(--brand)', marginTop: 2 }}>{prop.email}</div>
                </div>

                <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>
                    Allocated Venue Space
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)', marginBottom: 2 }}>Stall {prop.stall}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>GIIS School, Dubai (Venue Partner)</div>
                  <div style={{ fontSize: 12, color: 'var(--text-primary)', marginTop: 2 }}>Event Date: 3rd October 2026</div>
                </div>
              </div>

              {/* Package & Addons */}
              <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 8 }}>
                  Package Inclusions & Deliverables
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--brand)', marginBottom: 10 }}>
                  {prop.package} Tier Partnership
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {prop.addOns.map((a, i) => (
                    <span key={i} style={{ fontSize: 12, background: 'rgba(246, 145, 35, 0.12)', border: '1px solid rgba(246, 145, 35, 0.25)', color: 'var(--text-primary)', padding: '5px 10px', borderRadius: 8, fontWeight: 600 }}>
                      ✓ {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Financial Breakdown in AED */}
              <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 12 }}>
                  Commercial Investment Schedule (AED)
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Stall Space Fee ({prop.stall}):</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{fmtAED(prop.basePrice)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{prop.package} Package Entitlements:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{fmtAED(prop.packagePrice)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Custom Add-on Activations:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{fmtAED(prop.addOnsPrice)}</span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>Total Investment (Excl. VAT):</span>
                    <span style={{ fontSize: 20, fontWeight: 900, color: 'var(--brand)' }}>{fmtAED(prop.total)}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      <AiCopilotModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        defaultPrompt={`Generate a high-converting sponsorship pitch for ${prop?.sponsor} for ${prop?.package} tier at QIDS UAE 2026 valued at ${fmtAED(prop?.total)}.`}
      />
    </div>
  );
}
