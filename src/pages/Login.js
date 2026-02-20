import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

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
    padding: '52px 48px',
    width: '100%', maxWidth: '420px',
    boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
  },
  logoImg: { height: '48px', width: '48px', objectFit: 'contain', marginBottom: '12px' },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 600, fontSize: '26px', color: '#fff',
    marginBottom: '6px', letterSpacing: '-0.3px',
  },
  sub: { color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '40px' },
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
};

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('admin', JSON.stringify(res.data.admin));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally { setLoading(false); }
  }

  return (
    <div style={C.page}>
      <div style={C.card}>
        <img src="/kova-logo.png" alt="Kova" style={C.logoImg} />
        <div style={C.title}>Kova</div>
        <div style={C.sub}>Admin portal — manage your Kova clients</div>

        {error && <div style={C.error}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={C.field}>
            <label style={C.label}>Email</label>
            <input style={C.input} type="email" required value={email}
              onChange={e => setEmail(e.target.value)} placeholder="admin@yourbusiness.com" />
          </div>
          <div style={C.field}>
            <label style={C.label}>Password</label>
            <input style={C.input} type="password" required value={password}
              onChange={e => setPassword(e.target.value)} placeholder="••••••••••" />
          </div>
          <button style={C.btn} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  );
}
