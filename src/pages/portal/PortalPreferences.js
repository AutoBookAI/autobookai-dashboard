import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import customerApi from '../../lib/customerApi';

const APP_CATEGORIES = [
  { category: 'Ride Sharing', apps: [
    { id: 'uber', name: 'Uber', icon: '\u{1F697}' },
    { id: 'lyft', name: 'Lyft', icon: '\u{1F699}' },
    { id: 'turo', name: 'Turo', icon: '\u{1F3CE}\uFE0F' },
  ]},
  { category: 'Food Delivery', apps: [
    { id: 'doordash', name: 'DoorDash', icon: '\u{1F354}' },
    { id: 'ubereats', name: 'Uber Eats', icon: '\u{1F37D}\uFE0F' },
    { id: 'grubhub', name: 'Grubhub', icon: '\u{1F961}' },
    { id: 'postmates', name: 'Postmates', icon: '\u{1F4E6}' },
    { id: 'instacart', name: 'Instacart', icon: '\u{1F6D2}' },
  ]},
  { category: 'Restaurants', apps: [
    { id: 'opentable', name: 'OpenTable', icon: '\u{1F377}' },
    { id: 'resy', name: 'Resy', icon: '\u{1F374}' },
    { id: 'yelp', name: 'Yelp', icon: '\u2B50' },
  ]},
  { category: 'Travel', apps: [
    { id: 'airbnb', name: 'Airbnb', icon: '\u{1F3E0}' },
    { id: 'bookingcom', name: 'Booking.com', icon: '\u{1F3E8}' },
    { id: 'expedia', name: 'Expedia', icon: '\u2708\uFE0F' },
    { id: 'hotelscom', name: 'Hotels.com', icon: '\u{1F6CF}\uFE0F' },
    { id: 'vrbo', name: 'VRBO', icon: '\u{1F3E1}' },
    { id: 'kayak', name: 'Kayak', icon: '\u{1F50D}' },
  ]},
  { category: 'Airlines', apps: [
    { id: 'delta', name: 'Delta', icon: '\u2708\uFE0F' },
    { id: 'united', name: 'United', icon: '\u{1F6EB}' },
    { id: 'american', name: 'American Airlines', icon: '\u{1F985}' },
    { id: 'southwest', name: 'Southwest', icon: '\u2764\uFE0F' },
    { id: 'jetblue', name: 'JetBlue', icon: '\u{1F499}' },
    { id: 'spirit', name: 'Spirit', icon: '\u{1F49B}' },
    { id: 'frontier', name: 'Frontier', icon: '\u{1F7E2}' },
  ]},
  { category: 'Hotels', apps: [
    { id: 'marriott', name: 'Marriott', icon: '\u{1F3E8}' },
    { id: 'hilton', name: 'Hilton', icon: '\u{1F31F}' },
    { id: 'hyatt', name: 'Hyatt', icon: '\u{1F48E}' },
    { id: 'ihg', name: 'IHG', icon: '\u{1F3E2}' },
    { id: 'wyndham', name: 'Wyndham', icon: '\u{1F511}' },
    { id: 'bestwestern', name: 'Best Western', icon: '\u{1F451}' },
  ]},
  { category: 'Calendar', apps: [
    { id: 'google_calendar', name: 'Google Calendar', icon: '\u{1F4C5}' },
    { id: 'outlook_calendar', name: 'Outlook Calendar', icon: '\u{1F4C6}' },
    { id: 'apple_calendar', name: 'Apple Calendar', icon: '\u{1F34E}' },
  ]},
  { category: 'Email', apps: [
    { id: 'gmail', name: 'Gmail', icon: '\u2709\uFE0F' },
    { id: 'outlook', name: 'Outlook', icon: '\u{1F4E7}' },
    { id: 'yahoo_mail', name: 'Yahoo Mail', icon: '\u{1F4E8}' },
  ]},
  { category: 'Shopping', apps: [
    { id: 'amazon', name: 'Amazon', icon: '\u{1F4E6}' },
    { id: 'walmart', name: 'Walmart', icon: '\u{1F6D2}' },
    { id: 'target', name: 'Target', icon: '\u{1F3AF}' },
    { id: 'costco', name: 'Costco', icon: '\u{1F3EA}' },
    { id: 'wholefoods', name: 'Whole Foods', icon: '\u{1F951}' },
    { id: 'ebay', name: 'eBay', icon: '\u{1F3F7}\uFE0F' },
  ]},
  { category: 'Entertainment', apps: [
    { id: 'spotify', name: 'Spotify', icon: '\u{1F3B5}' },
    { id: 'netflix', name: 'Netflix', icon: '\u{1F3AC}' },
    { id: 'hulu', name: 'Hulu', icon: '\u{1F4FA}' },
    { id: 'disneyplus', name: 'Disney+', icon: '\u{1F3F0}' },
    { id: 'youtube', name: 'YouTube', icon: '\u25B6\uFE0F' },
    { id: 'applemusic', name: 'Apple Music', icon: '\u{1F3B6}' },
    { id: 'ticketmaster', name: 'Ticketmaster', icon: '\u{1F3AB}' },
    { id: 'stubhub', name: 'StubHub', icon: '\u{1F39F}\uFE0F' },
    { id: 'fandango', name: 'Fandango', icon: '\u{1F3AC}' },
  ]},
  { category: 'Productivity', apps: [
    { id: 'notion', name: 'Notion', icon: '\u{1F4DD}' },
    { id: 'slack', name: 'Slack', icon: '\u{1F4AC}' },
    { id: 'trello', name: 'Trello', icon: '\u{1F4CB}' },
    { id: 'asana', name: 'Asana', icon: '\u2705' },
    { id: 'mondaycom', name: 'Monday.com', icon: '\u{1F4CA}' },
    { id: 'googledrive', name: 'Google Drive', icon: '\u{1F4BE}' },
    { id: 'dropbox', name: 'Dropbox', icon: '\u{1F4C1}' },
  ]},
  { category: 'Finance', apps: [
    { id: 'venmo', name: 'Venmo', icon: '\u{1F4B8}' },
    { id: 'paypal', name: 'PayPal', icon: '\u{1F4B0}' },
    { id: 'cashapp', name: 'Cash App', icon: '\u{1F4B5}' },
    { id: 'zelle', name: 'Zelle', icon: '\u26A1' },
    { id: 'bankofamerica', name: 'Bank of America', icon: '\u{1F3E6}' },
    { id: 'chase', name: 'Chase', icon: '\u{1F4B3}' },
    { id: 'wellsfargo', name: 'Wells Fargo', icon: '\u{1F3E7}' },
  ]},
  { category: 'Health', apps: [
    { id: 'myfitnesspal', name: 'MyFitnessPal', icon: '\u{1F4AA}' },
    { id: 'apple_health', name: 'Apple Health', icon: '\u2764\uFE0F' },
    { id: 'peloton', name: 'Peloton', icon: '\u{1F6B4}' },
    { id: 'strava', name: 'Strava', icon: '\u{1F3C3}' },
    { id: 'fitbit', name: 'Fitbit', icon: '\u231A' },
  ]},
  { category: 'Social', apps: [
    { id: 'instagram', name: 'Instagram', icon: '\u{1F4F8}' },
    { id: 'facebook', name: 'Facebook', icon: '\u{1F465}' },
    { id: 'linkedin', name: 'LinkedIn', icon: '\u{1F4BC}' },
    { id: 'twitter', name: 'Twitter/X', icon: '\u{1F426}' },
    { id: 'tiktok', name: 'TikTok', icon: '\u{1F3B5}' },
    { id: 'snapchat', name: 'Snapchat', icon: '\u{1F47B}' },
    { id: 'pinterest', name: 'Pinterest', icon: '\u{1F4CC}' },
    { id: 'reddit', name: 'Reddit', icon: '\u{1F916}' },
    { id: 'whatsapp', name: 'WhatsApp', icon: '\u{1F4AC}' },
    { id: 'telegram', name: 'Telegram', icon: '\u2708\uFE0F' },
  ]},
  { category: 'Home Services', apps: [
    { id: 'taskrabbit', name: 'TaskRabbit', icon: '\u{1F430}' },
    { id: 'thumbtack', name: 'Thumbtack', icon: '\u{1F4CC}' },
    { id: 'angi', name: 'Angi', icon: '\u{1F3E0}' },
    { id: 'nextdoor', name: 'Nextdoor', icon: '\u{1F3D8}\uFE0F' },
  ]},
  { category: 'Education', apps: [
    { id: 'coursera', name: 'Coursera', icon: '\u{1F393}' },
    { id: 'udemy', name: 'Udemy', icon: '\u{1F4DA}' },
    { id: 'khanacademy', name: 'Khan Academy', icon: '\u{1F392}' },
    { id: 'classpass', name: 'ClassPass', icon: '\u{1F9D8}' },
  ]},
];

const S = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    fontFamily: "'Inter', sans-serif",
    color: '#e0e0e0',
  },
  nav: {
    display: 'flex', alignItems: 'center', gap: '16px',
    padding: '0 24px', height: '64px',
    background: 'rgba(255,255,255,0.04)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    backdropFilter: 'blur(12px)',
  },
  back: {
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px', color: 'rgba(255,255,255,0.7)', padding: '7px 16px',
    cursor: 'pointer', fontSize: '13px', fontFamily: "'Inter', sans-serif",
    transition: 'all 0.2s',
  },
  navTitle: {
    fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600,
    color: '#fff',
  },
  main: { padding: '32px 20px', maxWidth: '860px', margin: '0 auto' },
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px', padding: '28px 32px', marginBottom: '24px',
    backdropFilter: 'blur(8px)',
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '20px',
    marginBottom: '6px', marginTop: '0', color: '#fff',
  },
  sectionSub: {
    color: 'rgba(255,255,255,0.45)', fontSize: '13px', marginBottom: '24px',
    lineHeight: 1.5,
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px', marginBottom: '0',
  },
  label: {
    display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 600,
    letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '7px',
  },
  input: {
    width: '100%', background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
    padding: '12px 14px', color: '#e0e0e0', fontSize: '14px', boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif", outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    width: '100%', background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
    padding: '12px 14px', color: '#e0e0e0', fontSize: '14px', boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif", outline: 'none', resize: 'vertical', minHeight: '80px',
    transition: 'border-color 0.2s',
  },
  saveRow: { display: 'flex', justifyContent: 'flex-end', marginTop: '20px' },
  saveBtn: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', borderRadius: '10px',
    color: '#fff', padding: '12px 32px', cursor: 'pointer', fontSize: '14px', fontWeight: 600,
    fontFamily: "'Inter', sans-serif", transition: 'opacity 0.2s, transform 0.2s',
  },
  loyaltyRow: { display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' },
  removeBtn: {
    background: 'rgba(198, 40, 40, 0.15)', border: '1px solid rgba(198, 40, 40, 0.3)',
    borderRadius: '8px', color: '#ef5350', padding: '7px 14px', cursor: 'pointer',
    fontSize: '12px', flexShrink: 0, fontFamily: "'Inter', sans-serif",
  },
  addRowBtn: {
    background: 'transparent', border: '1px dashed rgba(118, 75, 162, 0.4)', borderRadius: '10px',
    color: '#b39ddb', padding: '10px 18px', cursor: 'pointer', fontSize: '13px', marginTop: '4px',
    fontFamily: "'Inter', sans-serif", transition: 'all 0.2s',
  },
  successBox: {
    background: 'rgba(46, 125, 50, 0.12)', border: '1px solid rgba(46, 125, 50, 0.25)',
    borderRadius: '10px', padding: '14px 16px', fontSize: '13px', color: '#66bb6a',
    marginBottom: '16px',
  },
  infoBox: {
    background: 'rgba(102, 126, 234, 0.08)', border: '1px solid rgba(102, 126, 234, 0.2)',
    borderRadius: '12px', padding: '16px 20px', fontSize: '13px', color: 'rgba(255,255,255,0.6)',
    marginBottom: '28px', lineHeight: 1.6,
  },

  // Connected Apps - Search
  searchWrap: {
    position: 'relative', marginBottom: '24px',
  },
  searchIcon: {
    position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
    color: 'rgba(255,255,255,0.3)', fontSize: '15px', pointerEvents: 'none',
  },
  searchInput: {
    width: '100%', background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
    padding: '13px 16px 13px 44px', color: '#e0e0e0', fontSize: '14px',
    boxSizing: 'border-box', fontFamily: "'Inter', sans-serif", outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
  },

  // Connected Apps - Category
  categoryHeader: (expanded) => ({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 0', cursor: 'pointer', userSelect: 'none',
    borderBottom: expanded ? 'none' : '1px solid rgba(255,255,255,0.05)',
    transition: 'all 0.2s',
  }),
  categoryName: {
    fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)',
    letterSpacing: '0.8px', textTransform: 'uppercase',
  },
  categoryMeta: {
    display: 'flex', alignItems: 'center', gap: '12px',
  },
  categoryCount: {
    fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: 500,
  },
  categoryChevron: (expanded) => ({
    fontSize: '12px', color: 'rgba(255,255,255,0.3)',
    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.25s ease',
  }),
  categoryBody: (expanded) => ({
    maxHeight: expanded ? '2000px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.35s ease',
    paddingBottom: expanded ? '16px' : '0',
  }),

  // Connected Apps - App Grid
  appGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '12px', paddingTop: '8px',
  },
  appCard: (connected) => ({
    background: connected
      ? 'rgba(102, 126, 234, 0.12)'
      : 'rgba(255,255,255,0.03)',
    border: connected
      ? '1px solid rgba(102, 126, 234, 0.35)'
      : '1px solid rgba(255,255,255,0.06)',
    borderRadius: '14px', padding: '18px 14px',
    display: 'flex', alignItems: 'center', gap: '12px',
    cursor: 'pointer', transition: 'all 0.2s ease',
    position: 'relative', overflow: 'hidden',
  }),
  appCardIcon: {
    fontSize: '24px', flexShrink: 0, width: '36px', height: '36px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(255,255,255,0.06)', borderRadius: '10px',
  },
  appCardInfo: {
    flex: 1, minWidth: 0,
  },
  appCardName: {
    fontSize: '13px', fontWeight: 600, color: '#fff',
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  },
  appCardBadge: {
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px',
    textTransform: 'uppercase', color: '#66bb6a', marginTop: '3px',
  },

  // Modal
  modalOverlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, backdropFilter: 'blur(8px)',
    padding: '20px',
  },
  modalBox: {
    background: 'linear-gradient(145deg, #1e2340, #1a1f38)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px', padding: '36px', width: '100%', maxWidth: '420px',
    boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset',
    position: 'relative',
  },
  modalClose: {
    position: 'absolute', top: '16px', right: '16px',
    background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '8px',
    color: 'rgba(255,255,255,0.4)', width: '32px', height: '32px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', fontSize: '16px', fontFamily: "'Inter', sans-serif",
    transition: 'all 0.2s',
  },
  modalIconWrap: {
    width: '64px', height: '64px', borderRadius: '18px',
    background: 'rgba(102, 126, 234, 0.12)', border: '1px solid rgba(102, 126, 234, 0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '30px', marginBottom: '20px',
  },
  modalTitle: {
    fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 600,
    marginBottom: '8px', color: '#fff',
  },
  modalSub: {
    color: 'rgba(255,255,255,0.45)', fontSize: '13px', marginBottom: '24px', lineHeight: 1.6,
  },
  modalSecurityBadge: {
    display: 'flex', alignItems: 'center', gap: '10px',
    background: 'rgba(102, 126, 234, 0.08)',
    border: '1px solid rgba(102, 126, 234, 0.15)',
    borderRadius: '10px', padding: '12px 16px', marginBottom: '24px',
    fontSize: '12px', color: 'rgba(255,255,255,0.5)',
  },
  modalLabel: {
    display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 600,
    letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '7px',
  },
  modalInput: {
    width: '100%', background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
    padding: '12px 14px', color: '#e0e0e0', fontSize: '14px', boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif", outline: 'none',
    transition: 'border-color 0.2s',
  },
  modalConnectBtn: (disabled) => ({
    width: '100%', border: 'none', borderRadius: '10px',
    background: disabled
      ? 'rgba(102, 126, 234, 0.3)'
      : 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff', padding: '13px', cursor: disabled ? 'default' : 'pointer',
    fontSize: '14px', fontWeight: 600, fontFamily: "'Inter', sans-serif",
    marginTop: '20px', transition: 'opacity 0.2s, transform 0.15s',
    opacity: disabled ? 0.6 : 1,
  }),
  modalCancelBtn: {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px',
    color: 'rgba(255,255,255,0.5)', padding: '12px', cursor: 'pointer',
    fontSize: '13px', fontFamily: "'Inter', sans-serif", marginTop: '10px',
    transition: 'all 0.2s',
  },
  modalConnectedBadge: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: 'rgba(46, 125, 50, 0.15)', color: '#66bb6a', borderRadius: '24px',
    padding: '8px 18px', fontSize: '13px', fontWeight: 600, marginBottom: '20px',
    border: '1px solid rgba(46, 125, 50, 0.25)',
  },
  modalDisconnectBtn: {
    width: '100%', background: 'rgba(198, 40, 40, 0.12)',
    border: '1px solid rgba(198, 40, 40, 0.25)',
    borderRadius: '10px', color: '#ef5350', padding: '12px', cursor: 'pointer',
    fontSize: '14px', fontWeight: 500, fontFamily: "'Inter', sans-serif",
    transition: 'background 0.2s',
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
  const [appModal, setAppModal] = useState(null);
  const [appCreds, setAppCreds] = useState({ username: '', password: '' });
  const [appSaving, setAppSaving] = useState(false);
  const [appSearch, setAppSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    customerApi.get('/api/customer/profile').then(r => {
      if (r.data) {
        setProfile(p => ({ ...p, ...r.data, gmail_app_password: '' }));
        if (r.data.loyalty_numbers && Array.isArray(r.data.loyalty_numbers)) {
          setLoyalty(r.data.loyalty_numbers);
        }
      }
    }).catch(() => {});

    customerApi.get('/api/customer/apps').then(r => {
      const map = {};
      (r.data || []).forEach(a => { map[a.app_name] = a.id; });
      setConnectedApps(map);
    }).catch(() => {});

    customerApi.get('/api/customer/calendar/status').then(r => {
      setCalendarConnected(r.data?.connected || false);
    }).catch(() => {});

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

  // Close modal on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && appModal) {
      setAppModal(null);
    }
  }, [appModal]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

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
      const r = await customerApi.post('/api/customer/apps', {
        app_name: appModal.id,
        credentials: { username: appCreds.username, password: appCreds.password },
      });
      setConnectedApps(prev => ({ ...prev, [appModal.id]: r.data?.id || appModal.id }));
      setAppModal(null);
      setAppCreds({ username: '', password: '' });
    } catch {
      alert('Failed to connect app');
    } finally { setAppSaving(false); }
  }

  async function disconnectApp(appId) {
    const recordId = connectedApps[appId];
    try {
      await customerApi.delete(`/api/customer/apps/${recordId}`);
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

  function toggleCategory(catName) {
    setExpandedCategories(prev => ({ ...prev, [catName]: !prev[catName] }));
  }

  function F(key) {
    return { value: profile[key] || '', onChange: e => setProfile(p => ({ ...p, [key]: e.target.value })) };
  }
  function addLoyalty() { setLoyalty(l => [...l, { program: '', number: '' }]); }
  function removeLoyalty(i) { setLoyalty(l => l.filter((_, idx) => idx !== i)); }
  function updateLoyalty(i, field, val) {
    setLoyalty(l => l.map((row, idx) => idx === i ? { ...row, [field]: val } : row));
  }

  // Filter categories based on search
  const searchLower = appSearch.toLowerCase().trim();
  const filteredCategories = APP_CATEGORIES.map(cat => {
    if (!searchLower) return cat;
    const matchedApps = cat.apps.filter(app =>
      app.name.toLowerCase().includes(searchLower)
    );
    return matchedApps.length > 0 ? { ...cat, apps: matchedApps } : null;
  }).filter(Boolean);

  // When searching, all matching categories should be expanded
  const isCategoryExpanded = (catName) => {
    if (searchLower) return true;
    return !!expandedCategories[catName];
  };

  const totalConnected = Object.keys(connectedApps).length;
  const totalApps = APP_CATEGORIES.reduce((sum, cat) => sum + cat.apps.length, 0);

  return (
    <div style={S.page}>
      <nav style={S.nav}>
        <button style={S.back} onClick={() => navigate('/portal')}>
          &#8592; Back
        </button>
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
          <p style={S.sectionSub}>Used for bookings and reservations -- encrypted at rest</p>
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
          <p style={S.sectionSub}>Stored encrypted -- your AI uses these when booking flights and hotels</p>
          {loyalty.map((row, i) => (
            <div key={i} style={S.loyaltyRow}>
              <input style={{ ...S.input, flex: 1 }} value={row.program}
                onChange={e => updateLoyalty(i, 'program', e.target.value)}
                placeholder="Program (e.g. British Airways Executive Club)" />
              <input style={{ ...S.input, flex: 1 }} value={row.number}
                onChange={e => updateLoyalty(i, 'number', e.target.value)}
                placeholder="Membership number" />
              {loyalty.length > 1 && (
                <button style={S.removeBtn} onClick={() => removeLoyalty(i)}>&#10005;</button>
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
              ...S.successBox, background: 'rgba(198, 40, 40, 0.12)',
              borderColor: 'rgba(198, 40, 40, 0.25)', color: '#ef5350',
            }}>{calendarMsg.text}</div>
          )}
          {calendarConnected ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{
                display: 'inline-block', padding: '7px 16px', borderRadius: '24px', fontSize: '13px',
                fontWeight: 600, background: 'rgba(46, 125, 50, 0.15)', color: '#66bb6a',
                border: '1px solid rgba(46, 125, 50, 0.25)',
              }}>Connected</span>
              <button style={{ ...S.removeBtn, padding: '8px 16px' }}
                onClick={disconnectCalendar} disabled={calendarLoading}>
                {calendarLoading ? 'Disconnecting...' : 'Disconnect'}
              </button>
            </div>
          ) : (
            <button style={{
              ...S.saveBtn, background: 'rgba(255,255,255,0.06)', color: '#90caf9',
              border: '1px solid rgba(255,255,255,0.1)',
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
              placeholder={profile.has_gmail_app_password ? '............... (saved)' : 'Paste your Gmail app password'} />
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', marginTop: '8px' }}>
              Generate an app password at{' '}
              <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noreferrer"
                style={{ color: '#b39ddb' }}>myaccount.google.com/apppasswords</a>.
              {' '}This allows your AI to send emails from your address.
            </p>
          </div>
        </div>

        {/* Connected Apps - Redesigned */}
        <div style={{ ...S.card, padding: '28px 28px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div>
              <h3 style={S.sectionTitle}>Connected Apps</h3>
              <p style={S.sectionSub}>
                Connect your accounts so Kova can book, order, and manage things on your behalf.
                Credentials are encrypted at rest.
              </p>
            </div>
            <div style={{
              background: 'rgba(102, 126, 234, 0.12)', border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '10px', padding: '8px 14px', textAlign: 'center', flexShrink: 0, marginLeft: '16px',
            }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#667eea' }}>{totalConnected}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                of {totalApps}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div style={S.searchWrap}>
            <span style={S.searchIcon}>&#128269;</span>
            <input
              style={S.searchInput}
              type="text"
              placeholder="Search apps..."
              value={appSearch}
              onChange={e => setAppSearch(e.target.value)}
            />
          </div>

          {/* Category Sections */}
          {filteredCategories.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255,255,255,0.3)' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>&#128269;</div>
              <div style={{ fontSize: '14px' }}>No apps found matching "{appSearch}"</div>
            </div>
          )}

          {filteredCategories.map(cat => {
            const expanded = isCategoryExpanded(cat.category);
            const connectedInCat = cat.apps.filter(a => !!connectedApps[a.id]).length;
            return (
              <div key={cat.category}>
                <div
                  style={S.categoryHeader(expanded)}
                  onClick={() => toggleCategory(cat.category)}
                >
                  <span style={S.categoryName}>{cat.category}</span>
                  <div style={S.categoryMeta}>
                    {connectedInCat > 0 && (
                      <span style={{
                        fontSize: '10px', fontWeight: 700, color: '#66bb6a',
                        background: 'rgba(46, 125, 50, 0.15)',
                        padding: '3px 10px', borderRadius: '12px',
                        letterSpacing: '0.3px',
                      }}>
                        {connectedInCat} connected
                      </span>
                    )}
                    <span style={S.categoryCount}>{cat.apps.length} apps</span>
                    <span style={S.categoryChevron(expanded)}>&#9660;</span>
                  </div>
                </div>
                <div style={S.categoryBody(expanded)}>
                  <div style={S.appGrid}>
                    {cat.apps.map(app => {
                      const isConnected = !!connectedApps[app.id];
                      return (
                        <div
                          key={app.id}
                          style={S.appCard(isConnected)}
                          onClick={() => openAppModal(app)}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = isConnected
                              ? 'rgba(102, 126, 234, 0.18)'
                              : 'rgba(255,255,255,0.07)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = isConnected
                              ? 'rgba(102, 126, 234, 0.12)'
                              : 'rgba(255,255,255,0.03)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <div style={S.appCardIcon}>{app.icon}</div>
                          <div style={S.appCardInfo}>
                            <div style={S.appCardName}>{app.name}</div>
                            {isConnected && (
                              <div style={S.appCardBadge}>
                                <span style={{ fontSize: '8px' }}>&#9679;</span> Connected
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={S.saveRow}>
          <button style={S.saveBtn} onClick={saveProfile} disabled={saving}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>

      {/* Connect App Modal */}
      {appModal && (
        <div
          style={S.modalOverlay}
          onClick={e => e.target === e.currentTarget && setAppModal(null)}
        >
          <div style={S.modalBox}>
            <button
              style={S.modalClose}
              onClick={() => setAppModal(null)}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
            >
              &#10005;
            </button>

            <div style={S.modalIconWrap}>{appModal.icon}</div>
            <div style={S.modalTitle}>
              {connectedApps[appModal.id] ? appModal.name : `Connect ${appModal.name}`}
            </div>

            {!connectedApps[appModal.id] && (
              <>
                <div style={S.modalSub}>
                  Enter your {appModal.name} login credentials. Kova will use these to perform actions on your behalf.
                </div>

                <div style={S.modalSecurityBadge}>
                  <span style={{ fontSize: '14px' }}>&#128274;</span>
                  <span>Credentials encrypted with AES-256</span>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={S.modalLabel}>Username / Email</label>
                  <input
                    style={S.modalInput}
                    value={appCreds.username}
                    onChange={e => setAppCreds(c => ({ ...c, username: e.target.value }))}
                    placeholder={`Your ${appModal.name} email or username`}
                    autoFocus
                    onFocus={e => { e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                    onKeyDown={e => e.key === 'Enter' && appCreds.username && appCreds.password && connectApp()}
                  />
                </div>
                <div>
                  <label style={S.modalLabel}>Password</label>
                  <input
                    style={S.modalInput}
                    type="password"
                    value={appCreds.password}
                    onChange={e => setAppCreds(c => ({ ...c, password: e.target.value }))}
                    placeholder="Your password"
                    onFocus={e => { e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                    onKeyDown={e => e.key === 'Enter' && appCreds.username && appCreds.password && connectApp()}
                  />
                </div>

                <button
                  style={S.modalConnectBtn(appSaving || !appCreds.username || !appCreds.password)}
                  onClick={connectApp}
                  disabled={appSaving || !appCreds.username || !appCreds.password}
                  onMouseEnter={e => { if (!appSaving && appCreds.username && appCreds.password) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {appSaving ? 'Connecting...' : 'Connect'}
                </button>
                <button
                  style={S.modalCancelBtn}
                  onClick={() => setAppModal(null)}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                >
                  Cancel
                </button>
              </>
            )}

            {connectedApps[appModal.id] && (
              <>
                <div style={S.modalSub}>
                  Your credentials are securely stored and encrypted. Kova will use them when needed to complete tasks on your behalf.
                </div>
                <div style={S.modalConnectedBadge}>
                  <span>&#10003;</span> Connected
                </div>
                <button
                  style={S.modalDisconnectBtn}
                  onClick={() => disconnectApp(appModal.id)}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(198, 40, 40, 0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(198, 40, 40, 0.12)'; }}
                >
                  Disconnect {appModal.name}
                </button>
                <button
                  style={S.modalCancelBtn}
                  onClick={() => setAppModal(null)}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
