import React, { useState, useEffect } from 'react';

const promptPresets = [
  {
    category: 'Commercial',
    icon: '💼',
    label: 'Recommend High-Value Sponsors',
    prompt: 'Analyze QIDS UAE 2026 demographic and recommend the top 3 sponsor sectors with estimated package value in AED.',
    response: `### 🎯 AI Recommended Sponsor Target Sectors (QIDS UAE 2026)

Based on a high-affluence UAE family & youth demographic at GIIS School Dubai:

1. **EdTech & Robotics Academies (e.g., Byju’s MENA / Geek Express)**
   - **Recommended Space:** Hall A Premium Stall (A-03 / A-04)
   - **Recommended Tier:** Gold Sponsor (**AED 300,000**)
   - **Value Hook:** Interactive STEM showcase booth + 15-min judging segment on future innovation.

2. **Youth Banking & Digital Wallets (e.g., Liv. by Emirates NBD / ADCB Hayyak)**
   - **Recommended Space:** Hall C Experience Stall (C-01)
   - **Recommended Tier:** Platinum Sponsor (**AED 500,000**)
   - **Value Hook:** Naming rights to Main Stage + exclusive cashless gamified registration token.

3. **Family Health & Nutrition Brands (e.g., Almarai / Lacnor)**
   - **Recommended Space:** Hall B Standard Stall (B-05) + Food Zone
   - **Recommended Tier:** Silver Sponsor (**AED 150,000**) + Social Amplification Pack.`,
  },
  {
    category: 'Venue & Map',
    icon: '🗺️',
    label: 'Optimize Floor Plan Footfall',
    prompt: 'How can we maximize sponsor booth footfall between Hall A and Hall C at GIIS Dubai?',
    response: `### 📍 AI Spatial Traffic Optimization Strategy

1. **Dynamic Prize Passport Trail:**
   - Place 3 stamp stations in Hall B (B-02, B-04) and Hall C (C-01) required for the Grand Kids Talent Lucky Draw on the Main Stage.
2. **Synchronized Aisle Schedule:**
   - Stagger stage talent auditions with 15-minute intermissions that direct crowds through Hall C's Experience Zone.
3. **VIP / Celebrity Walkway:**
   - Position the Creator & VIP entrance near Hall A (A-01/A-02) to maintain a continuous high-traffic corridor.`,
  },
  {
    category: 'Marketing',
    icon: '📱',
    label: 'Generate Viral TikTok / IG Blitz',
    prompt: 'Draft an engaging social announcement copy for the QIDS UAE 2026 Talent Hunt launch.',
    response: `### 🌟 High-Engagement Social Copy (QIDS UAE 2026)

**Headline:** 🇦🇪 Is Your Kid the Next UAE Icon? Auditions Open for QIDS UAE 2026! 🌟

**Body:**
Calling all young singers, dancers, innovators, and creators across Dubai, Abu Dhabi & Sharjah! ✨
Join us on **3rd October 2026** at **GIIS School, Dubai** for the most prestigious youth awards in the Middle East.

🏆 Over AED 100,000 in scholarships & awards
🎬 Celebrity Jury & Talent Scouts in attendance
🎁 Exclusive gifts for every participant

👉 Tap the link in bio to register your entry before slots fill up!
#QIDSUAE #KidsFutureIconicAwards #DubaiTalentHunt #HSMediaWorld #UAEKids`,
  },
  {
    category: 'Operations',
    icon: '⚡',
    label: 'Live Incident Response Plan',
    prompt: 'Generate an emergency crowd management SOP for the Main Stage during peak talent finals.',
    response: `### 🛡️ Main Stage Crowd Control SOP

1. **Capacity Threshold:** Max 650 seated guests in Main Hall. Auto-trigger buffer waiting area at Registration foyer once 90% reached.
2. **Aisle Clearance Protocol:** Security marshals to keep Aisles 1 & 2 100% obstruction-free for medical access.
3. **Parent-Kid Reconnect Zone:** Designated station at Entrance Booth E-01 with radio link to MC on stage.`,
  },
];

export default function AiCopilotModal({ isOpen, onClose, defaultPrompt }) {
  const [query, setQuery] = useState(defaultPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRunPrompt = (promptText) => {
    setQuery(promptText);
    setIsLoading(true);
    setResponse('');

    const preset = promptPresets.find(p => p.prompt.toLowerCase() === promptText.toLowerCase() || promptText.includes(p.category));
    const fullText = preset ? preset.response : `### 🤖 AI Event Intelligence Analysis

**Query:** "${promptText}"

**Key Insights for QIDS UAE 2026:**
- **Target Audience:** UAE Families, School Administrators, Brand Decision-Makers.
- **Projected Attendance:** 2,500+ attendees at GIIS School Dubai.
- **Action Recommendation:** Align commercial packages with experiential activations to maximize sponsor ROI.
- **Estimated AED Impact:** +18% commercial conversion with customized proposal decks.`;

    let i = 0;
    const interval = setInterval(() => {
      i += 18;
      setResponse(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 20);
  };

  useEffect(() => {
    if (isOpen && defaultPrompt) {
      handleRunPrompt(defaultPrompt);
    }
  }, [isOpen, defaultPrompt]);

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16, animation: 'fadeIn 0.2s ease-out',
    }}>
      <div style={{
        width: '100%', maxWidth: 720, maxHeight: '88vh',
        background: 'var(--surface)', border: '1px solid rgba(246, 145, 35, 0.3)',
        borderRadius: 16, display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(246, 145, 35, 0.15)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'linear-gradient(90deg, rgba(246, 145, 35, 0.12), transparent)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg, #F69123, #d97706)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#000', fontSize: 16, fontWeight: 900,
              boxShadow: '0 2px 10px rgba(246, 145, 35, 0.4)'
            }}>
              ✨
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                AI Event Copilot
                <span style={{ fontSize: 10, padding: '2px 6px', background: 'rgba(246, 145, 35, 0.2)', color: 'var(--brand)', borderRadius: 99, fontWeight: 700 }}>
                  PRO
                </span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                Powered intelligence for QIDS UAE Talent Hunt 2026
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--surface-3)', border: '1px solid var(--border)',
              color: 'var(--text-secondary)', borderRadius: 8, width: 30, height: 30,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            ✕
          </button>
        </div>

        {/* Quick Prompt Presets */}
        <div style={{
          padding: '12px 20px', borderBottom: '1px solid var(--border)',
          background: 'var(--surface-2)', display: 'flex', gap: 8, overflowX: 'auto', flexShrink: 0
        }}>
          {promptPresets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleRunPrompt(p.prompt)}
              style={{
                padding: '6px 12px', borderRadius: 99,
                background: 'var(--surface-3)', border: '1px solid var(--border)',
                color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6,
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              <span>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {response ? (
            <div style={{
              background: 'var(--surface-3)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '16px 20px', lineHeight: 1.6,
              color: 'var(--text-primary)', fontSize: 13.5, position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                <button
                  onClick={handleCopy}
                  className="btn btn-ghost btn-sm"
                  style={{ fontSize: 11, padding: '4px 10px', gap: 4 }}
                >
                  {copied ? '✓ Copied' : '📋 Copy text'}
                </button>
              </div>
              <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                {response}
              </div>
            </div>
          ) : (
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)'
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
                What would you like to optimize?
              </div>
              <div style={{ fontSize: 12.5, maxWidth: 420 }}>
                Select a quick workflow above or type your question below for instant commercial insights, sponsor package recommendations, or spatial floor plan analysis.
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); if (query.trim()) handleRunPrompt(query); }}
          style={{
            padding: '14px 20px', borderTop: '1px solid var(--border)',
            background: 'var(--surface-2)', display: 'flex', gap: 10
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AI Copilot (e.g., 'Generate custom proposal pitch for Emirates')..."
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 8,
              background: 'var(--surface-3)', border: '1px solid var(--border)',
              color: 'var(--text-primary)', fontSize: 13, outline: 'none',
              transition: 'border-color 0.15s'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--brand)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="btn btn-primary"
            style={{ padding: '0 18px', gap: 6, opacity: isLoading || !query.trim() ? 0.6 : 1 }}
          >
            {isLoading ? 'Thinking…' : 'Generate'}
          </button>
        </form>
      </div>
    </div>
  );
}
