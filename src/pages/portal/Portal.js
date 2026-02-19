import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import customerApi from '../../lib/customerApi';

const S = {
  page: { minHeight: '100vh', background: '#f8f5f0', fontFamily: "'Inter',sans-serif", color: '#1a1a1a' },
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 20px', height: '64px',
    background: '#fff', borderBottom: '1px solid #ede8e1',
  },
  logo: { fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: '20px' },
  navRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  userName: { color: '#999', fontSize: '13px' },
  logoutBtn: {
    background: 'transparent', border: '1px solid #e5e0d8', borderRadius: '6px',
    color: '#666', padding: '6px 14px', cursor: 'pointer', fontSize: '13px',
  },
  main: { padding: '32px 20px', maxWidth: '900px', margin: '0 auto' },
  h1: {
    fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: '28px',
    marginBottom: '6px',
  },
  sub: { color: '#999', fontSize: '14px', marginBottom: '40px' },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' },
  card: {
    background: '#fff', border: '1px solid #ede8e1', borderRadius: '12px',
    padding: '24px 28px',
  },
  cardLabel: {
    color: '#999', fontSize: '11px', fontWeight: 600, letterSpacing: '1px',
    textTransform: 'uppercase', marginBottom: '8px',
  },
  cardValue: { fontSize: '18px', fontWeight: 500 },
  badge: (s) => ({
    display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
    background: s === 'active' ? '#e8f5e9' : s === 'error' ? '#ffebee' : '#f5f5f5',
    color: s === 'active' ? '#2e7d32' : s === 'error' ? '#c62828' : '#757575',
  }),
  linksGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' },
  linkCard: {
    background: '#fff', border: '1px solid #ede8e1', borderRadius: '12px',
    padding: '28px 24px', cursor: 'pointer', textAlign: 'center',
  },
  linkIcon: { fontSize: '28px', marginBottom: '12px' },
  linkTitle: { fontSize: '14px', fontWeight: 600, marginBottom: '4px' },
  linkSub: { color: '#999', fontSize: '12px' },
  whatsappTip: {
    background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.2)',
    borderRadius: '12px', padding: '20px 24px', marginBottom: '40px',
    fontSize: '14px', color: '#1a1a1a', lineHeight: 1.6,
  },
};

export default function Portal() {
  const [me, setMe] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [error, setError] = useState(null);

  // Handle OAuth redirect — store token from URL params
  useEffect(() => {
    const token = searchParams.get('token');
    const name = searchParams.get('name');
    const id = searchParams.get('id');
    const email = searchParams.get('email');
    if (token && id) {
      localStorage.setItem('customerToken', token);
      localStorage.setItem('customer', JSON.stringify({
        id: parseInt(id), name: decodeURIComponent(name || ''), email: decodeURIComponent(email || ''),
      }));
      // Clean URL
      window.history.replaceState({}, '', '/portal');
    }
  }, [searchParams]);

  useEffect(() => {
    customerApi.get('/api/customer/me').then(r => setMe(r.data)).catch(() => setError('Failed to load your account'));
  }, []);

  function logout() {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customer');
    navigate('/portal/login');
  }

  async function openBilling() {
    try {
      const r = await customerApi.post('/api/customer/billing/portal');
      window.open(r.data.url, '_blank');
    } catch { alert('Failed to open billing portal'); }
  }

  if (error) return (
    <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6b6b' }}>
      {error}
    </div>
  );

  if (!me) return (
    <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
      Loading...
    </div>
  );

  return (
    <div style={S.page}>
      <nav style={S.nav}>
        <span style={S.logo}>My Kova</span>
        <div style={S.navRight}>
          <span style={S.userName}>{me.name}</span>
          <button style={S.logoutBtn} onClick={logout}>Sign out</button>
        </div>
      </nav>

      <div style={S.main}>
        <div style={S.h1}>Welcome, {me.name.split(' ')[0]}</div>
        <div style={S.sub}>Your personal Kova dashboard</div>

        {me.whatsapp_to && (
          <div style={S.whatsappTip}>
            <strong>Your WhatsApp AI number:</strong>{' '}
            <span style={{ fontFamily: 'monospace', color: '#25D366', fontWeight: 700 }}>
              {me.whatsapp_to}
            </span>
            <br />
            Save this number in your contacts and send a message to start using Kova.
          </div>
        )}

        <div style={S.grid3}>
          <div style={S.card}>
            <div style={S.cardLabel}>WhatsApp Number</div>
            <div style={{ ...S.cardValue, color: '#25D366', fontFamily: 'monospace', fontSize: '16px' }}>
              {me.whatsapp_to || 'Being assigned...'}
            </div>
          </div>
          <div style={S.card}>
            <div style={S.cardLabel}>Kova Agent</div>
            <div style={S.cardValue}>
              <span style={S.badge(me.subscription_status === 'active' ? 'active' : 'inactive')}>
                {me.subscription_status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          <div style={S.card}>
            <div style={S.cardLabel}>Subscription</div>
            <div style={S.cardValue}>
              <span style={S.badge(me.subscription_status)}>{me.subscription_status}</span>
            </div>
          </div>
        </div>

        <div style={S.linksGrid}>
          <div style={S.linkCard} onClick={() => navigate('/portal/preferences')}>
            <div style={S.linkIcon}>⚙️</div>
            <div style={S.linkTitle}>My Preferences</div>
            <div style={S.linkSub}>Dining, travel, loyalty programs</div>
          </div>
          <div style={S.linkCard} onClick={() => navigate('/portal/activity')}>
            <div style={S.linkIcon}>📋</div>
            <div style={S.linkTitle}>Activity Log</div>
            <div style={S.linkSub}>Recent messages and actions</div>
          </div>
          <div style={S.linkCard} onClick={openBilling}>
            <div style={S.linkIcon}>💳</div>
            <div style={S.linkTitle}>Manage Billing</div>
            <div style={S.linkSub}>Payment method, invoices</div>
          </div>
        </div>
      </div>
    </div>
  );
}
