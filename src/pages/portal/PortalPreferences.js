import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import customerApi from '../../lib/customerApi';

const APP_CATEGORIES = [
  { category: 'Ride Sharing', apps: [
    { id: 'uber', name: 'Uber', icon: '🚗' },
    { id: 'lyft', name: 'Lyft', icon: '🚕' },
  ]},
  { category: 'Food Delivery', apps: [
    { id: 'doordash', name: 'DoorDash', icon: '🍔' },
    { id: 'ubereats', name: 'Uber Eats', icon: '🥡' },
    { id: 'grubhub', name: 'Grubhub', icon: '🍕' },
    { id: 'postmates', name: 'Postmates', icon: '📦' },
  ]},
  { category: 'Restaurants', apps: [
    { id: 'opentable', name: 'OpenTable', icon: '🍽️' },
    { id: 'resy', name: 'Resy', icon: '🥂' },
    { id: 'yelp', name: 'Yelp', icon: '⭐' },
  ]},
  { category: 'Travel', apps: [
    { id: 'airbnb', name: 'Airbnb', icon: '🏡' },
    { id: 'bookingcom', name: 'Booking.com', icon: '🏨' },
    { id: 'expedia', name: 'Expedia', icon: '✈️' },
    { id: 'hotelscom', name: 'Hotels.com', icon: '🛎️' },
  ]},
  { category: 'Airlines', apps: [
    { id: 'delta', name: 'Delta', icon: '🔺' },
    { id: 'united', name: 'United', icon: '🌐' },
    { id: 'american', name: 'American Airlines', icon: '🦅' },
    { id: 'southwest', name: 'Southwest', icon: '❤️' },
    { id: 'jetblue', name: 'JetBlue', icon: '💙' },
  ]},
  { category: 'Calendar & Email', apps: [
    { id: 'google_calendar', name: 'Google Calendar', icon: '📅' },
    { id: 'outlook_calendar', name: 'Outlook Calendar', icon: '📆' },
    { id: 'apple_calendar', name: 'Apple Calendar', icon: '🗓️' },
    { id: 'gmail', name: 'Gmail', icon: '📧' },
    { id: 'outlook', name: 'Outlook', icon: '📨' },
  ]},
  { category: 'Shopping', apps: [
    { id: 'amazon', name: 'Amazon', icon: '📦' },
    { id: 'instacart', name: 'Instacart', icon: '🛒' },
    { id: 'walmart', name: 'Walmart', icon: '🏪' },
  ]},
  { category: 'Entertainment', apps: [
    { id: 'spotify', name: 'Spotify', icon: '🎵' },
    { id: 'netflix', name: 'Netflix', icon: '🎬' },
  ]},
  { category: 'Productivity', apps: [
    { id: 'notion', name: 'Notion', icon: '📝' },
    { id: 'slack', name: 'Slack', icon: '💬' },
    { id: 'trello', name: 'Trello', icon: '📋' },
  ]},
  { category: 'Finance', apps: [
    { id: 'venmo', name: 'Venmo', icon: '💸' },
    { id: 'paypal', name: 'PayPal', icon: '💰' },
    { id: 'cashapp', name: 'Cash App', icon: '💵' },
  ]},
  { category: 'Health', apps: [
    { id: 'myfitnesspal', name: 'MyFitnessPal', icon: '💪' },
    { id: 'apple_health', name: 'Apple Health', icon: '❤️‍🩹' },
  ]},
  { category: 'Social', apps: [
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'facebook', name: 'Facebook', icon: '👤' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'twitter', name: 'Twitter/X', icon: '🐦' },
  ]},
];

const S = {
  page: { minHeight: '100vh', background: '#f8f5f0', fontFamily: "'Inter',sans-serif", color: '#1a1a1a' },
  nav: {
    display: 'flex', alignItems: 'center', gap: '16px',
    padding: '0 20px', height: '64px', background: '#fff', borderBottom: '1px solid #ede8e1',
  },
  back: {
    background: 'transparent', border: '1px solid #e5e0d8', borderRadius: '6px',
    color: '#666', padding: '6px 14px', cursor: 'pointer', fontSize: '13px',
  },
  navTitle: { fontFamily: "'Playfair Display',serif", fontSize: '18px', fontWeight: 500 },
  main: { padding: '32px 20px', maxWidth: '800px', margin: '0 auto' },
  card: {
    background: '#fff', border: '1px solid #ede8e1', borderRadius: '12px',
    padding: '28px 32px', marginBottom: '24px',
  },
  sectionTitle: {
    fontFamily: "'Playfair Display',serif", fontWeight: 500, fontSize: '18px',
    marginBottom: '6px', marginTop: '0',
  },
  sectionSub: { color: '#aaa', fontSize: '13px', marginBottom: '24px' },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '0' },
  label: {
    display: 'block', color: '#999', fontSize: '11px', fontWeight: 600,
    letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '7px',
  },
  input: {
    width: '100%', background: '#f8f5f0', border: '1px solid #e5e0d8', borderRadius: '8px',
    padding: '11px 14px', color: '#1a1a1a', fontSize: '14px', boxSizing: 'border-box',
    fontFamily: "'Inter',sans-serif", outline: 'none',
  },
  textarea: {
    width: '100%', background: '#f8f5f0', border: '1px solid #e5e0d8', borderRadius: '8px',
    padding: '11px 14px', color: '#1a1a1a', fontSize: '14px', boxSizing: 'border-box',
    fontFamily: "'Inter',sans-serif", outline: 'none', resize: 'vertical', minHeight: '80px',
  },
  saveRow: { display: 'flex', justifyContent: 'flex-end', marginTop: '20px' },
  saveBtn: {
    background: 'linear-gradient(135deg,#667eea,#764ba2)', border: 'none', borderRadius: '8px',
    color: '#fff', padding: '11px 28px', cursor: 'pointer', fontSize: '14px', fontWeight: 600,
  },
  loyaltyRow: { display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' },
  removeBtn: {
    background: '#ffebee', border: 'none', borderRadius: '6px',
    color: '#c62828', padding: '6px 12px', cursor: 'pointer', fontSize: '12px', flexShrink: 0,
  },
  addRowBtn: {
    background: 'transparent', border: '1px dashed #e0d8f0', borderRadius: '8px',
    color: '#764ba2', padding: '9px 16px', cursor: 'pointer', fontSize: '13px', marginTop: '4px',
  },
  successBox: {
    background: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: '8px',
    padding: '14px 16px', fontSize: '13px', color: '#2e7d32', marginBottom: '16px',
  },
  infoBox: {
    background: '#f0f0ff', border: '1px solid #e0d8f0', borderRadius: '8px',
    padding: '14px 16px', fontSize: '13px', color: '#5c5c9e', marginBottom: '24px',
  },
  // Connected Apps
  appCategoryTitle: {
    fontSize: '13px', fontWeight: 600, color: '#999', letterSpacing: '0.5px',
    textTransform: 'uppercase', marginBottom: '12px', marginTop: '20px',
  },
  appGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px',
  },
  appCard: (connected) => ({
    background: connected ? '#f0f7ff' : '#fff',
    border: connected ? '2px solid #667eea' : '1px solid #ede8e1',
    borderRadius: '12px', padding: '16px 12px', textAlign: 'center',
    cursor: 'pointer', transition: 'all 0.15s',
  }),
  appIcon: { fontSize: '28px', marginBottom: '6px' },
  appName: { fontSize: '12px', fontWeight: 600, color: '#1a1a1a', marginBottom: '6px' },
  appStatus: (connected) => ({
    fontSize: '10px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
    color: connected ? '#2e7d32' : '#999',
  }),
  // Modal
  modal: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
    backdropFilter: 'blur(4px)',
  },
  modalBox: {
    background: '#fff', border: '1px solid #ede8e1', borderRadius: '16px',
    padding: '36px', width: '100%', maxWidth: '400px',
    boxShadow: '0 32px 80px rgba(0,0,0,0.2)',
  },
  modalTitle: {
    fontFamily: "'Playfair Display',serif", fontSize: '20px', fontWeight: 600, marginBottom: '6px',
  },
  modalSub: { color: '#888', fontSize: '13px', marginBottom: '24px' },
  modalBtns: { display: 'flex', gap: '12px', marginTop: '20px' },
  modalSaveBtn: {
    flex: 1, background: 'linear-gradient(135deg,#667eea,#764ba2)', border: 'none',
    borderRadius: '8px', color: '#fff', padding: '12px', cursor: 'pointer',
    fontSize: '14px', fontWeight: 600,
  },
  modalCancelBtn: {
    flex: 1, background: 'transparent', border: '1px solid #e5e0d8',
    borderRadius: '8px', color: '#999', padding: '12px', cursor: 'pointer', fontSize: '14px',
  },
  modalDisconnectBtn: {
    width: '100%', background: '#ffebee', border: 'none', borderRadius: '8px',
    color: '#c62828', padding: '12px', cursor: 'pointer', fontSize: '14px',
    fontWeight: 500, marginTop: '12px',
  },
};

export default function PortalPreferences() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [calendarMsg, setCalendarMsg] = useState(null);
  const [profile, setProfile] = useState({
    full_name: '', dietary_restrictions: '', cuisine_preferences: '',
    preferred_restaurants: '', dining_budget: '', preferred_airlines: '',
    seat_preference: '', cabin_class: 'economy', hotel_preferences: '',
    preferred_contact: 'whatsapp', passport_number: '', date_of_birth: '',
    timezone: '', gmail_app_password: '', has_gmail_app_password: false,
  });
  const [loyalty, setLoyalty] = useState([{ program: '', number: '' }]);
  const [connectedApps, setConnectedApps] = useState({});
  const [appModal, setAppModal] = useState(null); // { id, name, icon }
  const [appCreds, setAppCreds] = useState({ username: '', password: '' });
  const [appSaving, setAppSaving] = useState(false);

  useEffect(() => {
    customerApi.get('/api/customer/profile').then(r => {
      if (r.data) {
        setProfile(p => ({ ...p, ...r.data, gmail_app_password: '' }));
        if (r.data.loyalty_numbers && Array.isArray(r.data.loyalty_numbers)) {
          setLoyalty(r.data.loyalty_numbers);
        }
      }
    }).catch(() => {});

    // Load connected apps
    customerApi.get('/api/customer/apps').then(r => {
      const map = {};
      (r.data || []).forEach(a => { map[a.app_name] = true; });
      setConnectedApps(map);
    }).catch(() => {});

    // Check calendar connection status
    customerApi.get('/api/customer/calendar/status').then(r => {
      setCalendarConnected(r.data?.connected || false);
    }).catch(() => {});

    // Check for OAuth redirect result in URL params
    const params = new URLSearchParams(window.location.search);
    const calendarResult = params.get('calendar');
    if (calendarResult === 'connected') {
      setCalendarConnected(true);
      setCalendarMsg({ type: 'success', text: 'Google Calendar connected successfully' });
      window.history.replaceState({}, '', window.location.pathname);
    } else if (calendarResult === 'denied') {
      setCalendarMsg({ type: 'error', text: 'Calendar access was denied' });
      window.history.replaceState({}, '', window.location.pathname);
    } else if (calendarResult === 'error') {
      setCalendarMsg({ type: 'error', text: 'Failed to connect calendar. Please try again.' });
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  async function saveProfile() {
    setSaving(true); setSaved(false);
    try {
      const payload = { ...profile, loyalty_numbers: loyalty.filter(l => l.program || l.number) };
      delete payload.has_gmail_app_password;
      if (!payload.gmail_app_password) delete payload.gmail_app_password;
      await customerApi.patch('/api/customer/profile', payload);
      if (profile.gmail_app_password) {
        setProfile(p => ({ ...p, has_gmail_app_password: true, gmail_app_password: '' }));
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save');
    } finally { setSaving(false); }
  }

  async function connectCalendar() {
    setCalendarLoading(true);
    try {
      const r = await customerApi.get('/api/customer/calendar/auth-url');
      window.location.href = r.data.url;
    } catch {
      alert('Failed to start calendar connection');
      setCalendarLoading(false);
    }
  }

  async function disconnectCalendar() {
    setCalendarLoading(true);
    try {
      await customerApi.post('/api/customer/calendar/disconnect');
      setCalendarConnected(false);
      setCalendarMsg({ type: 'success', text: 'Calendar disconnected' });
    } catch {
      alert('Failed to disconnect calendar');
    } finally { setCalendarLoading(false); }
  }

  async function connectApp() {
    if (!appCreds.username || !appCreds.password) return;
    setAppSaving(true);
    try {
      await customerApi.post('/api/customer/apps', {
        app_name: appModal.id,
        username: appCreds.username,
        password: appCreds.password,
      });
      setConnectedApps(prev => ({ ...prev, [appModal.id]: true }));
      setAppModal(null);
      setAppCreds({ username: '', password: '' });
    } catch {
      alert('Failed to connect app');
    } finally { setAppSaving(false); }
  }

  async function disconnectApp(appId) {
    try {
      await customerApi.delete(`/api/customer/apps/${appId}`);
      setConnectedApps(prev => { const n = { ...prev }; delete n[appId]; return n; });
      setAppModal(null);
    } catch {
      alert('Failed to disconnect app');
    }
  }

  function openAppModal(app) {
    setAppCreds({ username: '', password: '' });
    setAppModal(app);
  }

  function F(key) {
    return { value: profile[key] || '', onChange: e => setProfile(p => ({ ...p, [key]: e.target.value })) };
  }
  function addLoyalty() { setLoyalty(l => [...l, { program: '', number: '' }]); }
  function removeLoyalty(i) { setLoyalty(l => l.filter((_, idx) => idx !== i)); }
  function updateLoyalty(i, field, val) {
    setLoyalty(l => l.map((row, idx) => idx === i ? { ...row, [field]: val } : row));
  }

  return (
    <div style={S.page}>
      <nav style={S.nav}>
        <button style={S.back} onClick={() => navigate('/portal')}>← Back</button>
        <span style={S.navTitle}>My Preferences</span>
      </nav>

      <div style={S.main}>
        <div style={S.infoBox}>
          Every preference you set here is automatically synced to your Kova assistant.
          When you ask it to book a restaurant or flight, it already knows your dietary needs,
          loyalty numbers, and travel preferences.
        </div>

        {saved && <div style={S.successBox}>Preferences saved and synced to your Kova assistant</div>}

        {/* Personal Information */}
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
          <div style={{ marginTop: '16px' }}>
            <label style={S.label}>Passport Number (encrypted)</label>
            <input style={S.input} {...F('passport_number')} placeholder="For flight bookings" />
          </div>
        </div>

        {/* Dining Preferences */}
        <div style={S.card}>
          <h3 style={S.sectionTitle}>Dining Preferences</h3>
          <p style={S.sectionSub}>Your AI will use these for every restaurant booking</p>
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
          <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
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
          <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
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

        {/* Loyalty Programs */}
        <div style={S.card}>
          <h3 style={S.sectionTitle}>Loyalty Programs</h3>
          <p style={S.sectionSub}>Stored encrypted — your AI uses these when booking flights and hotels</p>
          {loyalty.map((row, i) => (
            <div key={i} style={S.loyaltyRow}>
              <input style={{ ...S.input, flex: 1 }} value={row.program}
                onChange={e => updateLoyalty(i, 'program', e.target.value)}
                placeholder="Program (e.g. British Airways Executive Club)" />
              <input style={{ ...S.input, flex: 1 }} value={row.number}
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
          <p style={S.sectionSub}>How Kova should contact you</p>
          <div style={S.grid2}>
            <div>
              <label style={S.label}>Preferred Contact Method</label>
              <select style={S.input} {...F('preferred_contact')}>
                <option value="whatsapp">WhatsApp (primary)</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
            </div>
            <div>
              <label style={S.label}>Timezone</label>
              <select style={S.input} {...F('timezone')}>
                <option value="">Select timezone...</option>
                <option value="America/New_York">Eastern (New York)</option>
                <option value="America/Chicago">Central (Chicago)</option>
                <option value="America/Denver">Mountain (Denver)</option>
                <option value="America/Los_Angeles">Pacific (Los Angeles)</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Dubai">Dubai</option>
                <option value="Asia/Singapore">Singapore</option>
                <option value="Asia/Tokyo">Tokyo</option>
                <option value="Australia/Sydney">Sydney</option>
              </select>
            </div>
          </div>
        </div>

        {/* Google Calendar */}
        <div style={S.card}>
          <h3 style={S.sectionTitle}>Google Calendar</h3>
          <p style={S.sectionSub}>Connect your calendar so your AI can check availability and create events</p>
          {calendarMsg && (
            <div style={calendarMsg.type === 'success' ? S.successBox : {
              ...S.successBox, background: '#ffebee', borderColor: '#ffcdd2', color: '#c62828',
            }}>{calendarMsg.text}</div>
          )}
          {calendarConnected ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{
                display: 'inline-block', padding: '6px 14px', borderRadius: '20px', fontSize: '13px',
                fontWeight: 600, background: '#e8f5e9', color: '#2e7d32',
              }}>Connected</span>
              <button style={{ ...S.removeBtn, padding: '8px 16px' }}
                onClick={disconnectCalendar} disabled={calendarLoading}>
                {calendarLoading ? 'Disconnecting...' : 'Disconnect'}
              </button>
            </div>
          ) : (
            <button style={{
              ...S.saveBtn, background: '#fff', color: '#1a73e8', border: '1px solid #dadce0',
              display: 'flex', alignItems: 'center', gap: '8px',
            }} onClick={connectCalendar} disabled={calendarLoading}>
              {calendarLoading ? 'Redirecting...' : 'Connect Google Calendar'}
            </button>
          )}
        </div>

        {/* Email Integration */}
        <div style={S.card}>
          <h3 style={S.sectionTitle}>Email Integration</h3>
          <p style={S.sectionSub}>Let your AI send emails from your Gmail account</p>
          <div>
            <label style={S.label}>Gmail App Password</label>
            <input style={S.input} type="password" {...F('gmail_app_password')}
              placeholder={profile.has_gmail_app_password ? '••••••••••••••• (saved)' : 'Paste your Gmail app password'} />
            <p style={{ color: '#aaa', fontSize: '12px', marginTop: '8px' }}>
              Generate an app password at{' '}
              <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noreferrer"
                style={{ color: '#764ba2' }}>myaccount.google.com/apppasswords</a>.
              {' '}This allows your AI to send emails from your address.
            </p>
          </div>
        </div>

        {/* Connected Apps */}
        <div style={{ ...S.card, padding: '28px 28px 20px' }}>
          <h3 style={S.sectionTitle}>Connected Apps</h3>
          <p style={S.sectionSub}>
            Connect your accounts so Kova can book, order, and manage things on your behalf.
            Credentials are encrypted at rest.
          </p>

          {APP_CATEGORIES.map(cat => (
            <div key={cat.category}>
              <div style={S.appCategoryTitle}>{cat.category}</div>
              <div style={S.appGrid}>
                {cat.apps.map(app => (
                  <div key={app.id} style={S.appCard(!!connectedApps[app.id])}
                    onClick={() => openAppModal(app)}>
                    <div style={S.appIcon}>{app.icon}</div>
                    <div style={S.appName}>{app.name}</div>
                    <div style={S.appStatus(!!connectedApps[app.id])}>
                      {connectedApps[app.id] ? 'Connected' : 'Connect'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={S.saveRow}>
          <button style={S.saveBtn} onClick={saveProfile} disabled={saving}>
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>

      {/* Connect App Modal */}
      {appModal && (
        <div style={S.modal} onClick={e => e.target === e.currentTarget && setAppModal(null)}>
          <div style={S.modalBox}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>{appModal.icon}</div>
            <div style={S.modalTitle}>
              {connectedApps[appModal.id] ? `${appModal.name} Connected` : `Connect ${appModal.name}`}
            </div>
            <div style={S.modalSub}>
              {connectedApps[appModal.id]
                ? 'Your credentials are securely stored. Kova will use them when needed.'
                : 'Enter your login credentials. They will be encrypted and stored securely.'}
            </div>

            {!connectedApps[appModal.id] && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={S.label}>Username / Email</label>
                  <input style={S.input} value={appCreds.username}
                    onChange={e => setAppCreds(c => ({ ...c, username: e.target.value }))}
                    placeholder={`Your ${appModal.name} username`} />
                </div>
                <div>
                  <label style={S.label}>Password</label>
                  <input style={S.input} type="password" value={appCreds.password}
                    onChange={e => setAppCreds(c => ({ ...c, password: e.target.value }))}
                    placeholder="Your password" />
                </div>
                <div style={S.modalBtns}>
                  <button style={S.modalCancelBtn} onClick={() => setAppModal(null)}>Cancel</button>
                  <button style={S.modalSaveBtn} onClick={connectApp} disabled={appSaving}>
                    {appSaving ? 'Connecting...' : 'Connect'}
                  </button>
                </div>
              </>
            )}

            {connectedApps[appModal.id] && (
              <>
                <button style={S.modalDisconnectBtn} onClick={() => disconnectApp(appModal.id)}>
                  Disconnect {appModal.name}
                </button>
                <button style={{ ...S.modalCancelBtn, width: '100%', marginTop: '8px' }}
                  onClick={() => setAppModal(null)}>Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
