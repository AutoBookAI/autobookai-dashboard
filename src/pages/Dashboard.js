import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

const PLAN_PRICE = 49.99;

const G = { // global styles
  page: { minHeight:'100vh', background:'#f8f5f0', fontFamily:"'Inter',sans-serif", color:'#1a1a1a' },
  nav: {
    display:'flex', alignItems:'center', justifyContent:'space-between',
    padding:'0 40px', height:'64px',
    background:'#fff', borderBottom:'1px solid #ede8e1',
    boxShadow:'0 1px 0 rgba(0,0,0,0.04)',
  },
  logo: { fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:'20px', color:'#1a1a1a' },
  logoBadge: {
    background:'linear-gradient(135deg,#667eea,#764ba2)', color:'#fff',
    fontSize:'10px', padding:'2px 8px', borderRadius:'12px', marginLeft:'10px',
    fontFamily:"'Inter',sans-serif", fontWeight:600, letterSpacing:'1px',
    verticalAlign:'middle',
  },
  navRight: { display:'flex', alignItems:'center', gap:'16px' },
  adminName: { color:'#999', fontSize:'13px' },
  logoutBtn: {
    background:'transparent', border:'1px solid #e5e0d8', borderRadius:'6px',
    color:'#666', padding:'6px 14px', cursor:'pointer', fontSize:'13px',
  },
  main: { padding:'48px 40px', maxWidth:'1200px', margin:'0 auto' },
  h1: { fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:'32px', marginBottom:'6px' },
  sub: { color:'#999', fontSize:'14px', marginBottom:'48px' },
  statsGrid: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginBottom:'48px' },
  statCard: {
    background:'#fff', border:'1px solid #ede8e1', borderRadius:'12px',
    padding:'24px 28px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)',
  },
  statNum: { fontFamily:"'Playfair Display',serif", fontSize:'36px', fontWeight:600, marginBottom:'4px' },
  statLabel: { color:'#999', fontSize:'12px', textTransform:'uppercase', letterSpacing:'1px' },
  tableSection: { background:'#fff', border:'1px solid #ede8e1', borderRadius:'12px', overflow:'hidden' },
  tableHeader: {
    display:'flex', justifyContent:'space-between', alignItems:'center',
    padding:'20px 28px', borderBottom:'1px solid #ede8e1',
  },
  tableTitle: { fontFamily:"'Playfair Display',serif", fontWeight:500, fontSize:'18px' },
  addBtn: {
    background:'linear-gradient(135deg,#667eea,#764ba2)', border:'none', borderRadius:'8px',
    color:'#fff', padding:'10px 20px', cursor:'pointer', fontSize:'13px', fontWeight:600,
  },
  th: { padding:'12px 20px', color:'#aaa', fontSize:'11px', fontWeight:600,
    letterSpacing:'1px', textTransform:'uppercase', textAlign:'left', borderBottom:'1px solid #f0ebe4' },
  td: { padding:'16px 20px', borderBottom:'1px solid #f8f5f0', fontSize:'14px', verticalAlign:'middle' },
  badge: (s) => ({
    display:'inline-block', padding:'4px 12px', borderRadius:'20px', fontSize:'11px', fontWeight:600,
    background: s==='active' ? '#e8f5e9' : s==='past_due' ? '#fff3e0' : s==='pending' ? '#e3f2fd' : '#f5f5f5',
    color:       s==='active' ? '#2e7d32' : s==='past_due' ? '#ef6c00' : s==='pending' ? '#1565c0' : '#757575',
  }),
  agentBadge: (s) => ({
    display:'inline-block', padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:500,
    background: s==='active' ? '#f3e5f5' : s==='error' ? '#ffebee' : '#fff8e1',
    color:       s==='active' ? '#6a1b9a' : s==='error' ? '#c62828' : '#f57f17',
  }),
  viewBtn: {
    background:'transparent', border:'1px solid #e0d8f0', borderRadius:'6px',
    color:'#764ba2', padding:'5px 14px', cursor:'pointer', fontSize:'12px', fontWeight:500, marginRight:'6px',
  },
  subBtn: (active) => ({
    background: active ? 'transparent' : 'linear-gradient(135deg,#667eea,#764ba2)',
    border: active ? '1px solid #e5e0d8' : 'none',
    borderRadius:'6px', color: active ? '#999' : '#fff',
    padding:'5px 14px', cursor: active ? 'default' : 'pointer', fontSize:'12px', fontWeight:500,
  }),
  noData: { padding:'60px', textAlign:'center', color:'#ccc', fontSize:'14px' },
  modal: {
    position:'fixed', inset:0, background:'rgba(0,0,0,0.5)',
    display:'flex', alignItems:'center', justifyContent:'center', zIndex:100,
    backdropFilter:'blur(4px)',
  },
  modalBox: {
    background:'#fff', border:'1px solid #ede8e1', borderRadius:'16px',
    padding:'44px', width:'100%', maxWidth:'520px', maxHeight:'90vh', overflowY:'auto',
    boxShadow:'0 32px 80px rgba(0,0,0,0.2)',
  },
  modalTitle: { fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:600, marginBottom:'28px' },
  label: { display:'block', color:'#999', fontSize:'11px', fontWeight:600,
    letterSpacing:'1px', textTransform:'uppercase', marginBottom:'7px' },
  input: {
    width:'100%', background:'#f8f5f0', border:'1px solid #e5e0d8', borderRadius:'8px',
    padding:'11px 14px', color:'#1a1a1a', fontSize:'14px', boxSizing:'border-box',
    fontFamily:"'Inter',sans-serif", outline:'none', marginBottom:'16px',
  },
  modalBtns: { display:'flex', gap:'12px', marginTop:'8px' },
  saveBtn: {
    flex:1, background:'linear-gradient(135deg,#667eea,#764ba2)', border:'none',
    borderRadius:'8px', color:'#fff', padding:'13px', cursor:'pointer', fontSize:'14px', fontWeight:600,
  },
  cancelBtn: {
    flex:1, background:'transparent', border:'1px solid #e5e0d8',
    borderRadius:'8px', color:'#999', padding:'13px', cursor:'pointer', fontSize:'14px',
  },
  err: { color:'#c62828', fontSize:'13px', marginBottom:'12px' },
};

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [modal, setModal]         = useState(false);
  const [error, setError]         = useState('');
  const [form, setForm]           = useState({ name:'', email:'', whatsapp_from:'', plan:'assistant' });
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');

  useEffect(() => { load(); }, []);

  async function load() {
    try {
      const r = await api.get('/api/customers');
      setCustomers(r.data);
    } catch {} finally { setLoading(false); }
  }

  async function create(e) {
    e.preventDefault(); setError('');
    try {
      await api.post('/api/customers', form);
      setModal(false);
      setForm({ name:'', email:'', whatsapp_from:'', plan:'assistant' });
      load();
    } catch (err) { setError(err.response?.data?.error || 'Failed to create'); }
  }

  async function subscribe(id, plan) {
    try {
      const r = await api.post('/api/billing/checkout', { customerId: id, plan });
      window.open(r.data.url, '_blank');
    } catch { alert('Failed to open checkout'); }
  }

  function logout() { localStorage.clear(); navigate('/login'); }

  const stats = {
    total:    customers.length,
    active:   customers.filter(c => c.subscription_status === 'active').length,
    agents:   customers.filter(c => c.openclaw_status === 'active').length,
    mrr:      customers.filter(c => c.subscription_status === 'active')
                       .reduce((s, c) => s + PLAN_PRICE, 0).toFixed(2),
  };

  return (
    <div style={G.page}>
      <nav style={G.nav}>
        <div>
          <span style={G.logo}>AI Assistant</span>
          <span style={G.logoBadge}>AI PLATFORM</span>
        </div>
        <div style={G.navRight}>
          <span style={G.adminName}>{admin.name}</span>
          <button style={G.logoutBtn} onClick={logout}>Sign out</button>
        </div>
      </nav>

      <div style={G.main}>
        <div style={G.h1}>Dashboard</div>
        <div style={G.sub}>Your AI assistant clients — each powered by OpenClaw + Claude</div>

        <div style={G.statsGrid}>
          {[
            { num: stats.total,  label: 'Total Clients',    color: '#1a1a1a' },
            { num: stats.active, label: 'Active Subs',       color: '#2e7d32' },
            { num: stats.agents, label: 'AI Agents Live',    color: '#6a1b9a' },
            { num: `$${stats.mrr}`, label: 'MRR',            color: '#1565c0' },
          ].map(s => (
            <div key={s.label} style={G.statCard}>
              <div style={{ ...G.statNum, color: s.color }}>{s.num}</div>
              <div style={G.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={G.tableSection}>
          <div style={G.tableHeader}>
            <div style={G.tableTitle}>Clients</div>
            <button style={G.addBtn} onClick={() => setModal(true)}>+ Add Client</button>
          </div>

          {loading ? (
            <div style={G.noData}>Loading...</div>
          ) : customers.length === 0 ? (
            <div style={G.noData}>No clients yet — add your first one above</div>
          ) : (
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr>
                  {['Client','WhatsApp Number','Plan','Subscription','AI Agent','Actions'].map(h => (
                    <th key={h} style={G.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers.map(c => (
                  <tr key={c.id}>
                    <td style={G.td}>
                      <div style={{ fontWeight:500 }}>{c.name}</div>
                      <div style={{ color:'#aaa', fontSize:'12px' }}>{c.email}</div>
                    </td>
                    <td style={G.td}>
                      <span style={{ fontFamily:'monospace', color:'#25D366', fontSize:'13px' }}>
                        {c.whatsapp_to || '—'}
                      </span>
                    </td>
                    <td style={{ ...G.td, textTransform:'capitalize' }}>
                      AI Assistant — ${`$${PLAN_PRICE}/mo`}
                    </td>
                    <td style={G.td}><span style={G.badge(c.subscription_status)}>{c.subscription_status}</span></td>
                    <td style={G.td}><span style={G.agentBadge(c.openclaw_status)}>{c.openclaw_status}</span></td>
                    <td style={G.td}>
                      <button style={G.viewBtn} onClick={() => navigate(`/customers/${c.id}`)}>
                        View →
                      </button>
                      {c.subscription_status !== 'active' && (
                        <button style={G.subBtn(false)} onClick={() => subscribe(c.id, c.plan)}>
                          Subscribe
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modal && (
        <div style={G.modal} onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div style={G.modalBox}>
            <div style={G.modalTitle}>Add New Client</div>
            {error && <div style={G.err}>{error}</div>}
            <form onSubmit={create}>
              <label style={G.label}>Full Name *</label>
              <input style={G.input} required value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. James Williams" />
              <label style={G.label}>Email *</label>
              <input style={G.input} type="email" required value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="james@example.com" />
              <label style={G.label}>Their WhatsApp Number</label>
              <input style={G.input} value={form.whatsapp_from}
                onChange={e => setForm(f => ({ ...f, whatsapp_from: e.target.value }))}
                placeholder="+1234567890" />
              <label style={G.label}>Plan</label>
              <div style={{ ...G.input, background:'#f0f0ff', color:'#5c5c9e' }}>
                AI Assistant — ${`$${PLAN_PRICE}/month`}
              </div>
              <div style={{ background:'#f0f0ff', borderRadius:'8px', padding:'12px 14px',
                fontSize:'13px', color:'#5c5c9e', marginBottom:'20px' }}>
                💡 After creating, go to the client's profile to set up their preferences —
                dietary needs, airline loyalty numbers, seat preferences, and more.
                OpenClaw will use all of this automatically.
              </div>
              <div style={G.modalBtns}>
                <button style={G.cancelBtn} type="button" onClick={() => setModal(false)}>Cancel</button>
                <button style={G.saveBtn} type="submit">Create Client →</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
