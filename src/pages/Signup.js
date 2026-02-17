import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

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
};

export default function Signup() {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [agreed, setAgreed]     = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
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

    setLoading(true);
    try {
      const res = await api.post('/api/signup', { name, email, password });
      // Redirect to Stripe Checkout
      window.location.href = res.data.checkoutUrl;
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.icon}>🤖</div>
        <div style={S.title}>Get Your AI Assistant</div>
        <div style={S.sub}>Create your account — you'll be redirected to complete payment</div>

        <div style={S.price}>
          <span style={S.priceLabel}>AI Assistant — monthly</span>
          <span style={S.priceAmount}>$49.99/mo</span>
        </div>

        {error && <div style={S.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
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
              I understand that the AI assistant may make mistakes and that AutoBookAI is not liable
              for actions taken on my behalf.
            </label>
          </div>
          <button style={{ ...S.btn, ...(loading || !agreed ? S.btnDisabled : {}) }} type="submit" disabled={loading || !agreed}>
            {loading ? 'Setting up...' : 'Continue to Payment →'}
          </button>
        </form>

        <div style={S.terms}>
          $49.99/month. Cancel anytime. 30 messages/day included.
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
