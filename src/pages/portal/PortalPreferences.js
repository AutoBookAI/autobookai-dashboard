import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import customerApi from '../../lib/customerApi';
import AppIcon from '../../components/AppIcon';

const APP_CATEGORIES = [
  { category: 'Ride Sharing', apps: [
    { id: 'uber', name: 'Uber' },
    { id: 'lyft', name: 'Lyft' },
    { id: 'turo', name: 'Turo' },
  ]},
  { category: 'Food Delivery', apps: [
    { id: 'doordash', name: 'DoorDash' },
    { id: 'ubereats', name: 'Uber Eats' },
    { id: 'grubhub', name: 'Grubhub' },
    { id: 'postmates', name: 'Postmates' },
    { id: 'instacart', name: 'Instacart' },
  ]},
  { category: 'Restaurants', apps: [
    { id: 'opentable', name: 'OpenTable' },
    { id: 'resy', name: 'Resy' },
    { id: 'yelp', name: 'Yelp' },
  ]},
  { category: 'Travel', apps: [
    { id: 'airbnb', name: 'Airbnb' },
    { id: 'bookingcom', name: 'Booking.com' },
    { id: 'expedia', name: 'Expedia' },
    { id: 'hotelscom', name: 'Hotels.com' },
    { id: 'vrbo', name: 'VRBO' },
    { id: 'kayak', name: 'Kayak' },
  ]},
  { category: 'Airlines', apps: [
    { id: 'delta', name: 'Delta' },
    { id: 'united', name: 'United' },
    { id: 'american', name: 'American Airlines' },
    { id: 'southwest', name: 'Southwest' },
    { id: 'jetblue', name: 'JetBlue' },
    { id: 'spirit', name: 'Spirit' },
    { id: 'frontier', name: 'Frontier' },
  ]},
  { category: 'Hotels', apps: [
    { id: 'marriott', name: 'Marriott' },
    { id: 'hilton', name: 'Hilton' },
    { id: 'hyatt', name: 'Hyatt' },
    { id: 'ihg', name: 'IHG' },
    { id: 'wyndham', name: 'Wyndham' },
    { id: 'bestwestern', name: 'Best Western' },
  ]},
  { category: 'Calendar', apps: [
    { id: 'google_calendar', name: 'Google Calendar' },
    { id: 'outlook_calendar', name: 'Outlook Calendar' },
    { id: 'apple_calendar', name: 'Apple Calendar' },
  ]},
  { category: 'Email', apps: [
    { id: 'gmail', name: 'Gmail' },
    { id: 'outlook', name: 'Outlook' },
    { id: 'yahoo_mail', name: 'Yahoo Mail' },
  ]},
  { category: 'Shopping', apps: [
    { id: 'amazon', name: 'Amazon' },
    { id: 'walmart', name: 'Walmart' },
    { id: 'target', name: 'Target' },
    { id: 'costco', name: 'Costco' },
    { id: 'wholefoods', name: 'Whole Foods' },
    { id: 'ebay', name: 'eBay' },
  ]},
  { category: 'Entertainment', apps: [
    { id: 'spotify', name: 'Spotify' },
    { id: 'netflix', name: 'Netflix' },
    { id: 'hulu', name: 'Hulu' },
    { id: 'disneyplus', name: 'Disney+' },
    { id: 'youtube', name: 'YouTube' },
    { id: 'applemusic', name: 'Apple Music' },
    { id: 'ticketmaster', name: 'Ticketmaster' },
    { id: 'stubhub', name: 'StubHub' },
    { id: 'fandango', name: 'Fandango' },
  ]},
  { category: 'Productivity', apps: [
    { id: 'notion', name: 'Notion' },
    { id: 'slack', name: 'Slack' },
    { id: 'trello', name: 'Trello' },
    { id: 'asana', name: 'Asana' },
    { id: 'mondaycom', name: 'Monday.com' },
    { id: 'googledrive', name: 'Google Drive' },
    { id: 'dropbox', name: 'Dropbox' },
  ]},
  { category: 'Finance', apps: [
    { id: 'venmo', name: 'Venmo' },
    { id: 'paypal', name: 'PayPal' },
    { id: 'cashapp', name: 'Cash App' },
    { id: 'zelle', name: 'Zelle' },
    { id: 'bankofamerica', name: 'Bank of America' },
    { id: 'chase', name: 'Chase' },
    { id: 'wellsfargo', name: 'Wells Fargo' },
  ]},
  { category: 'Health', apps: [
    { id: 'myfitnesspal', name: 'MyFitnessPal' },
    { id: 'apple_health', name: 'Apple Health' },
    { id: 'peloton', name: 'Peloton' },
    { id: 'strava', name: 'Strava' },
    { id: 'fitbit', name: 'Fitbit' },
  ]},
  { category: 'Social', apps: [
    { id: 'instagram', name: 'Instagram' },
    { id: 'facebook', name: 'Facebook' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'twitter', name: 'Twitter/X' },
    { id: 'tiktok', name: 'TikTok' },
    { id: 'snapchat', name: 'Snapchat' },
    { id: 'pinterest', name: 'Pinterest' },
    { id: 'reddit', name: 'Reddit' },
    { id: 'whatsapp', name: 'WhatsApp' },
    { id: 'telegram', name: 'Telegram' },
  ]},
  { category: 'Home Services', apps: [
    { id: 'taskrabbit', name: 'TaskRabbit' },
    { id: 'thumbtack', name: 'Thumbtack' },
    { id: 'angi', name: 'Angi' },
    { id: 'nextdoor', name: 'Nextdoor' },
  ]},
  { category: 'Education', apps: [
    { id: 'coursera', name: 'Coursera' },
    { id: 'udemy', name: 'Udemy' },
    { id: 'khanacademy', name: 'Khan Academy' },
    { id: 'classpass', name: 'ClassPass' },
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
  navLogo: { height: '32px', width: '32px', objectFit: 'contain' },
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
  const [phoneNumber, setPhoneNumber] = useState('');
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

  // Voice cloning state
  const [voiceStatus, setVoiceStatus] = useState({ hasVoice: false, voiceId: null });
  const [voiceModal, setVoiceModal] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [voiceUploading, setVoiceUploading] = useState(false);
  const [voiceDeleting, setVoiceDeleting] = useState(false);
  const [playingPreview, setPlayingPreview] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);
  const streamRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    customerApi.get('/api/customer/profile').then(r => {
      if (r.data) {
        setProfile(p => ({ ...p, ...r.data, gmail_app_password: '' }));
        if (r.data.loyalty_numbers && Array.isArray(r.data.loyalty_numbers)) {
          setLoyalty(r.data.loyalty_numbers);
        }
      }
    }).catch(() => {});

    customerApi.get('/api/customer/me').then(r => {
      if (r.data?.phone_number) setPhoneNumber(r.data.phone_number);
    }).catch(() => {});

    customerApi.get('/api/customer/apps').then(r => {
      const map = {};
      (r.data || []).forEach(a => { map[a.app_name] = a.id; });
      setConnectedApps(map);
    }).catch(() => {});

    customerApi.get('/api/customer/calendar/status').then(r => {
      setCalendarConnected(r.data?.connected || false);
    }).catch(() => {});

    customerApi.get('/api/customer/voice/status').then(r => {
      setVoiceStatus(r.data || { hasVoice: false, voiceId: null });
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
    if (e.key === 'Escape') {
      if (voiceModal) closeVoiceModal();
      else if (appModal) setAppModal(null);
    }
  }, [appModal, voiceModal]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  async function saveProfile() {
    setSaving(true); setSaved(false);
    try {
      const payload = { ...profile, loyalty_numbers: loyalty.filter(l => l.program || l.number), phone_number: phoneNumber || null };
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

  // ── Voice recording functions ──────────────────────────────────────────────
  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordedBlob(blob);
        setRecording(false);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(t => t.stop());
          streamRef.current = null;
        }
        cancelAnimationFrame(animFrameRef.current);
      };

      mediaRecorder.start(100);
      setRecording(true);
      setRecordedBlob(null);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(t => t + 1);
      }, 1000);

      // Waveform visualizer
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;
      drawWaveform();
    } catch {
      alert('Microphone access is required for voice cloning.');
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    clearInterval(timerRef.current);
  }

  function drawWaveform() {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;
    const ctx = canvas.getContext('2d');
    const bufLen = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufLen);

    function draw() {
      animFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
      ctx.fillStyle = 'rgba(26, 26, 46, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#7c5cfc';
      ctx.beginPath();
      const sliceWidth = canvas.width / bufLen;
      let x = 0;
      for (let i = 0; i < bufLen; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    }
    draw();
  }

  function playPreview() {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => setPlayingPreview(false);
    audio.play();
    setPlayingPreview(true);
  }

  function stopPreview() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingPreview(false);
  }

  async function uploadVoice() {
    if (!recordedBlob) return;
    setVoiceUploading(true);
    try {
      const token = localStorage.getItem('customerToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';
      const resp = await fetch(`${apiUrl}/api/customer/voice/clone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'audio/webm',
          Authorization: `Bearer ${token}`,
        },
        body: recordedBlob,
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Upload failed');
      setVoiceStatus({ hasVoice: true, voiceId: data.voiceId });
      setVoiceModal(false);
      setRecordedBlob(null);
    } catch (err) {
      alert(err.message || 'Voice cloning failed');
    } finally {
      setVoiceUploading(false);
    }
  }

  async function deleteVoice() {
    if (!window.confirm('Delete your custom voice? Calls will use the default voice.')) return;
    setVoiceDeleting(true);
    try {
      await customerApi.delete('/api/customer/voice/clone');
      setVoiceStatus({ hasVoice: false, voiceId: null });
    } catch {
      alert('Failed to delete voice');
    } finally {
      setVoiceDeleting(false);
    }
  }

  function closeVoiceModal() {
    stopRecording();
    stopPreview();
    setVoiceModal(false);
    setRecordedBlob(null);
    setRecordingTime(0);
  }

  function formatRecordingTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
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
        <img src="/kova-logo.svg" alt="Kova" style={S.navLogo} />
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
              <label style={S.label}>Phone Number</label>
              <input style={S.input} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="+1 (555) 123-4567" />
            </div>
          </div>
          <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div>
              <label style={S.label}>Date of Birth</label>
              <input style={S.input} type="date" {...F('date_of_birth')} />
            </div>
            <div>
              <label style={S.label}>Passport Number (encrypted)</label>
              <input style={S.input} {...F('passport_number')} placeholder="For flight bookings" />
            </div>
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

        {/* Voice Settings */}
        <div style={S.card}>
          <h3 style={S.sectionTitle}>Voice Settings</h3>
          <p style={S.sectionSub}>
            Clone your voice so Kova sounds like you on phone calls. Record a 30-second sample and we'll create a custom voice using ElevenLabs.
          </p>
          {voiceStatus.hasVoice ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '8px 18px', borderRadius: '24px', fontSize: '13px', fontWeight: 600,
                background: 'rgba(46, 125, 50, 0.15)', color: '#66bb6a',
                border: '1px solid rgba(46, 125, 50, 0.25)',
              }}>
                Custom voice active
              </span>
              <button style={{
                ...S.back, background: 'rgba(124,92,252,0.15)', borderColor: 'rgba(124,92,252,0.3)',
                color: '#a78bfa',
              }} onClick={() => setVoiceModal(true)}>
                Re-record
              </button>
              <button style={{ ...S.removeBtn, padding: '8px 16px' }}
                onClick={deleteVoice} disabled={voiceDeleting}>
                {voiceDeleting ? 'Deleting...' : 'Remove voice'}
              </button>
            </div>
          ) : (
            <button style={{
              ...S.saveBtn, background: 'linear-gradient(135deg, #7c5cfc, #a78bfa)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }} onClick={() => setVoiceModal(true)}>
              Record Voice Sample
            </button>
          )}
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
            <span style={S.searchIcon}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></span>
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
              <div style={{ marginBottom: '12px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></div>
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
                          <div style={S.appCardIcon}><AppIcon name={app.name} size={22} /></div>
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

            <div style={S.modalIconWrap}><AppIcon name={appModal.name} size={36} /></div>
            <div style={S.modalTitle}>
              {connectedApps[appModal.id] ? appModal.name : `Connect ${appModal.name}`}
            </div>

            {!connectedApps[appModal.id] && (
              <>
                <div style={S.modalSub}>
                  Enter your {appModal.name} login credentials. Kova will use these to perform actions on your behalf.
                </div>

                <div style={S.modalSecurityBadge}>
                  <span style={{ fontSize: '14px' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg></span>
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
      {/* Voice Recording Modal */}
      {voiceModal && (
        <div
          style={S.modalOverlay}
          onClick={e => e.target === e.currentTarget && closeVoiceModal()}
        >
          <div style={{ ...S.modalBox, maxWidth: '480px' }}>
            <button
              style={S.modalClose}
              onClick={closeVoiceModal}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
            >
              &#10005;
            </button>

            <div style={{ ...S.modalIconWrap, background: 'rgba(124,92,252,0.15)', borderColor: 'rgba(124,92,252,0.25)' }}>
              <span><svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(124,92,252,0.9)"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg></span>
            </div>
            <div style={S.modalTitle}>Voice Cloning</div>
            <div style={S.modalSub}>
              Read the following text aloud in your natural speaking voice. Record at least 20 seconds for best results.
            </div>

            {/* Sample text to read */}
            <div style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px', padding: '16px 20px', marginBottom: '24px',
              fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', fontStyle: 'italic',
            }}>
              "Hello, I'm calling to make a reservation. I'd like a table for four this Saturday evening around seven thirty. We have a preference for a quiet corner if possible. Also, one of our guests has a nut allergy, so could you please let the kitchen know? Thank you so much, I really appreciate your help."
            </div>

            {/* Waveform Canvas */}
            <div style={{
              background: 'rgba(0,0,0,0.3)', borderRadius: '12px', overflow: 'hidden',
              marginBottom: '20px', border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <canvas
                ref={canvasRef}
                width={416}
                height={80}
                style={{ width: '100%', height: '80px', display: 'block' }}
              />
            </div>

            {/* Timer */}
            {(recording || recordedBlob) && (
              <div style={{
                textAlign: 'center', marginBottom: '20px',
                fontSize: '28px', fontWeight: 600, color: recording ? '#ef5350' : '#a78bfa',
                fontFamily: "'Inter', monospace", letterSpacing: '2px',
              }}>
                {recording && <span style={{
                  display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%',
                  background: '#ef5350', marginRight: '12px', verticalAlign: 'middle',
                  animation: 'pulse 1s ease-in-out infinite',
                }} />}
                {formatRecordingTime(recordingTime)}
              </div>
            )}

            {/* Controls */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {!recording && !recordedBlob && (
                <button
                  style={{
                    ...S.saveBtn, background: 'linear-gradient(135deg, #ef5350, #e53935)',
                    padding: '14px 36px', display: 'flex', alignItems: 'center', gap: '8px',
                  }}
                  onClick={startRecording}
                >
                  Start Recording
                </button>
              )}

              {recording && (
                <button
                  style={{
                    ...S.saveBtn, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                    padding: '14px 36px',
                  }}
                  onClick={stopRecording}
                >
                  Stop Recording
                </button>
              )}

              {recordedBlob && !recording && (
                <>
                  <button
                    style={{
                      ...S.back, padding: '12px 20px',
                      background: playingPreview ? 'rgba(239,83,80,0.15)' : 'rgba(255,255,255,0.06)',
                      borderColor: playingPreview ? 'rgba(239,83,80,0.3)' : 'rgba(255,255,255,0.1)',
                      color: playingPreview ? '#ef5350' : 'rgba(255,255,255,0.7)',
                    }}
                    onClick={playingPreview ? stopPreview : playPreview}
                  >
                    {playingPreview ? 'Stop' : 'Play'}
                  </button>
                  <button
                    style={{
                      ...S.back, padding: '12px 20px',
                    }}
                    onClick={() => { setRecordedBlob(null); setRecordingTime(0); }}
                  >
                    Re-record
                  </button>
                  <button
                    style={{
                      ...S.saveBtn,
                      background: voiceUploading
                        ? 'rgba(124,92,252,0.3)'
                        : 'linear-gradient(135deg, #7c5cfc, #a78bfa)',
                      padding: '12px 28px',
                      opacity: voiceUploading ? 0.6 : 1,
                    }}
                    onClick={uploadVoice}
                    disabled={voiceUploading}
                  >
                    {voiceUploading ? 'Cloning...' : 'Clone Voice'}
                  </button>
                </>
              )}
            </div>

            {recordingTime > 0 && recordingTime < 20 && !recording && recordedBlob && (
              <div style={{
                textAlign: 'center', marginTop: '12px',
                fontSize: '12px', color: 'rgba(251,191,36,0.8)',
              }}>
                Recording is short. 20+ seconds recommended for best quality.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
