import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import customerApi from '../../lib/customerApi';

const S = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    fontFamily: "'Inter', sans-serif",
    color: '#e8e8e8',
  },
  loadingWrap: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Inter', sans-serif",
  },
  spinner: {
    width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)',
    borderTop: '3px solid #7c5cfc', borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  errorWrap: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Inter', sans-serif", flexDirection: 'column', gap: '16px',
  },
  errorText: { color: '#ff6b6b', fontSize: '16px' },
  retryBtn: {
    background: 'rgba(124,92,252,0.2)', border: '1px solid rgba(124,92,252,0.4)',
    borderRadius: '8px', color: '#a78bfa', padding: '10px 24px', cursor: 'pointer',
    fontSize: '14px', fontFamily: "'Inter', sans-serif",
  },

  // Header
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 clamp(16px, 4vw, 40px)', height: '72px',
    background: 'rgba(255,255,255,0.03)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    position: 'sticky', top: 0, zIndex: 100,
  },
  logoWrap: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoImg: {
    height: '32px', width: '32px', objectFit: 'contain',
  },
  logoText: {
    fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '20px',
    color: '#fff', letterSpacing: '-0.02em',
  },
  headerRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  logoutBtn: {
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px', color: 'rgba(255,255,255,0.6)', padding: '8px 18px',
    cursor: 'pointer', fontSize: '13px', fontFamily: "'Inter', sans-serif",
    transition: 'all 0.2s ease',
  },

  // Main
  main: {
    padding: 'clamp(24px, 4vw, 48px) clamp(16px, 4vw, 40px)',
    maxWidth: '1060px', margin: '0 auto',
  },

  // Welcome section
  welcomeSection: { marginBottom: '40px' },
  welcomeText: {
    fontFamily: "'Playfair Display', serif", fontWeight: 700,
    fontSize: 'clamp(26px, 4vw, 36px)', color: '#fff',
    marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: 1.2,
  },
  welcomeSub: {
    color: 'rgba(255,255,255,0.45)', fontSize: '15px', fontWeight: 400,
  },

  // Stats grid
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px', marginBottom: '28px',
  },
  statCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', padding: '24px',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    transition: 'all 0.3s ease',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 600,
    letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px',
  },
  statValue: {
    fontSize: '22px', fontWeight: 600, color: '#fff',
    display: 'flex', alignItems: 'center', gap: '10px',
  },
  planBadge: (plan) => ({
    display: 'inline-flex', alignItems: 'center', padding: '5px 14px',
    borderRadius: '20px', fontSize: '13px', fontWeight: 600,
    background: plan === 'pro'
      ? 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.15))'
      : 'linear-gradient(135deg, rgba(124,92,252,0.2), rgba(167,139,250,0.15))',
    color: plan === 'pro' ? '#fbbf24' : '#a78bfa',
    border: plan === 'pro'
      ? '1px solid rgba(251,191,36,0.25)'
      : '1px solid rgba(124,92,252,0.25)',
  }),
  statusBadge: (active) => ({
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '5px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
    background: active
      ? 'rgba(52,211,153,0.12)' : 'rgba(239,68,68,0.12)',
    color: active ? '#34d399' : '#f87171',
    border: active
      ? '1px solid rgba(52,211,153,0.2)' : '1px solid rgba(239,68,68,0.2)',
  }),
  statusDot: (active) => ({
    width: '7px', height: '7px', borderRadius: '50%',
    background: active ? '#34d399' : '#f87171',
    boxShadow: active ? '0 0 8px rgba(52,211,153,0.5)' : '0 0 8px rgba(248,113,113,0.5)',
  }),

  // WhatsApp card
  whatsappCard: {
    background: 'linear-gradient(135deg, rgba(37,211,102,0.12) 0%, rgba(37,211,102,0.04) 100%)',
    border: '1px solid rgba(37,211,102,0.2)',
    borderRadius: '20px', padding: 'clamp(24px, 3vw, 36px)',
    marginBottom: '28px', position: 'relative', overflow: 'hidden',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
  },
  whatsappGlow: {
    position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px',
    borderRadius: '50%', background: 'rgba(37,211,102,0.08)', filter: 'blur(50px)',
    pointerEvents: 'none',
  },
  whatsappIcon: {
    fontSize: '36px', marginBottom: '12px', display: 'block',
  },
  whatsappTitle: {
    fontFamily: "'Playfair Display', serif", fontWeight: 700,
    fontSize: 'clamp(18px, 2.5vw, 22px)', color: '#fff', marginBottom: '8px',
  },
  whatsappNumber: {
    fontFamily: "'Inter', monospace", fontSize: 'clamp(24px, 4vw, 34px)',
    fontWeight: 700, color: '#25D366', letterSpacing: '0.02em',
    marginBottom: '12px', lineHeight: 1.3,
  },
  whatsappHint: {
    color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.5,
  },
  whatsappPending: {
    color: 'rgba(255,255,255,0.35)', fontSize: '16px', fontStyle: 'italic',
  },

  // Quick Actions
  sectionTitle: {
    fontFamily: "'Playfair Display', serif", fontWeight: 600,
    fontSize: '20px', color: '#fff', marginBottom: '16px',
    letterSpacing: '-0.01em',
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '14px', marginBottom: '36px',
  },
  actionCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', padding: '24px', cursor: 'pointer',
    textDecoration: 'none', color: 'inherit',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    transition: 'all 0.3s ease', display: 'block',
  },
  actionIcon: {
    fontSize: '28px', marginBottom: '14px', display: 'block',
  },
  actionTitle: {
    fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '4px',
  },
  actionSub: {
    color: 'rgba(255,255,255,0.35)', fontSize: '12px', lineHeight: 1.4,
  },

  // Activity section
  activitySection: { marginBottom: '40px' },
  activityHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: '16px',
  },
  viewAllLink: {
    color: '#a78bfa', fontSize: '13px', fontWeight: 500,
    textDecoration: 'none', transition: 'color 0.2s ease',
  },
  activityCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', overflow: 'hidden',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
  },
  activityRow: {
    padding: '16px 24px', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', gap: '16px',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    transition: 'background 0.2s ease',
  },
  activityRowLast: {
    padding: '16px 24px', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', gap: '16px',
    transition: 'background 0.2s ease',
  },
  activityLeft: { flex: 1, minWidth: 0 },
  activityType: {
    fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.85)',
    textTransform: 'capitalize', marginBottom: '2px',
  },
  activityDesc: {
    fontSize: '13px', color: 'rgba(255,255,255,0.4)',
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  },
  activityTime: {
    fontSize: '12px', color: 'rgba(255,255,255,0.25)', flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  activityEmpty: {
    padding: '48px 24px', textAlign: 'center',
    color: 'rgba(255,255,255,0.25)', fontSize: '14px',
  },

  // Voice onboarding modal
  voiceOverlay: {
    position: 'fixed', inset: 0, zIndex: 9999,
    background: 'linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 40%, #0f3460 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Inter', sans-serif",
    animation: 'voiceFadeIn 0.5s ease',
  },
  voiceModal: {
    width: '100%', maxWidth: '520px', padding: 'clamp(32px, 5vw, 56px)',
    textAlign: 'center', position: 'relative',
  },
  voiceLogoImg: {
    height: '56px', width: '56px', objectFit: 'contain', marginBottom: '24px',
  },
  voiceTitle: {
    fontFamily: "'Playfair Display', serif", fontWeight: 700,
    fontSize: 'clamp(24px, 4vw, 32px)', color: '#fff',
    marginBottom: '12px', letterSpacing: '-0.02em', lineHeight: 1.2,
  },
  voiceSub: {
    color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.6,
    marginBottom: '36px', maxWidth: '400px', margin: '0 auto 36px',
  },
  voiceSampleText: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px', padding: '20px 24px',
    color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.7,
    fontStyle: 'italic', marginBottom: '28px', textAlign: 'left',
  },
  voiceCanvas: {
    width: '100%', height: '80px', borderRadius: '12px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    marginBottom: '20px',
  },
  voiceTimer: {
    fontSize: '28px', fontWeight: 600, color: '#a78bfa',
    fontFamily: "'Inter', monospace", marginBottom: '24px',
    letterSpacing: '0.05em',
  },
  voiceBtnRow: {
    display: 'flex', gap: '12px', justifyContent: 'center',
    flexWrap: 'wrap', marginBottom: '20px',
  },
  voiceRecordBtn: {
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    border: 'none', borderRadius: '50%', width: '64px', height: '64px',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(239,68,68,0.4)',
    transition: 'all 0.2s ease', color: '#fff', fontSize: '24px',
  },
  voiceStopBtn: {
    background: 'rgba(239,68,68,0.15)',
    border: '2px solid rgba(239,68,68,0.4)',
    borderRadius: '12px', width: '64px', height: '64px',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s ease', color: '#ef4444', fontSize: '20px',
  },
  voiceActionBtn: {
    background: 'rgba(124,92,252,0.15)',
    border: '1px solid rgba(124,92,252,0.3)',
    borderRadius: '12px', padding: '12px 28px',
    color: '#a78bfa', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
    fontFamily: "'Inter', sans-serif", transition: 'all 0.2s ease',
  },
  voiceCloneBtn: {
    background: 'linear-gradient(135deg, #7c5cfc, #a78bfa)',
    border: 'none', borderRadius: '12px', padding: '14px 36px',
    color: '#fff', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
    fontFamily: "'Inter', sans-serif", transition: 'all 0.2s ease',
    boxShadow: '0 4px 20px rgba(124,92,252,0.4)',
  },
  voiceSkipBtn: {
    background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)',
    fontSize: '14px', cursor: 'pointer', fontFamily: "'Inter', sans-serif",
    padding: '12px 24px', transition: 'color 0.2s ease',
  },
  voiceUploading: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
    padding: '20px 0',
  },
  voiceSuccess: {
    color: '#34d399', fontSize: '16px', fontWeight: 600,
    display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center',
    marginBottom: '20px',
  },
  voiceComingSoon: {
    background: 'rgba(251,191,36,0.08)',
    border: '1px solid rgba(251,191,36,0.2)',
    borderRadius: '16px', padding: '32px',
    marginBottom: '28px',
  },
  voiceComingSoonIcon: {
    fontSize: '48px', marginBottom: '16px', display: 'block',
  },
  voiceComingSoonText: {
    color: '#fbbf24', fontSize: '18px', fontWeight: 600, marginBottom: '8px',
  },
  voiceComingSoonSub: {
    color: 'rgba(255,255,255,0.4)', fontSize: '14px', lineHeight: 1.5,
  },
  voiceGotItBtn: {
    background: 'linear-gradient(135deg, #7c5cfc, #a78bfa)',
    border: 'none', borderRadius: '12px', padding: '14px 40px',
    color: '#fff', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
    fontFamily: "'Inter', sans-serif", marginTop: '8px',
    boxShadow: '0 4px 20px rgba(124,92,252,0.4)',
    transition: 'all 0.2s ease',
  },

  // Keyframes style tag content
  keyframes: `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes voiceFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes voicePulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
      50% { box-shadow: 0 0 0 12px rgba(239,68,68,0); }
    }
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
  `,
};

export default function Portal() {
  const [me, setMe] = useState(null);
  const [apps, setApps] = useState([]);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [billingLoading, setBillingLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Voice onboarding state
  const [showVoiceOnboarding, setShowVoiceOnboarding] = useState(false);
  const [voiceElevenlabsAvailable, setVoiceElevenlabsAvailable] = useState(true);
  const [voiceRecording, setVoiceRecording] = useState(false);
  const [voiceRecordedBlob, setVoiceRecordedBlob] = useState(null);
  const [voiceRecordingTime, setVoiceRecordingTime] = useState(0);
  const [voiceUploading, setVoiceUploading] = useState(false);
  const [voiceSuccess, setVoiceSuccess] = useState(false);
  const [voicePlayingPreview, setVoicePlayingPreview] = useState(false);
  const voiceMediaRecorder = useRef(null);
  const voiceCanvasRef = useRef(null);
  const voiceAnalyser = useRef(null);
  const voiceAnimFrame = useRef(null);
  const voiceTimerRef = useRef(null);
  const voiceStreamRef = useRef(null);
  const voiceAudioRef = useRef(null);

  // Handle OAuth redirect -- store token from URL params
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
    customerApi.get('/api/customer/me')
      .then(r => setMe(r.data))
      .catch(() => setError('Failed to load your account'));

    customerApi.get('/api/customer/apps')
      .then(r => setApps(Array.isArray(r.data) ? r.data : []))
      .catch(() => {});

    customerApi.get('/api/customer/activity?page=1&limit=5')
      .then(r => setActivities(r.data.activities || []))
      .catch(() => {});

    // Check voice onboarding status
    customerApi.get('/api/customer/voice/status')
      .then(r => {
        const { hasVoice, onboardingShown, elevenlabsAvailable } = r.data;
        setVoiceElevenlabsAvailable(elevenlabsAvailable);
        if (!hasVoice && !onboardingShown) {
          setShowVoiceOnboarding(true);
        }
      })
      .catch(() => {});
  }, []);

  function logout() {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customer');
    navigate('/portal/login');
  }

  async function openBilling() {
    if (billingLoading) return;
    setBillingLoading(true);
    try {
      const r = await customerApi.post('/api/customer/billing/portal');
      window.open(r.data.url, '_blank');
    } catch {
      alert('Failed to open billing portal');
    } finally {
      setBillingLoading(false);
    }
  }

  // ── Voice onboarding functions ──────────────────────────────────────────────

  const drawVoiceWaveform = useCallback(() => {
    const canvas = voiceCanvasRef.current;
    const analyser = voiceAnalyser.current;
    if (!canvas || !analyser) return;
    const ctx = canvas.getContext('2d');
    const data = new Uint8Array(analyser.frequencyBinCount);
    const draw = () => {
      voiceAnimFrame.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(data);
      ctx.fillStyle = 'rgba(13,13,26,0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#7c5cfc';
      ctx.beginPath();
      const sliceWidth = canvas.width / data.length;
      let x = 0;
      for (let i = 0; i < data.length; i++) {
        const v = data[i] / 128.0;
        const y = (v * canvas.height) / 2;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };
    draw();
  }, []);

  function startVoiceRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      voiceStreamRef.current = stream;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 2048;
      source.connect(analyserNode);
      voiceAnalyser.current = analyserNode;

      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      const chunks = [];
      recorder.ondataavailable = e => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setVoiceRecordedBlob(blob);
        cancelAnimationFrame(voiceAnimFrame.current);
        stream.getTracks().forEach(t => t.stop());
      };
      voiceMediaRecorder.current = recorder;
      recorder.start();
      setVoiceRecording(true);
      setVoiceRecordedBlob(null);
      setVoiceRecordingTime(0);

      voiceTimerRef.current = setInterval(() => {
        setVoiceRecordingTime(prev => prev + 1);
      }, 1000);

      drawVoiceWaveform();
    }).catch(() => {
      alert('Microphone access is required for voice cloning.');
    });
  }

  function stopVoiceRecording() {
    if (voiceMediaRecorder.current && voiceMediaRecorder.current.state !== 'inactive') {
      voiceMediaRecorder.current.stop();
    }
    setVoiceRecording(false);
    clearInterval(voiceTimerRef.current);
  }

  function playVoicePreview() {
    if (!voiceRecordedBlob) return;
    const url = URL.createObjectURL(voiceRecordedBlob);
    const audio = new Audio(url);
    voiceAudioRef.current = audio;
    setVoicePlayingPreview(true);
    audio.onended = () => { setVoicePlayingPreview(false); URL.revokeObjectURL(url); };
    audio.play();
  }

  function stopVoicePreview() {
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current.currentTime = 0;
    }
    setVoicePlayingPreview(false);
  }

  async function uploadVoiceClone() {
    if (!voiceRecordedBlob) return;
    setVoiceUploading(true);
    try {
      const token = localStorage.getItem('customerToken');
      const resp = await fetch(
        `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/customer/voice/clone`,
        { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'audio/webm' }, body: voiceRecordedBlob }
      );
      if (!resp.ok) throw new Error('Clone failed');
      setVoiceSuccess(true);
      // Mark onboarding shown
      await customerApi.post('/api/customer/voice/onboarding-shown');
      setTimeout(() => setShowVoiceOnboarding(false), 2000);
    } catch {
      alert('Voice cloning failed. Please try again.');
    } finally {
      setVoiceUploading(false);
    }
  }

  async function skipVoiceOnboarding() {
    setShowVoiceOnboarding(false);
    customerApi.post('/api/customer/voice/onboarding-shown').catch(() => {});
  }

  function formatVoiceTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function formatEventType(type) {
    return (type || '').replace(/_/g, ' ');
  }

  function formatTime(ts) {
    const d = new Date(ts);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return diffMins + 'm ago';
    if (diffHrs < 24) return diffHrs + 'h ago';
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
      + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }

  function getFirstName() {
    if (!me || !me.name) return '';
    return me.name.split(' ')[0];
  }

  const isActive = me && me.subscription_status === 'active';
  const agentActive = me && (me.openclaw_status === 'deployed' || me.subscription_status === 'active');

  const actionCardStyle = (key) => ({
    ...S.actionCard,
    ...(hoveredAction === key ? {
      background: 'rgba(255,255,255,0.08)',
      borderColor: 'rgba(255,255,255,0.15)',
      transform: 'translateY(-2px)',
    } : {}),
  });

  const statCardStyle = (key) => ({
    ...S.statCard,
    ...(hoveredStat === key ? {
      background: 'rgba(255,255,255,0.07)',
      borderColor: 'rgba(255,255,255,0.12)',
    } : {}),
  });

  if (error) return (
    <div style={S.errorWrap}>
      <style>{S.keyframes}</style>
      <div style={S.errorText}>{error}</div>
      <button style={S.retryBtn} onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  if (!me) return (
    <div style={S.loadingWrap}>
      <style>{S.keyframes}</style>
      <div style={S.spinner} />
    </div>
  );

  return (
    <div style={S.page}>
      <style>{S.keyframes}</style>

      {/* Voice Onboarding Modal */}
      {showVoiceOnboarding && (
        <div style={S.voiceOverlay}>
          <div style={S.voiceModal}>
            <img src="/kova-logo.svg" alt="Kova" style={S.voiceLogoImg} />
            <div style={S.voiceTitle}>Welcome to Kova</div>

            {!voiceElevenlabsAvailable ? (
              /* ElevenLabs not configured — coming soon message */
              <>
                <div style={S.voiceSub}>
                  We're building something special for you.
                </div>
                <div style={S.voiceComingSoon}>
                  <span style={S.voiceComingSoonIcon}>&#127908;</span>
                  <div style={S.voiceComingSoonText}>Voice Cloning Coming Soon!</div>
                  <div style={S.voiceComingSoonSub}>
                    Soon you'll be able to clone your voice so Kova sounds just like you when making calls on your behalf. Stay tuned!
                  </div>
                </div>
                <button
                  style={S.voiceGotItBtn}
                  onClick={skipVoiceOnboarding}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(124,92,252,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,92,252,0.4)'; }}
                >
                  Got it
                </button>
              </>
            ) : voiceSuccess ? (
              /* Voice cloned successfully */
              <>
                <div style={S.voiceSuccess}>
                  <span>&#10003;</span> Voice cloned successfully!
                </div>
                <div style={S.voiceSub}>
                  Kova will now use your voice on calls. You can manage this in Preferences anytime.
                </div>
              </>
            ) : (
              /* Recording UI */
              <>
                <div style={S.voiceSub}>
                  Want Kova to sound like you on calls? Record a short voice sample and we'll clone your voice.
                </div>

                <div style={S.voiceSampleText}>
                  <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Read this aloud:</strong><br /><br />
                  "Hi, I'd like to make a reservation for two this Saturday evening around 7 PM. We'd prefer a quiet table if possible. Thank you so much!"
                </div>

                <canvas ref={voiceCanvasRef} width={460} height={80} style={S.voiceCanvas} />

                {(voiceRecording || voiceRecordedBlob) && (
                  <div style={S.voiceTimer}>{formatVoiceTime(voiceRecordingTime)}</div>
                )}

                {voiceUploading ? (
                  <div style={S.voiceUploading}>
                    <div style={S.spinner} />
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Cloning your voice...</div>
                  </div>
                ) : (
                  <div style={S.voiceBtnRow}>
                    {!voiceRecording && !voiceRecordedBlob && (
                      <button
                        style={{ ...S.voiceRecordBtn, animation: 'voicePulse 2s ease infinite' }}
                        onClick={startVoiceRecording}
                        title="Start recording"
                      >
                        &#9679;
                      </button>
                    )}
                    {voiceRecording && (
                      <button style={S.voiceStopBtn} onClick={stopVoiceRecording} title="Stop recording">
                        &#9632;
                      </button>
                    )}
                    {voiceRecordedBlob && !voiceRecording && (
                      <>
                        <button
                          style={S.voiceActionBtn}
                          onClick={voicePlayingPreview ? stopVoicePreview : playVoicePreview}
                        >
                          {voicePlayingPreview ? 'Stop' : 'Play'}
                        </button>
                        <button style={S.voiceActionBtn} onClick={() => { setVoiceRecordedBlob(null); setVoiceRecordingTime(0); }}>
                          Re-record
                        </button>
                        <button
                          style={S.voiceCloneBtn}
                          onClick={uploadVoiceClone}
                          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(124,92,252,0.5)'; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,92,252,0.4)'; }}
                        >
                          Clone My Voice
                        </button>
                      </>
                    )}
                  </div>
                )}

                <button
                  style={S.voiceSkipBtn}
                  onClick={skipVoiceOnboarding}
                  onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
                >
                  Skip for now
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <header style={S.header}>
        <div style={S.logoWrap}>
          <img src="/kova-logo.svg" alt="Kova" style={S.logoImg} />
          <span style={S.logoText}>Kova</span>
        </div>
        <div style={S.headerRight}>
          <button
            style={S.logoutBtn}
            onClick={logout}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      <div style={S.main}>
        {/* Welcome */}
        <div style={S.welcomeSection}>
          <div style={S.welcomeText}>Welcome back, {getFirstName()}</div>
          <div style={S.welcomeSub}>Your personal Kova dashboard</div>
        </div>

        {/* Stats Grid */}
        <div style={S.statsGrid}>
          <div
            style={statCardStyle('plan')}
            onMouseEnter={() => setHoveredStat('plan')}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div style={S.statLabel}>Plan</div>
            <div style={S.statValue}>
              <span style={S.planBadge(me.plan || 'standard')}>
                {(me.plan || 'standard').charAt(0).toUpperCase() + (me.plan || 'standard').slice(1)}
              </span>
            </div>
          </div>

          <div
            style={statCardStyle('messages')}
            onMouseEnter={() => setHoveredStat('messages')}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div style={S.statLabel}>Messages Today</div>
            <div style={S.statValue}>
              <span style={S.statusBadge(isActive)}>
                <span style={S.statusDot(isActive)} />
                {isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          <div
            style={statCardStyle('apps')}
            onMouseEnter={() => setHoveredStat('apps')}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div style={S.statLabel}>Connected Apps</div>
            <div style={S.statValue}>
              {apps.length}
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>
                {apps.length === 1 ? 'app' : 'apps'}
              </span>
            </div>
          </div>

          <div
            style={statCardStyle('agent')}
            onMouseEnter={() => setHoveredStat('agent')}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div style={S.statLabel}>Agent Status</div>
            <div style={S.statValue}>
              <span style={S.statusBadge(agentActive)}>
                <span style={S.statusDot(agentActive)} />
                {agentActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* WhatsApp Card */}
        <div style={S.whatsappCard}>
          <div style={S.whatsappGlow} />
          <span style={S.whatsappIcon}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </span>
          {me.subscription_status === 'active' ? (
            <>
              <div style={S.whatsappTitle}>Your Kova WhatsApp Number</div>
              <div style={S.whatsappNumber}>+1 (415) 523-8886</div>
              <div style={S.whatsappHint}>
                First, send <strong style={{ color: '#25D366' }}>"join success-alphabet"</strong> to this number on WhatsApp to connect. Then you can text Kova anytime.
              </div>
            </>
          ) : (
            <>
              <div style={S.whatsappTitle}>WhatsApp Number</div>
              <div style={S.whatsappPending}>Activate your subscription to get started</div>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div style={S.sectionTitle}>Quick Actions</div>
        <div style={S.actionsGrid}>
          <Link
            to="/portal/preferences"
            style={actionCardStyle('prefs')}
            onMouseEnter={() => setHoveredAction('prefs')}
            onMouseLeave={() => setHoveredAction(null)}
          >
            <span style={S.actionIcon}>&#9881;&#65039;</span>
            <div style={S.actionTitle}>Preferences</div>
            <div style={S.actionSub}>Dining, travel, and loyalty settings</div>
          </Link>

          <Link
            to="/portal/activity"
            style={actionCardStyle('activity')}
            onMouseEnter={() => setHoveredAction('activity')}
            onMouseLeave={() => setHoveredAction(null)}
          >
            <span style={S.actionIcon}>&#128202;</span>
            <div style={S.actionTitle}>Activity Log</div>
            <div style={S.actionSub}>Recent messages and actions</div>
          </Link>

          <div
            style={actionCardStyle('billing')}
            onClick={openBilling}
            onMouseEnter={() => setHoveredAction('billing')}
            onMouseLeave={() => setHoveredAction(null)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && openBilling()}
          >
            <span style={S.actionIcon}>&#128179;</span>
            <div style={S.actionTitle}>
              {billingLoading ? 'Opening...' : 'Manage Billing'}
            </div>
            <div style={S.actionSub}>Payment method, invoices, and plan</div>
          </div>

          <Link
            to="/portal/preferences#apps"
            style={actionCardStyle('apps')}
            onMouseEnter={() => setHoveredAction('apps')}
            onMouseLeave={() => setHoveredAction(null)}
          >
            <span style={S.actionIcon}>&#128279;</span>
            <div style={S.actionTitle}>Connected Apps</div>
            <div style={S.actionSub}>Manage your integrations</div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div style={S.activitySection}>
          <div style={S.activityHeader}>
            <div style={S.sectionTitle}>Recent Activity</div>
            <Link
              to="/portal/activity"
              style={S.viewAllLink}
              onMouseEnter={e => { e.currentTarget.style.color = '#c4b5fd'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#a78bfa'; }}
            >
              View all &rarr;
            </Link>
          </div>
          <div style={S.activityCard}>
            {activities.length === 0 ? (
              <div style={S.activityEmpty}>
                No activity yet. Send a message to Kova to get started.
              </div>
            ) : (
              activities.map((a, i) => (
                <div
                  key={a.id || i}
                  style={i < activities.length - 1 ? S.activityRow : S.activityRowLast}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={S.activityLeft}>
                    <div style={S.activityType}>{formatEventType(a.event_type)}</div>
                    <div style={S.activityDesc}>{a.description}</div>
                  </div>
                  <div style={S.activityTime}>{formatTime(a.created_at)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
