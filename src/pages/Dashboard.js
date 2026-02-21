import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

const PLAN_PRICE = 25;

/* ── Inline Styles ─────────────────────────────────────────────────── */
const G = {
  /* Page shell */
  page: {
    minHeight: '100vh',
    background: '#f5f3ef',
    fontFamily: "'Inter', sans-serif",
    color: '#1a1a1a',
  },

  /* ── Nav ───────────────────────────────────────────────────────── */
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 clamp(20px, 4vw, 48px)',
    height: '64px',
    background: '#fff',
    borderBottom: '1px solid #e8e3dc',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    height: '32px',
    width: '32px',
    objectFit: 'contain',
    flexShrink: 0,
  },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: '18px',
    color: '#1a1a1a',
  },
  logoSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '10px',
    fontWeight: 600,
    color: '#999',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginLeft: '2px',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  adminName: {
    color: '#888',
    fontSize: '13px',
    fontWeight: 500,
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #e5e0d8',
    borderRadius: '8px',
    color: '#666',
    padding: '7px 16px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.15s ease',
  },

  /* ── Main content ──────────────────────────────────────────────── */
  main: {
    padding: 'clamp(24px, 4vw, 48px) clamp(20px, 4vw, 48px)',
    maxWidth: '1280px',
    margin: '0 auto',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  h1: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: 'clamp(24px, 3vw, 32px)',
    marginBottom: '4px',
    color: '#1a1a1a',
  },
  sub: {
    color: '#999',
    fontSize: '14px',
  },
  addBtn: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    padding: '11px 24px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 2px 8px rgba(102,126,234,0.3)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    whiteSpace: 'nowrap',
  },
  exportBtn: {
    background: '#fff',
    border: '1px solid #e0dbd4',
    borderRadius: '10px',
    color: '#666',
    padding: '11px 20px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
  },

  /* ── Stats Grid ────────────────────────────────────────────────── */
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  statCard: {
    background: '#fff',
    border: '1px solid #e8e3dc',
    borderRadius: '14px',
    padding: '24px 28px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  },
  statTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  statIcon: (bg) => ({
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    flexShrink: 0,
  }),
  statNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(28px, 3vw, 36px)',
    fontWeight: 700,
    lineHeight: 1.1,
    marginBottom: '4px',
  },
  statLabel: {
    color: '#999',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },

  /* ── Search ────────────────────────────────────────────────────── */
  searchWrap: {
    marginBottom: '24px',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#b0a89e',
    fontSize: '15px',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    background: '#fff',
    border: '1px solid #e8e3dc',
    borderRadius: '12px',
    padding: '13px 16px 13px 44px',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
    color: '#1a1a1a',
    outline: 'none',
    boxSizing: 'border-box',
    boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  },

  /* ── Table Section ─────────────────────────────────────────────── */
  tableSection: {
    background: '#fff',
    border: '1px solid #e8e3dc',
    borderRadius: '14px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 28px',
    borderBottom: '1px solid #e8e3dc',
  },
  tableTitle: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 600,
    fontSize: '18px',
    color: '#1a1a1a',
  },
  tableCount: {
    color: '#999',
    fontSize: '13px',
    fontWeight: 500,
    marginLeft: '10px',
  },

  /* ── Desktop Table ─────────────────────────────────────────────── */
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: (sortable) => ({
    padding: '14px 20px',
    color: '#999',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    textAlign: 'left',
    borderBottom: '1px solid #f0ebe4',
    cursor: sortable ? 'pointer' : 'default',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    transition: 'color 0.15s ease',
  }),
  thActive: {
    color: '#764ba2',
  },
  sortArrow: {
    marginLeft: '4px',
    fontSize: '10px',
  },
  td: {
    padding: '16px 20px',
    borderBottom: '1px solid #f8f5f0',
    fontSize: '14px',
    verticalAlign: 'middle',
  },
  nameLink: {
    fontWeight: 600,
    color: '#1a1a1a',
    cursor: 'pointer',
    transition: 'color 0.15s ease',
  },
  emailText: {
    color: '#aaa',
    fontSize: '12px',
    marginTop: '2px',
  },
  planBadge: (plan) => ({
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 600,
    background: plan === 'pro' ? 'linear-gradient(135deg, #f3e5f5, #e8eaf6)' : '#f0f0f5',
    color: plan === 'pro' ? '#6a1b9a' : '#555',
    border: plan === 'pro' ? '1px solid #e1bee7' : '1px solid #e0e0e0',
  }),
  statusBadge: (s) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 600,
    background:
      s === 'active' ? '#e8f5e9'
      : s === 'past_due' ? '#fff3e0'
      : s === 'canceled' ? '#ffebee'
      : '#f5f5f5',
    color:
      s === 'active' ? '#2e7d32'
      : s === 'past_due' ? '#ef6c00'
      : s === 'canceled' ? '#c62828'
      : '#757575',
  }),
  statusDot: (s) => ({
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background:
      s === 'active' ? '#4caf50'
      : s === 'past_due' ? '#ff9800'
      : s === 'canceled' ? '#f44336'
      : '#bdbdbd',
    flexShrink: 0,
  }),
  agentBadge: (s) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 600,
    background:
      s === 'active' ? '#e8f5e9'
      : s === 'error' ? '#ffebee'
      : '#fff8e1',
    color:
      s === 'active' ? '#2e7d32'
      : s === 'error' ? '#c62828'
      : '#f57f17',
  }),
  agentDot: (s) => ({
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background:
      s === 'active' ? '#4caf50'
      : s === 'error' ? '#f44336'
      : '#ffc107',
    flexShrink: 0,
  }),
  whatsappNum: {
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    color: '#25D366',
    fontSize: '13px',
    fontWeight: 500,
  },
  viewBtn: {
    background: '#f8f5f0',
    border: '1px solid #e5e0d8',
    borderRadius: '8px',
    color: '#764ba2',
    padding: '6px 16px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.15s ease',
  },
  noData: {
    padding: '60px',
    textAlign: 'center',
    color: '#ccc',
    fontSize: '14px',
  },
  rowHover: {
    transition: 'background 0.15s ease',
  },

  /* ── Mobile Cards ──────────────────────────────────────────────── */
  mobileCards: {
    padding: '0 16px 16px',
  },
  mobileCard: {
    padding: '20px',
    borderBottom: '1px solid #f0ebe4',
  },
  mobileCardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '14px',
  },
  mobileCardName: {
    fontWeight: 600,
    fontSize: '15px',
    color: '#1a1a1a',
    cursor: 'pointer',
  },
  mobileCardEmail: {
    color: '#aaa',
    fontSize: '12px',
    marginTop: '2px',
  },
  mobileCardGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '14px',
  },
  mobileCardLabel: {
    fontSize: '10px',
    fontWeight: 700,
    color: '#b0a89e',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    marginBottom: '4px',
  },
  mobileCardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '8px',
  },

  /* ── Modal ─────────────────────────────────────────────────────── */
  modal: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    backdropFilter: 'blur(6px)',
    padding: '20px',
  },
  modalBox: {
    background: '#fff',
    border: '1px solid #e8e3dc',
    borderRadius: '18px',
    padding: 'clamp(28px, 4vw, 44px)',
    width: '100%',
    maxWidth: '520px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 32px 80px rgba(0,0,0,0.2)',
  },
  modalTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '22px',
    fontWeight: 700,
    marginBottom: '8px',
    color: '#1a1a1a',
  },
  modalSub: {
    fontSize: '13px',
    color: '#999',
    marginBottom: '28px',
  },
  label: {
    display: 'block',
    color: '#888',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    marginBottom: '7px',
  },
  input: {
    width: '100%',
    background: '#f8f5f0',
    border: '1px solid #e5e0d8',
    borderRadius: '10px',
    padding: '12px 14px',
    color: '#1a1a1a',
    fontSize: '14px',
    boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    marginBottom: '18px',
    transition: 'border-color 0.15s ease',
  },
  select: {
    width: '100%',
    background: '#f8f5f0',
    border: '1px solid #e5e0d8',
    borderRadius: '10px',
    padding: '12px 14px',
    color: '#1a1a1a',
    fontSize: '14px',
    boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    marginBottom: '18px',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23999\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M8 11L3 6h10l-5 5z\'/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
  },
  infoBox: {
    background: '#f6f4ff',
    borderRadius: '10px',
    padding: '14px 16px',
    fontSize: '13px',
    color: '#5c5c9e',
    marginBottom: '24px',
    lineHeight: 1.5,
    border: '1px solid #ebe8ff',
  },
  modalBtns: {
    display: 'flex',
    gap: '12px',
    marginTop: '4px',
  },
  cancelBtn: {
    flex: 1,
    background: 'transparent',
    border: '1px solid #e5e0d8',
    borderRadius: '10px',
    color: '#999',
    padding: '13px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.15s ease',
  },
  saveBtn: {
    flex: 1,
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    padding: '13px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    boxShadow: '0 2px 8px rgba(102,126,234,0.3)',
    transition: 'all 0.15s ease',
  },
  err: {
    color: '#c62828',
    fontSize: '13px',
    marginBottom: '14px',
    background: '#ffebee',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ffcdd2',
  },
};

/* ── Helpers ────────────────────────────────────────────────────────── */
const MOBILE_BREAK = 768;

function statusLabel(s) {
  if (s === 'active') return 'Active';
  if (s === 'past_due') return 'Past Due';
  if (s === 'canceled') return 'Canceled';
  return 'Inactive';
}

function agentLabel(s) {
  if (s === 'active') return 'Active';
  if (s === 'error') return 'Error';
  return 'Pending';
}

function planLabel() {
  return 'Active';
}

/* ── Component ──────────────────────────────────────────────────────── */
export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', whatsapp_from: '' });
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAK : false
  );
  const [hoveredRow, setHoveredRow] = useState(null);

  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');

  function exportCSV() {
    const headers = ['Name','Email','Plan','Status','Agent','WhatsApp'];
    const rows = filtered.map(c => [
      c.name, c.email, c.plan || 'standard',
      c.subscription_status || 'inactive',
      c.openclaw_status || 'inactive',
      c.whatsapp_from || '',
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `kova-clients-${new Date().toISOString().slice(0,10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  }

  /* ── Responsive listener ──────────────────────────────────────── */
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < MOBILE_BREAK);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ── Data fetch ───────────────────────────────────────────────── */
  useEffect(() => { load(); }, []);

  async function load() {
    try {
      const r = await api.get('/api/customers');
      setCustomers(r.data);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }

  /* ── Create customer ──────────────────────────────────────────── */
  async function create(e) {
    e.preventDefault();
    setError('');
    try {
      await api.post('/api/customers', form);
      setModal(false);
      setForm({ name: '', email: '', whatsapp_from: '' });
      load();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create client');
    }
  }

  /* ── Logout ───────────────────────────────────────────────────── */
  function logout() {
    localStorage.clear();
    navigate('/login');
  }

  /* ── Sorting ──────────────────────────────────────────────────── */
  function handleSort(col) {
    if (sortCol === col) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  }

  /* ── Derived data ─────────────────────────────────────────────── */
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let list = customers;
    if (q) {
      list = list.filter(
        c =>
          (c.name || '').toLowerCase().includes(q) ||
          (c.email || '').toLowerCase().includes(q)
      );
    }

    const sorted = [...list].sort((a, b) => {
      let aVal, bVal;
      switch (sortCol) {
        case 'name':
          aVal = (a.name || '').toLowerCase();
          bVal = (b.name || '').toLowerCase();
          break;
        case 'email':
          aVal = (a.email || '').toLowerCase();
          bVal = (b.email || '').toLowerCase();
          break;
        case 'plan':
          aVal = a.plan || '';
          bVal = b.plan || '';
          break;
        case 'status':
          aVal = a.subscription_status || '';
          bVal = b.subscription_status || '';
          break;
        case 'agent':
          aVal = a.openclaw_status || '';
          bVal = b.openclaw_status || '';
          break;
        case 'whatsapp':
          aVal = a.whatsapp_to || '';
          bVal = b.whatsapp_to || '';
          break;
        default:
          aVal = '';
          bVal = '';
      }
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [customers, search, sortCol, sortDir]);

  const stats = useMemo(() => {
    const active = customers.filter(c => c.subscription_status === 'active');
    return {
      total: customers.length,
      active: active.length,
      mrr: (active.length * PLAN_PRICE).toFixed(2),
      agents: customers.filter(c => c.openclaw_status === 'active').length,
    };
  }, [customers]);

  /* ── Sort indicator helper ────────────────────────────────────── */
  function renderSortArrow(col) {
    if (sortCol !== col) return null;
    return (
      <span style={G.sortArrow}>{sortDir === 'asc' ? '\u25B2' : '\u25BC'}</span>
    );
  }

  /* ── Column definitions ───────────────────────────────────────── */
  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'plan', label: 'Plan', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'agent', label: 'Agent', sortable: true },
    { key: 'whatsapp', label: 'WhatsApp', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false },
  ];

  /* ── Stat card data ───────────────────────────────────────────── */
  const statCards = [
    {
      num: stats.total,
      label: 'Total Customers',
      color: '#1a1a1a',
      iconBg: '#f0f0f5',
      icon: '\uD83D\uDC65',
    },
    {
      num: stats.active,
      label: 'Active Subscriptions',
      color: '#2e7d32',
      iconBg: '#e8f5e9',
      icon: '\u2713',
    },
    {
      num: `$${stats.mrr}`,
      label: 'Monthly Recurring Revenue',
      color: '#1565c0',
      iconBg: '#e3f2fd',
      icon: '$',
    },
    {
      num: stats.agents,
      label: 'AI Agents Live',
      color: '#6a1b9a',
      iconBg: '#f3e5f5',
      icon: '\u26A1',
    },
  ];

  /* ── Render ───────────────────────────────────────────────────── */
  return (
    <div style={G.page}>
      {/* ── NAVBAR ────────────────────────────────────────────── */}
      <nav style={G.nav}>
        <div style={G.logoWrap}>
          <img src="/kova-logo.svg" alt="Kova" style={G.logoIcon} />
          <div>
            <span style={G.logoText}>Kova Admin</span>
            <span style={G.logoSub}> Platform</span>
          </div>
        </div>
        <div style={G.navRight}>
          <span style={G.adminName}>{admin.name || 'Admin'}</span>
          <button
            style={G.logoutBtn}
            onClick={logout}
            onMouseEnter={e => { e.target.style.borderColor = '#ccc'; e.target.style.color = '#333'; }}
            onMouseLeave={e => { e.target.style.borderColor = '#e5e0d8'; e.target.style.color = '#666'; }}
          >
            Sign out
          </button>
        </div>
      </nav>

      {/* ── MAIN ─────────────────────────────────────────────── */}
      <div style={G.main}>
        {/* Header */}
        <div style={G.headerRow}>
          <div>
            <div style={G.h1}>Dashboard</div>
            <div style={G.sub}>
              Manage your Kova clients and AI assistants
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              style={G.exportBtn}
              onClick={exportCSV}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#667eea'; e.currentTarget.style.color = '#667eea'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0dbd4'; e.currentTarget.style.color = '#666'; }}
            >
              Export CSV
            </button>
            <button
              style={G.addBtn}
              onClick={() => setModal(true)}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(102,126,234,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(102,126,234,0.3)'; }}
            >
              <span style={{ fontSize: '16px', lineHeight: 1 }}>+</span>
              Add Client
            </button>
          </div>
        </div>

        {/* ── Stats Grid ─────────────────────────────────────── */}
        <div style={G.statsGrid}>
          {statCards.map(s => (
            <div
              key={s.label}
              style={G.statCard}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)'; }}
            >
              <div style={G.statTop}>
                <div style={G.statIcon(s.iconBg)}>
                  <span role="img" aria-label={s.label}>{s.icon}</span>
                </div>
              </div>
              <div style={{ ...G.statNum, color: s.color }}>{s.num}</div>
              <div style={G.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Search Bar ─────────────────────────────────────── */}
        <div style={G.searchWrap}>
          <span style={G.searchIcon}>&#x1F50D;</span>
          <input
            style={G.searchInput}
            placeholder="Search customers by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={e => { e.target.style.borderColor = '#667eea'; e.target.style.boxShadow = '0 0 0 3px rgba(102,126,234,0.1)'; }}
            onBlur={e => { e.target.style.borderColor = '#e8e3dc'; e.target.style.boxShadow = '0 1px 4px rgba(0,0,0,0.03)'; }}
          />
        </div>

        {/* ── Customer Table / Cards ─────────────────────────── */}
        <div style={G.tableSection}>
          <div style={G.tableHeader}>
            <div>
              <span style={G.tableTitle}>Clients</span>
              <span style={G.tableCount}>
                {filtered.length} of {customers.length}
              </span>
            </div>
          </div>

          {loading ? (
            <div style={G.noData}>Loading customers...</div>
          ) : filtered.length === 0 && customers.length === 0 ? (
            <div style={G.noData}>
              No clients yet -- click "Add Client" above to get started
            </div>
          ) : filtered.length === 0 ? (
            <div style={G.noData}>
              No clients match your search
            </div>
          ) : isMobile ? (
            /* ── Mobile Card Layout ──────────────────────────── */
            <div style={G.mobileCards}>
              {filtered.map(c => {
                const agentStatus = c.openclaw_status || 'pending';
                return (
                  <div key={c.id} style={G.mobileCard}>
                    <div style={G.mobileCardTop}>
                      <div>
                        <div
                          style={G.mobileCardName}
                          onClick={() => navigate(`/customers/${c.id}`)}
                        >
                          {c.name}
                        </div>
                        <div style={G.mobileCardEmail}>{c.email}</div>
                      </div>
                      <span style={G.statusBadge(c.subscription_status)}>
                        <span style={G.statusDot(c.subscription_status)} />
                        {statusLabel(c.subscription_status)}
                      </span>
                    </div>
                    <div style={G.mobileCardGrid}>
                      <div>
                        <div style={G.mobileCardLabel}>Plan</div>
                        <span style={G.planBadge(c.plan)}>
                          {planLabel(c.plan)}
                        </span>
                      </div>
                      <div>
                        <div style={G.mobileCardLabel}>Agent</div>
                        <span style={G.agentBadge(agentStatus)}>
                          <span style={G.agentDot(agentStatus)} />
                          {agentLabel(agentStatus)}
                        </span>
                      </div>
                      <div>
                        <div style={G.mobileCardLabel}>WhatsApp</div>
                        <span style={G.whatsappNum}>
                          {c.whatsapp_to || '--'}
                        </span>
                      </div>
                      <div>
                        <div style={G.mobileCardLabel}>Price</div>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a' }}>
                          ${PLAN_PRICE}/mo
                        </span>
                      </div>
                    </div>
                    <div style={G.mobileCardActions}>
                      <button
                        style={G.viewBtn}
                        onClick={() => navigate(`/customers/${c.id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ── Desktop Table ───────────────────────────────── */
            <div style={{ overflowX: 'auto' }}>
              <table style={G.table}>
                <thead>
                  <tr>
                    {columns.map(col => (
                      <th
                        key={col.key}
                        style={{
                          ...G.th(col.sortable),
                          ...(sortCol === col.key ? G.thActive : {}),
                        }}
                        onClick={() => col.sortable && handleSort(col.key)}
                      >
                        {col.label}
                        {col.sortable && renderSortArrow(col.key)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => {
                    const agentStatus = c.openclaw_status || 'pending';
                    const isHovered = hoveredRow === c.id;
                    return (
                      <tr
                        key={c.id}
                        style={{
                          ...G.rowHover,
                          background: isHovered ? '#faf8f5' : 'transparent',
                        }}
                        onMouseEnter={() => setHoveredRow(c.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        {/* Name */}
                        <td style={G.td}>
                          <div
                            style={G.nameLink}
                            onClick={() => navigate(`/customers/${c.id}`)}
                            onMouseEnter={e => { e.target.style.color = '#764ba2'; }}
                            onMouseLeave={e => { e.target.style.color = '#1a1a1a'; }}
                          >
                            {c.name}
                          </div>
                        </td>

                        {/* Email */}
                        <td style={{ ...G.td, color: '#888', fontSize: '13px' }}>
                          {c.email}
                        </td>

                        {/* Plan */}
                        <td style={G.td}>
                          <span style={G.planBadge(c.plan)}>
                            {planLabel(c.plan)}
                          </span>
                        </td>

                        {/* Status */}
                        <td style={G.td}>
                          <span style={G.statusBadge(c.subscription_status)}>
                            <span style={G.statusDot(c.subscription_status)} />
                            {statusLabel(c.subscription_status)}
                          </span>
                        </td>

                        {/* Agent */}
                        <td style={G.td}>
                          <span style={G.agentBadge(agentStatus)}>
                            <span style={G.agentDot(agentStatus)} />
                            {agentLabel(agentStatus)}
                          </span>
                        </td>

                        {/* WhatsApp */}
                        <td style={G.td}>
                          <span style={G.whatsappNum}>
                            {c.whatsapp_to || '--'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={G.td}>
                          <button
                            style={G.viewBtn}
                            onClick={() => navigate(`/customers/${c.id}`)}
                            onMouseEnter={e => { e.target.style.background = '#764ba2'; e.target.style.color = '#fff'; e.target.style.borderColor = '#764ba2'; }}
                            onMouseLeave={e => { e.target.style.background = '#f8f5f0'; e.target.style.color = '#764ba2'; e.target.style.borderColor = '#e5e0d8'; }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── ADD CLIENT MODAL ─────────────────────────────────── */}
      {modal && (
        <div
          style={G.modal}
          onClick={e => e.target === e.currentTarget && setModal(false)}
        >
          <div style={G.modalBox}>
            <div style={G.modalTitle}>Add New Client</div>
            <div style={G.modalSub}>
              Create a new Kova client profile. You can configure their preferences after creation.
            </div>

            {error && <div style={G.err}>{error}</div>}

            <form onSubmit={create}>
              <label style={G.label}>Full Name *</label>
              <input
                style={G.input}
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. James Williams"
                onFocus={e => { e.target.style.borderColor = '#667eea'; }}
                onBlur={e => { e.target.style.borderColor = '#e5e0d8'; }}
              />

              <label style={G.label}>Email Address *</label>
              <input
                style={G.input}
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="james@example.com"
                onFocus={e => { e.target.style.borderColor = '#667eea'; }}
                onBlur={e => { e.target.style.borderColor = '#e5e0d8'; }}
              />

              <label style={G.label}>WhatsApp Number</label>
              <input
                style={G.input}
                value={form.whatsapp_from}
                onChange={e => setForm(f => ({ ...f, whatsapp_from: e.target.value }))}
                placeholder="+1234567890"
                onFocus={e => { e.target.style.borderColor = '#667eea'; }}
                onBlur={e => { e.target.style.borderColor = '#e5e0d8'; }}
              />

              <div style={G.infoBox}>
                After creating the client, visit their profile to configure preferences such as
                dietary needs, airline loyalty numbers, seat preferences, and more.
                Kova will use these automatically.
              </div>

              <div style={G.modalBtns}>
                <button
                  style={G.cancelBtn}
                  type="button"
                  onClick={() => { setModal(false); setError(''); }}
                  onMouseEnter={e => { e.target.style.borderColor = '#ccc'; e.target.style.color = '#666'; }}
                  onMouseLeave={e => { e.target.style.borderColor = '#e5e0d8'; e.target.style.color = '#999'; }}
                >
                  Cancel
                </button>
                <button
                  style={G.saveBtn}
                  type="submit"
                  onMouseEnter={e => { e.target.style.boxShadow = '0 4px 14px rgba(102,126,234,0.4)'; }}
                  onMouseLeave={e => { e.target.style.boxShadow = '0 2px 8px rgba(102,126,234,0.3)'; }}
                >
                  Create Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
