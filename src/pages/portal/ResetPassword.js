import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import customerApi from '../../lib/customerApi';

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
  logoImg: { height: '48px', width: '48px', objectFit: 'contain', marginBottom: '12px' },
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
  success: {
    background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)',
    borderRadius: '8px', padding: '12px 16px', color: '#34d399',
    fontSize: '13px', marginBottom: '20px',
  },
  link: {
    display: 'block', textAlign: 'center', marginTop: '24px',
    color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none',
  },
};

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot password form (no token)
  async function handleForgot(e) {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      await customerApi.post('/api/customer/forgot-password', { email });
      setSuccess('If an account exists with that email, you\'ll receive a reset link shortly.');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally { setLoading(false); }
  }

  // Reset password form (has token)
  async function handleReset(e) {
    e.preventDefault();
    setError(''); setSuccess('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      await customerApi.post('/api/customer/reset-password', { token, password });
      setSuccess('Password reset successfully! You can now sign in.');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally { setLoading(false); }
  }

  return (
    <div style={C.page}>
      <div style={C.card}>
        <img src="/kova-logo.svg" alt="Kova" style={C.logoImg} />
        <div style={C.title}>Kova</div>

        {token ? (
          <>
            <div style={C.sub}>Enter your new password</div>
            {error && <div style={C.error}>{error}</div>}
            {success && <div style={C.success}>{success}</div>}
            {!success && (
              <form onSubmit={handleReset}>
                <div style={C.field}>
                  <label style={C.label}>New Password</label>
                  <input style={C.input} type="password" required value={password}
                    onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters"
                    minLength={8} />
                </div>
                <div style={C.field}>
                  <label style={C.label}>Confirm Password</label>
                  <input style={C.input} type="password" required value={confirm}
                    onChange={e => setConfirm(e.target.value)} placeholder="Re-enter password" />
                </div>
                <button style={C.btn} type="submit" disabled={loading}>
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            )}
          </>
        ) : (
          <>
            <div style={C.sub}>Enter your email to receive a password reset link</div>
            {error && <div style={C.error}>{error}</div>}
            {success && <div style={C.success}>{success}</div>}
            {!success && (
              <form onSubmit={handleForgot}>
                <div style={C.field}>
                  <label style={C.label}>Email</label>
                  <input style={C.input} type="email" required value={email}
                    onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
                </div>
                <button style={C.btn} type="submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            )}
          </>
        )}

        <Link to="/portal/login" style={C.link}>Back to sign in</Link>
      </div>
    </div>
  );
}
