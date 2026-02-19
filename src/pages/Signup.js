import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../lib/api';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const SOCIAL_PROVIDERS = [
  { id: 'google',    label: 'Google',    color: '#4285F4', icon: 'G' },
  { id: 'facebook',  label: 'Facebook',  color: '#1877F2', icon: 'f' },
  { id: 'linkedin',  label: 'LinkedIn',  color: '#0A66C2', icon: 'in' },
  { id: 'instagram', label: 'Instagram', color: '#E4405F', icon: 'IG' },
  { id: 'apple',     label: 'Apple',     color: '#000000', icon: '\u{F8FF}' },
];

const AI_NAMES = [
  { name: 'Kova (Male)',   emoji: '🤵', tagline: 'Confident & professional', color: '#667eea' },
  { name: 'Kova (Female)', emoji: '👩‍💼', tagline: 'Warm & polished',         color: '#a855f7' },
];

const S = {
  page: {
    minHeight:'100vh',
    background:'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    display:'flex', alignItems:'center', justifyContent:'center',
    fontFamily:"'Inter',sans-serif", padding:'40px 20px',
  },
  card: {
    background:'rgba(255,255,255,0.04)',
    backdropFilter:'blur(20px)',
    border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:'16px',
    padding:'48px 44px',
    width:'100%', maxWidth:'440px',
    boxShadow:'0 32px 80px rgba(0,0,0,0.4)',
  },
  cardWide: {
    background:'rgba(255,255,255,0.04)',
    backdropFilter:'blur(20px)',
    border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:'16px',
    padding:'48px 44px',
    width:'100%', maxWidth:'580px',
    boxShadow:'0 32px 80px rgba(0,0,0,0.4)',
  },
  icon: { fontSize:'32px', marginBottom:'12px' },
  title: {
    fontFamily:"'Playfair Display',serif",
    fontWeight:600, fontSize:'26px', color:'#fff',
    marginBottom:'6px', letterSpacing:'-0.3px',
  },
  sub: { color:'rgba(255,255,255,0.4)', fontSize:'13px', marginBottom:'36px' },
  label: {
    display:'block', color:'rgba(255,255,255,0.5)', fontSize:'11px',
    fontWeight:500, letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'8px',
  },
  input: {
    width:'100%', background:'rgba(255,255,255,0.06)',
    border:'1px solid rgba(255,255,255,0.12)', borderRadius:'8px',
    padding:'13px 16px', color:'#fff', fontSize:'15px', outline:'none',
    boxSizing:'border-box', fontFamily:"'Inter',sans-serif",
  },
  field: { marginBottom:'20px' },
  btn: {
    width:'100%', background:'linear-gradient(135deg,#667eea,#764ba2)',
    border:'none', borderRadius:'8px', padding:'15px',
    color:'#fff', fontSize:'15px', fontWeight:600, cursor:'pointer',
    fontFamily:"'Inter',sans-serif", marginTop:'8px',
    boxShadow:'0 8px 32px rgba(102,126,234,0.35)',
  },
  btnDisabled: { opacity:0.6, cursor:'not-allowed' },
  error: {
    background:'rgba(255,100,100,0.1)', border:'1px solid rgba(255,100,100,0.3)',
    borderRadius:'8px', padding:'12px 16px', color:'#ff9999',
    fontSize:'13px', marginBottom:'20px',
  },
  price: {
    background:'rgba(102,126,234,0.1)', border:'1px solid rgba(102,126,234,0.25)',
    borderRadius:'8px', padding:'14px 16px', marginBottom:'24px',
    display:'flex', justifyContent:'space-between', alignItems:'center',
  },
  priceLabel: { color:'rgba(255,255,255,0.6)', fontSize:'13px' },
  priceAmount: { color:'#a0b4f7', fontSize:'16px', fontWeight:600 },
  backLink: {
    display:'inline-block', color:'rgba(255,255,255,0.3)', fontSize:'13px',
    textDecoration:'none', marginTop:'20px', cursor:'pointer',
  },
  checkboxRow: {
    display:'flex', alignItems:'flex-start', gap:'10px',
    marginTop:'16px', marginBottom:'8px',
  },
  checkbox: {
    width:'18px', height:'18px', marginTop:'2px', flexShrink:0,
    accentColor:'#667eea', cursor:'pointer',
  },
  checkboxLabel: {
    color:'rgba(255,255,255,0.5)', fontSize:'12px', lineHeight:1.5, cursor:'pointer',
  },
  link: { color:'#a0b4f7', textDecoration:'underline', cursor:'pointer' },
  terms: {
    color:'rgba(255,255,255,0.3)', fontSize:'11px', marginTop:'16px', lineHeight:1.5,
    textAlign:'center',
  },
  divider: {
    display:'flex', alignItems:'center', gap:'12px',
    margin:'20px 0', color:'rgba(255,255,255,0.2)', fontSize:'12px',
    textTransform:'uppercase', letterSpacing:'1px',
  },
  dividerLine: { flex:1, height:'1px', background:'rgba(255,255,255,0.1)' },
  socialGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'4px' },
  socialBtn: (color) => ({
    display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
    background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:'8px', padding:'11px', cursor:'pointer',
    color:'#fff', fontSize:'13px', fontWeight:500,
    fontFamily:"'Inter',sans-serif", transition:'all 0.15s',
  }),
  socialIcon: (color) => ({
    width:'20px', height:'20px', borderRadius:'4px',
    background:color, display:'flex', alignItems:'center', justifyContent:'center',
    fontSize:'11px', fontWeight:700, color:'#fff', flexShrink:0,
  }),
  socialBtnWide: {
    display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
    background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:'8px', padding:'11px', cursor:'pointer',
    color:'#fff', fontSize:'13px', fontWeight:500,
    fontFamily:"'Inter',sans-serif", gridColumn:'span 2',
  },
  // Plan selector
  planGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'20px' },
  planCard: (selected) => ({
    background: selected ? 'rgba(102,126,234,0.12)' : 'rgba(255,255,255,0.04)',
    border: selected ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.1)',
    borderRadius:'12px', padding:'16px', cursor:'pointer', transition:'all 0.15s',
    textAlign:'center',
  }),
  planName: { color:'#fff', fontWeight:600, fontSize:'15px', marginBottom:'4px' },
  planPrice: { color:'#a0b4f7', fontWeight:700, fontSize:'20px', marginBottom:'4px' },
  planDesc: { color:'rgba(255,255,255,0.4)', fontSize:'11px' },
  planBadge: {
    display:'inline-block', background:'linear-gradient(135deg,#667eea,#764ba2)',
    color:'#fff', fontSize:'9px', fontWeight:700, letterSpacing:'0.5px',
    padding:'2px 8px', borderRadius:'10px', marginBottom:'6px', textTransform:'uppercase',
  },
  // Step 2 — name selection
  nameGrid: {
    display:'grid', gridTemplateColumns:'1fr 1fr',
    gap:'16px', marginBottom:'20px',
  },
  nameCard: (selected, color) => ({
    background: selected ? `${color}18` : 'rgba(255,255,255,0.04)',
    border: selected ? `2px solid ${color}` : '1px solid rgba(255,255,255,0.1)',
    borderRadius:'12px', padding:'18px 14px', textAlign:'center',
    cursor:'pointer', transition:'all 0.15s',
  }),
  nameEmoji: { fontSize:'28px', marginBottom:'6px' },
  nameName: { color:'#fff', fontWeight:600, fontSize:'16px', marginBottom:'4px' },
  nameTag: { color:'rgba(255,255,255,0.4)', fontSize:'11px' },
  customInput: {
    width:'100%', background:'rgba(255,255,255,0.06)',
    border:'1px solid rgba(255,255,255,0.12)', borderRadius:'8px',
    padding:'12px 14px', color:'#fff', fontSize:'14px', outline:'none',
    boxSizing:'border-box', fontFamily:"'Inter',sans-serif",
    marginTop:'12px',
  },
};

export default function Signup() {
  const [searchParams] = useSearchParams();
  const [step, setStep]                   = useState(1);
  const [name, setName]                   = useState('');
  const [email, setEmail]                 = useState('');
  const [password, setPassword]           = useState('');
  const [plan, setPlan]                   = useState(searchParams.get('plan') === 'pro' ? 'pro' : 'assistant');
  const [agreed, setAgreed]               = useState(false);
  const [assistantName, setAssistantName] = useState('');
  const [customName, setCustomName]       = useState('');
  const [isCustom, setIsCustom]           = useState(false);
  const [error, setError]                 = useState('');
  const [loading, setLoading]             = useState(false);
  const navigate = useNavigate();

  function handleStep1(e) {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!agreed) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }
    setStep(2);
  }

  function selectName(n) {
    setAssistantName(n);
    setIsCustom(false);
    setCustomName('');
  }

  function selectCustom() {
    setIsCustom(true);
    setAssistantName('');
  }

  async function handleSubmit() {
    setError('');
    const finalName = isCustom ? customName.trim() : assistantName;
    if (!finalName) {
      setError('Please choose a name for your Kova assistant');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/api/signup', {
        name, email, password, plan,
        assistant_name: finalName,
      });
      window.location.href = res.data.checkoutUrl;
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = isCustom ? customName.trim().length > 0 : assistantName.length > 0;

  // ── Step 1: Account details ─────────────────────────────────────────────────
  if (step === 1) {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <div style={S.icon}>🤖</div>
          <div style={S.title}>Get Your Kova Assistant</div>
          <div style={S.sub}>Step 1 of 2 — Create your account</div>

          {/* Social signup buttons */}
          <div style={S.socialGrid}>
            {SOCIAL_PROVIDERS.slice(0, 4).map(p => (
              <div key={p.id} style={S.socialBtn(p.color)}
                onClick={() => { window.location.href = `${API_URL}/api/auth/social/${p.id}?signup=true`; }}>
                <div style={S.socialIcon(p.color)}>{p.icon}</div>
                <span>{p.label}</span>
              </div>
            ))}
            <div style={S.socialBtnWide}
              onClick={() => { window.location.href = `${API_URL}/api/auth/social/apple?signup=true`; }}>
              <div style={S.socialIcon('#000')}>{'\u{F8FF}'}</div>
              <span>Apple</span>
            </div>
          </div>

          <div style={S.divider}>
            <div style={S.dividerLine} />
            <span>or sign up with email</span>
            <div style={S.dividerLine} />
          </div>

          <div style={S.planGrid}>
            <div style={S.planCard(plan === 'assistant')} onClick={() => setPlan('assistant')}>
              <div style={S.planName}>Standard</div>
              <div style={S.planPrice}>$49.99</div>
              <div style={S.planDesc}>30 messages/day</div>
            </div>
            <div style={S.planCard(plan === 'pro')} onClick={() => setPlan('pro')}>
              <div style={S.planBadge}>Popular</div>
              <div style={S.planName}>Pro</div>
              <div style={S.planPrice}>$149.99</div>
              <div style={S.planDesc}>100 messages/day</div>
            </div>
          </div>

          {error && <div style={S.error}>{error}</div>}

          <form onSubmit={handleStep1}>
            <div style={S.field}>
              <label style={S.label}>Full Name</label>
              <input style={S.input} required value={name}
                onChange={e => setName(e.target.value)} placeholder="Your full name" />
            </div>
            <div style={S.field}>
              <label style={S.label}>Email</label>
              <input style={S.input} type="email" required value={email}
                onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div style={S.field}>
              <label style={S.label}>Password</label>
              <input style={S.input} type="password" required value={password}
                onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" />
            </div>
            <div style={S.checkboxRow}>
              <input type="checkbox" style={S.checkbox} id="agree"
                checked={agreed} onChange={e => setAgreed(e.target.checked)} />
              <label htmlFor="agree" style={S.checkboxLabel}>
                I agree to the{' '}
                <span style={S.link} onClick={e => { e.preventDefault(); navigate('/terms'); }}>Terms of Service</span>
                {' '}and{' '}
                <span style={S.link} onClick={e => { e.preventDefault(); navigate('/privacy'); }}>Privacy Policy</span>.
                I understand that the AI assistant may make mistakes and that Kova is not liable
                for actions taken on my behalf.
              </label>
            </div>
            <button style={{ ...S.btn, ...((!agreed) ? S.btnDisabled : {}) }} type="submit" disabled={!agreed}>
              Next: Choose Your Assistant →
            </button>
          </form>

          <div style={S.terms}>
            {plan === 'pro' ? '$149.99' : '$49.99'}/month. Cancel anytime. {plan === 'pro' ? '100' : '30'} messages/day included.
          </div>

          <div style={{ textAlign:'center' }}>
            <span style={S.backLink} onClick={() => navigate('/')}>← Back to home</span>
            <span style={{ ...S.backLink, marginLeft:'16px' }} onClick={() => navigate('/portal/login')}>
              Already have an account? Sign in
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ── Step 2: Choose AI assistant name ───────────────────────────────────────
  return (
    <div style={S.page}>
      <div style={S.cardWide}>
        <div style={S.icon}>✨</div>
        <div style={S.title}>Choose Your Kova Voice</div>
        <div style={S.sub}>Step 2 of 2 — Pick a voice for your assistant</div>

        {error && <div style={S.error}>{error}</div>}

        <div style={S.nameGrid}>
          {AI_NAMES.map(ai => (
            <div
              key={ai.name}
              style={S.nameCard(assistantName === ai.name && !isCustom, ai.color)}
              onClick={() => selectName(ai.name)}
            >
              <div style={S.nameEmoji}>{ai.emoji}</div>
              <div style={S.nameName}>{ai.name}</div>
              <div style={S.nameTag}>{ai.tagline}</div>
            </div>
          ))}
          <div
            style={S.nameCard(isCustom, '#9ca3af')}
            onClick={selectCustom}
          >
            <div style={S.nameEmoji}>✏️</div>
            <div style={S.nameName}>Other</div>
            <div style={S.nameTag}>Choose your own</div>
          </div>
        </div>

        {isCustom && (
          <input
            style={S.customInput}
            value={customName}
            onChange={e => setCustomName(e.target.value)}
            placeholder="Enter a custom name..."
            autoFocus
          />
        )}

        <button
          style={{ ...S.btn, ...(loading || !canSubmit ? S.btnDisabled : {}), marginTop:'16px' }}
          disabled={loading || !canSubmit}
          onClick={handleSubmit}
        >
          {loading ? 'Setting up...' : 'Continue to Payment →'}
        </button>

        <div style={{ textAlign:'center' }}>
          <span style={S.backLink} onClick={() => { setStep(1); setError(''); }}>
            ← Back to account details
          </span>
        </div>
      </div>
    </div>
  );
}
