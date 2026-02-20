import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import customerApi from '../../lib/customerApi';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const SOCIAL_PROVIDERS = [
  { id: 'google',    label: 'Google',    color: '#4285F4', icon: 'G' },
  { id: 'facebook',  label: 'Facebook',  color: '#1877F2', icon: 'f' },
  { id: 'apple',     label: 'Apple',     color: '#000000', icon: '\uF8FF' },
  { id: 'linkedin',  label: 'LinkedIn',  color: '#0A66C2', icon: 'in' },
  { id: 'instagram', label: 'Instagram', color: '#E4405F', icon: 'IG' },
  { id: 'tiktok',    label: 'TikTok',    color: '#000000', icon: 'TT' },
];

const C = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '48px 44px',
    width: '100%', maxWidth: '420px',
    boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
  },
  crown: { fontSize: '28px', marginBottom: '12px' },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 600, fontSize: '26px', color: '#fff',
    marginBottom: '6px', letterSpacing: '-0.3px',
  },
  sub: { color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '32px' },
  label: {
    display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '11px',
    fontWeight: 500, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '8px',
  },
  input: {
    width: '100%', background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px',
    padding: '13px 16px', color: '#fff', fontSize: '15px', outline: 'none',
    boxSizing: 'border-box', fontFamily: "'Inter', sans-serif",
    transition: 'border-color 0.2s',
  },
  field: { marginBottom: '20px' },
  btn: {
    width: '100%', background: 'linear-gradient(135deg, #667eea, #764ba2)',
    border: 'none', borderRadius: '8px', padding: '15px',
    color: '#fff', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
    fontFamily: "'Inter', sans-serif", marginTop: '8px',
    boxShadow: '0 8px 32px rgba(102,126,234,0.35)',
  },
  error: {
    background: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.3)',
    borderRadius: '8px', padding: '12px 16px', color: '#ff9999',
    fontSize: '13px', marginBottom: '20px',
  },
  link: {
    display: 'block', textAlign: 'center', marginTop: '24px',
    color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none',
  },
  divider: {
    display: 'flex', alignItems: 'center', gap: '12px',
    margin: '24px 0', color: 'rgba(255,255,255,0.2)', fontSize: '12px',
    textTransform: 'uppercase', letterSpacing: '1px',
  },
  dividerLine: { flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' },
  socialGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '4px',
  },
  socialBtn: (color) => ({
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px', padding: '12px', cursor: 'pointer',
    color: '#fff', fontSize: '13px', fontWeight: 500,
    fontFamily: "'Inter', sans-serif", transition: 'all 0.15s',
    textDecoration: 'none',
  }),
  socialIcon: (color) => ({
    width: '22px', height: '22px', borderRadius: '4px',
    background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '12px', fontWeight: 700, color: '#fff', flexShrink: 0,
  }),
  socialBtnWide: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px', padding: '12px', cursor: 'pointer',
    color: '#fff', fontSize: '13px', fontWeight: 500,
    fontFamily: "'Inter', sans-serif", transition: 'all 0.15s',
    textDecoration: 'none', gridColumn: 'span 2',
  },
};

export default function PortalLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Handle OAuth callback redirect (token in URL params)
  useEffect(() => {
    const token = searchParams.get('token');
    const name = searchParams.get('name');
    const id = searchParams.get('id');
    const oauthEmail = searchParams.get('email');
    const oauthError = searchParams.get('error');

    if (oauthError) {
      setError(decodeURIComponent(oauthError));
    }

    if (token && id) {
      localStorage.setItem('customerToken', token);
      localStorage.setItem('customer', JSON.stringify({
        id: parseInt(id), name: decodeURIComponent(name || ''), email: decodeURIComponent(oauthEmail || ''),
      }));
      navigate('/portal');
    }
  }, [searchParams, navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await customerApi.post('/api/customer/login', { email, password });
      localStorage.setItem('customerToken', res.data.token);
      localStorage.setItem('customer', JSON.stringify(res.data.customer));
      navigate('/portal');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally { setLoading(false); }
  }

  function socialLogin(provider) {
    window.location.href = `${API_URL}/api/auth/social/${provider}`;
  }

  return (
    <div style={C.page}>
      <div style={C.card}>
        <div style={C.crown}>🤖</div>
        <div style={C.title}>Kova</div>
        <div style={C.sub}>Sign in to manage your preferences and billing</div>

        {error && <div style={C.error}>{error}</div>}

        {/* Social login buttons */}
        <div style={C.socialGrid}>
          {SOCIAL_PROVIDERS.map(p => (
            <div key={p.id} style={C.socialBtn(p.color)} onClick={() => socialLogin(p.id)}>
              <div style={C.socialIcon(p.color)}>{p.icon}</div>
              <span>{p.label}</span>
            </div>
          ))}
        </div>

        <div style={C.divider}>
          <div style={C.dividerLine} />
          <span>or sign in with email</span>
          <div style={C.dividerLine} />
        </div>

        <form onSubmit={handleLogin}>
          <div style={C.field}>
            <label style={C.label}>Email</label>
            <input style={C.input} type="email" required value={email}
              onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div style={C.field}>
            <label style={C.label}>Password</label>
            <input style={C.input} type="password" required value={password}
              onChange={e => setPassword(e.target.value)} placeholder="••••••••••" />
          </div>
          <button style={C.btn} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <Link to="/signup" style={C.link}>Don't have an account? Sign up</Link>
      </div>
    </div>
  );
}
