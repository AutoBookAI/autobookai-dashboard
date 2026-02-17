import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';

const S = {
  page: { minHeight:'100vh', background:'#f8f5f0', fontFamily:"'Inter',sans-serif", color:'#1a1a1a' },
  nav: {
    display:'flex', alignItems:'center', gap:'16px',
    padding:'0 40px', height:'64px', background:'#fff', borderBottom:'1px solid #ede8e1',
  },
  back: {
    background:'transparent', border:'1px solid #e5e0d8', borderRadius:'6px',
    color:'#666', padding:'6px 14px', cursor:'pointer', fontSize:'13px',
  },
  navTitle: { fontFamily:"'Playfair Display',serif", fontSize:'18px', fontWeight:500 },
  badge: (s) => ({
    display:'inline-block', padding:'4px 12px', borderRadius:'20px', fontSize:'11px', fontWeight:600,
    background: s==='active' ? '#e8f5e9' : '#f5f5f5',
    color:       s==='active' ? '#2e7d32' : '#757575',
  }),
  agentBadge: (s) => ({
    display:'inline-block', padding:'3px 10px', borderRadius:'20px', fontSize:'11px',
    background: s==='active' ? '#f3e5f5' : s==='error' ? '#ffebee' : '#fff8e1',
    color:       s==='active' ? '#6a1b9a' : s==='error' ? '#c62828' : '#f57f17',
  }),
  layout: { display:'grid', gridTemplateColumns:'300px 1fr', minHeight:'calc(100vh - 64px)' },
  sidebar: { background:'#fff', borderRight:'1px solid #ede8e1', padding:'28px', overflowY:'auto' },
  main: { padding:'32px 40px', overflowY:'auto' },
  sideLabel: {
    color:'#aaa', fontSize:'10px', fontWeight:600, letterSpacing:'1.2px',
    textTransform:'uppercase', marginBottom:'12px',
  },
  sideSection: { marginBottom:'28px', paddingBottom:'28px', borderBottom:'1px solid #f0ebe4' },
  infoKey: { color:'#aaa', fontSize:'12px', marginBottom:'3px' },
  infoVal: { fontSize:'14px', fontWeight:500, marginBottom:'12px', wordBreak:'break-word' },
  actionBtn: {
    width:'100%', background:'transparent', border:'1px solid #e5e0d8', borderRadius:'8px',
    color:'#764ba2', padding:'10px', cursor:'pointer', fontSize:'13px', fontWeight:500,
    marginBottom:'8px', textAlign:'center',
  },
  subscribeBtn: {
    width:'100%', background:'linear-gradient(135deg,#667eea,#764ba2)', border:'none',
    borderRadius:'8px', color:'#fff', padding:'10px', cursor:'pointer', fontSize:'13px',
    fontWeight:600, marginBottom:'8px',
  },
  sectionTitle: {
    fontFamily:"'Playfair Display',serif", fontWeight:500, fontSize:'18px',
    marginBottom:'6px', marginTop:'0',
  },
  sectionSub: { color:'#aaa', fontSize:'13px', marginBottom:'24px' },
  grid2: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'0' },
  label: {
    display:'block', color:'#999', fontSize:'11px', fontWeight:600,
    letterSpacing:'1px', textTransform:'uppercase', marginBottom:'7px',
  },
  input: {
    width:'100%', background:'#f8f5f0', border:'1px solid #e5e0d8', borderRadius:'8px',
    padding:'11px 14px', color:'#1a1a1a', fontSize:'14px', boxSizing:'border-box',
    fontFamily:"'Inter',sans-serif", outline:'none',
  },
  textarea: {
    width:'100%', background:'#f8f5f0', border:'1px solid #e5e0d8', borderRadius:'8px',
    padding:'11px 14px', color:'#1a1a1a', fontSize:'14px', boxSizing:'border-box',
    fontFamily:"'Inter',sans-serif", outline:'none', resize:'vertical', minHeight:'80px',
  },
  card: {
    background:'#fff', border:'1px solid #ede8e1', borderRadius:'12px',
    padding:'28px 32px', marginBottom:'24px',
  },
  saveRow: { display:'flex', justifyContent:'flex-end', marginTop:'20px' },
  saveBtn: {
    background:'linear-gradient(135deg,#667eea,#764ba2)', border:'none', borderRadius:'8px',
    color:'#fff', padding:'11px 28px', cursor:'pointer', fontSize:'14px', fontWeight:600,
  },
  loyaltyRow: {
    display:'flex', gap:'12px', marginBottom:'12px', alignItems:'center',
  },
  removeBtn: {
    background:'#ffebee', border:'none', borderRadius:'6px',
    color:'#c62828', padding:'6px 12px', cursor:'pointer', fontSize:'12px', flexShrink:0,
  },
  addRowBtn: {
    background:'transparent', border:'1px dashed #e0d8f0', borderRadius:'8px',
    color:'#764ba2', padding:'9px 16px', cursor:'pointer', fontSize:'13px', marginTop:'4px',
  },
  infoBox: {
    background:'#f0f0ff', border:'1px solid #e0d8f0', borderRadius:'8px',
    padding:'14px 16px', fontSize:'13px', color:'#5c5c9e', marginBottom:'24px',
  },
  successBox: {
    background:'#e8f5e9', border:'1px solid #c8e6c9', borderRadius:'8px',
    padding:'14px 16px', fontSize:'13px', color:'#2e7d32', marginBottom:'16px',
  },
};

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [saved, setSaved]       = useState(false);
  const [saving, setSaving]     = useState(false);
  const [profile, setProfile]   = useState({
    full_name: '', dietary_restrictions: '', cuisine_preferences: '',
    preferred_restaurants: '', dining_budget: '', preferred_airlines: '',
    seat_preference: '', cabin_class: 'economy', hotel_preferences: '',
    preferred_contact: 'whatsapp', passport_number: '', date_of_birth: '',
  });
  const [loyalty, setLoyalty]   = useState([{ program: '', number: '' }]);

  useEffect(() => { loadCustomer(); }, [id]);

  async function loadCustomer() {
    try {
      const r = await api.get(`/api/customers/${id}`);
      setCustomer(r.data);
      if (r.data.profile) {
        setProfile(p => ({ ...p, ...r.data.profile }));
        if (r.data.profile.loyalty_numbers && Array.isArray(r.data.profile.loyalty_numbers)) {
          setLoyalty(r.data.profile.loyalty_numbers);
        }
      }
    } catch { navigate('/dashboard'); }
  }

  async function saveProfile() {
    setSaving(true); setSaved(false);
    try {
      await api.patch(`/api/customers/${id}/profile`, {
        ...profile,
        loyalty_numbers: loyalty.filter(l => l.program || l.number),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save');
    } finally { setSaving(false); }
  }

  async function handleSubscribe() {
    try {
      const r = await api.post('/api/billing/checkout', { customerId: id, plan: customer.plan });
      window.open(r.data.url, '_blank');
    } catch { alert('Failed to open checkout'); }
  }

  async function handlePortal() {
    try {
      const r = await api.post('/api/billing/portal', { customerId: id });
      window.open(r.data.url, '_blank');
    } catch { alert('Failed to open billing portal'); }
  }

  async function handleReprovision() {
    if (!window.confirm('Retry AI agent deployment for this customer?')) return;
    try {
      await api.post(`/api/customers/${id}/reprovision`);
      alert('AI agent reprovisioning started. Refresh in ~60 seconds.');
      loadCustomer();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to reprovision');
    }
  }

  function addLoyalty()    { setLoyalty(l => [...l, { program: '', number: '' }]); }
  function removeLoyalty(i){ setLoyalty(l => l.filter((_, idx) => idx !== i));     }
  function updateLoyalty(i, field, val) {
    setLoyalty(l => l.map((row, idx) => idx === i ? { ...row, [field]: val } : row));
  }

  function F(key) {
    return { value: profile[key] || '', onChange: e => setProfile(p => ({ ...p, [key]: e.target.value })) };
  }

  if (!customer) return (
    <div style={{ ...S.page, display:'flex', alignItems:'center', justifyContent:'center', color:'#ccc' }}>
      Loading...
    </div>
  );

  return (
    <div style={S.page}>
      <nav style={S.nav}>
        <button style={S.back} onClick={() => navigate('/dashboard')}>← Back</button>
        <span style={S.navTitle}>{customer.name}</span>
        <span style={S.badge(customer.subscription_status)}>{customer.subscription_status}</span>
        <span style={S.agentBadge(customer.openclaw_status)}>
          🤖 AI Agent: {customer.openclaw_status}
        </span>
      </nav>

      <div style={S.layout}>
        {/* Sidebar */}
        <div style={S.sidebar}>
          <div style={S.sideSection}>
            <div style={S.sideLabel}>Contact</div>
            <div style={S.infoKey}>Email</div>
            <div style={S.infoVal}>{customer.email}</div>
            <div style={S.infoKey}>Their WhatsApp</div>
            <div style={S.infoVal}>{customer.whatsapp_from || '—'}</div>
            <div style={S.infoKey}>Assigned Number</div>
            <div style={{ ...S.infoVal, color: '#25D366', fontFamily: 'monospace' }}>
              {customer.whatsapp_to || 'Not yet assigned'}
            </div>
          </div>

          <div style={S.sideSection}>
            <div style={S.sideLabel}>AI Agent</div>
            <div style={S.infoKey}>Status</div>
            <div style={S.infoVal}>{customer.openclaw_status}</div>
            {customer.railway_service_url && (
              <>
                <div style={S.infoKey}>Agent URL</div>
                <div style={{ ...S.infoVal, fontSize:'12px', wordBreak:'break-all' }}>
                  <a href={customer.railway_service_url} target="_blank" rel="noreferrer"
                    style={{ color:'#764ba2' }}>
                    View Agent Dashboard ↗
                  </a>
                </div>
              </>
            )}
            {(customer.openclaw_status === 'error' || customer.openclaw_status === 'pending') && (
              <button style={{ ...S.actionBtn, color:'#c62828', borderColor:'#ffcdd2' }}
                onClick={handleReprovision}>
                🔄 Retry AI Agent Deployment
              </button>
            )}
          </div>

          <div style={S.sideSection}>
            <div style={S.sideLabel}>Billing</div>
            <div style={S.infoKey}>Plan</div>
            <div style={S.infoVal}>AI Assistant — $49.99/mo</div>
            {customer.subscription_status !== 'active' ? (
              <button style={S.subscribeBtn} onClick={handleSubscribe}>
                💳 Send Payment Link
              </button>
            ) : (
              <button style={S.actionBtn} onClick={handlePortal}>
                Manage Subscription →
              </button>
            )}
          </div>

          <div>
            <div style={S.sideLabel}>Member Since</div>
            <div style={{ color:'#aaa', fontSize:'13px' }}>
              {new Date(customer.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}
            </div>
          </div>
        </div>

        {/* Main — Preference Onboarding */}
        <div style={S.main}>
          <div style={S.infoBox}>
            🤖 <strong>How this works:</strong> Every preference you fill in here is securely stored and automatically
            fed into {customer.name}'s personal OpenClaw AI agent. When they ask for a restaurant booking or
            flight, Claude already knows their dietary needs, loyalty numbers, and preferences — no need to ask.
          </div>

          {saved && <div style={S.successBox}>✅ Profile saved and synced to AI agent</div>}

          {/* Personal Info */}
          <div style={S.card}>
            <h3 style={S.sectionTitle}>Personal Information</h3>
            <p style={S.sectionSub}>Used for bookings and reservations — encrypted at rest</p>
            <div style={S.grid2}>
              <div>
                <label style={S.label}>Full Name (for bookings)</label>
                <input style={S.input} {...F('full_name')} placeholder="As on passport" />
              </div>
              <div>
                <label style={S.label}>Date of Birth</label>
                <input style={S.input} type="date" {...F('date_of_birth')} />
              </div>
            </div>
            <div style={{ marginTop:'16px' }}>
              <label style={S.label}>Passport Number (encrypted)</label>
              <input style={S.input} {...F('passport_number')} placeholder="For flight bookings" />
            </div>
          </div>

          {/* Dining Preferences */}
          <div style={S.card}>
            <h3 style={S.sectionTitle}>Dining Preferences</h3>
            <p style={S.sectionSub}>Claude will use these for every restaurant booking</p>
            <div style={S.grid2}>
              <div>
                <label style={S.label}>Dietary Restrictions</label>
                <input style={S.input} {...F('dietary_restrictions')} placeholder="e.g. Vegetarian, nut allergy" />
              </div>
              <div>
                <label style={S.label}>Cuisine Preferences</label>
                <input style={S.input} {...F('cuisine_preferences')} placeholder="e.g. Italian, Japanese, Thai" />
              </div>
            </div>
            <div style={{ marginTop:'16px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
              <div>
                <label style={S.label}>Favourite Restaurants</label>
                <textarea style={S.textarea} {...F('preferred_restaurants')} placeholder="Nobu, Zuma, The Ivy..." />
              </div>
              <div>
                <label style={S.label}>Dining Budget</label>
                <input style={S.input} {...F('dining_budget')} placeholder="e.g. $100-200 per person" />
              </div>
            </div>
          </div>

          {/* Travel Preferences */}
          <div style={S.card}>
            <h3 style={S.sectionTitle}>Travel Preferences</h3>
            <p style={S.sectionSub}>For flights, hotels, and everything in between</p>
            <div style={S.grid2}>
              <div>
                <label style={S.label}>Preferred Airlines</label>
                <input style={S.input} {...F('preferred_airlines')} placeholder="e.g. British Airways, Emirates" />
              </div>
              <div>
                <label style={S.label}>Cabin Class</label>
                <select style={S.input} {...F('cabin_class')}>
                  <option value="economy">Economy</option>
                  <option value="premium_economy">Premium Economy</option>
                  <option value="business">Business Class</option>
                  <option value="first">First Class</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop:'16px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
              <div>
                <label style={S.label}>Seat Preference</label>
                <select style={S.input} {...F('seat_preference')}>
                  <option value="">No preference</option>
                  <option value="window">Window</option>
                  <option value="aisle">Aisle</option>
                  <option value="middle">Middle</option>
                  <option value="front">Front of cabin</option>
                  <option value="exit">Exit row</option>
                </select>
              </div>
              <div>
                <label style={S.label}>Hotel Preferences</label>
                <input style={S.input} {...F('hotel_preferences')} placeholder="e.g. 5-star, sea view, Marriott" />
              </div>
            </div>
          </div>

          {/* Loyalty Numbers */}
          <div style={S.card}>
            <h3 style={S.sectionTitle}>Loyalty Programs</h3>
            <p style={S.sectionSub}>Stored encrypted — Claude uses these when booking flights and hotels</p>
            {loyalty.map((row, i) => (
              <div key={i} style={S.loyaltyRow}>
                <input style={{ ...S.input, flex:1 }} value={row.program}
                  onChange={e => updateLoyalty(i, 'program', e.target.value)}
                  placeholder="Program (e.g. British Airways Executive Club)" />
                <input style={{ ...S.input, flex:1 }} value={row.number}
                  onChange={e => updateLoyalty(i, 'number', e.target.value)}
                  placeholder="Membership number" />
                {loyalty.length > 1 && (
                  <button style={S.removeBtn} onClick={() => removeLoyalty(i)}>✕</button>
                )}
              </div>
            ))}
            <button style={S.addRowBtn} onClick={addLoyalty}>+ Add another loyalty program</button>
          </div>

          {/* Communication */}
          <div style={S.card}>
            <h3 style={S.sectionTitle}>Communication Preferences</h3>
            <p style={S.sectionSub}>How the AI agent should contact this client</p>
            <div>
              <label style={S.label}>Preferred Contact Method</label>
              <select style={S.input} {...F('preferred_contact')}>
                <option value="whatsapp">WhatsApp (primary)</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
            </div>
          </div>

          <div style={S.saveRow}>
            <button style={S.saveBtn} onClick={saveProfile} disabled={saving}>
              {saving ? 'Saving...' : '💾 Save & Sync to AI Agent'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
