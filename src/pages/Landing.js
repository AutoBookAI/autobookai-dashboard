import React from 'react';
import { useNavigate } from 'react-router-dom';

const L = {
  page: { minHeight:'100vh', fontFamily:"'Inter',sans-serif", color:'#1a1a1a' },

  // ── Hero ────────────────────────────────────────────────────────────────────
  hero: {
    background:'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    padding:'60px 20px 80px', textAlign:'center', color:'#fff',
  },
  heroTag: {
    display:'inline-block', background:'rgba(102,126,234,0.2)', border:'1px solid rgba(102,126,234,0.4)',
    borderRadius:'20px', padding:'6px 16px', fontSize:'12px', fontWeight:600,
    letterSpacing:'1px', color:'#a0b4f7', marginBottom:'24px', textTransform:'uppercase',
  },
  heroH1: {
    fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:'clamp(28px, 5vw, 52px)',
    lineHeight:1.15, maxWidth:'700px', margin:'0 auto 20px', letterSpacing:'-0.5px',
  },
  heroSub: {
    fontSize:'18px', lineHeight:1.6, color:'rgba(255,255,255,0.6)',
    maxWidth:'560px', margin:'0 auto 40px',
  },
  heroCta: {
    display:'inline-block', background:'linear-gradient(135deg,#667eea,#764ba2)',
    border:'none', borderRadius:'10px', color:'#fff', padding:'16px 40px',
    fontSize:'16px', fontWeight:600, cursor:'pointer', textDecoration:'none',
    boxShadow:'0 8px 32px rgba(102,126,234,0.4)', transition:'transform 0.15s',
  },
  heroPrice: {
    marginTop:'16px', fontSize:'14px', color:'rgba(255,255,255,0.4)',
  },

  // ── How it works ──────────────────────────────────────────────────────────
  section: { padding:'60px 20px', maxWidth:'1000px', margin:'0 auto' },
  sectionTitle: {
    fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:'32px',
    textAlign:'center', marginBottom:'12px',
  },
  sectionSub: {
    textAlign:'center', color:'#888', fontSize:'16px', marginBottom:'56px', maxWidth:'560px', margin:'0 auto 56px',
  },
  stepsGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'40px' },
  stepCard: { textAlign:'center' },
  stepNum: {
    width:'48px', height:'48px', borderRadius:'50%',
    background:'linear-gradient(135deg,#667eea,#764ba2)', color:'#fff',
    display:'inline-flex', alignItems:'center', justifyContent:'center',
    fontSize:'20px', fontWeight:700, marginBottom:'16px',
  },
  stepTitle: { fontWeight:600, fontSize:'16px', marginBottom:'8px' },
  stepDesc: { color:'#888', fontSize:'14px', lineHeight:1.6 },

  // ── Features ──────────────────────────────────────────────────────────────
  featBg: { background:'#f8f5f0', padding:'60px 20px' },
  featGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'24px', maxWidth:'900px', margin:'0 auto' },
  featCard: {
    background:'#fff', border:'1px solid #ede8e1', borderRadius:'12px',
    padding:'28px 32px', display:'flex', gap:'16px', alignItems:'flex-start',
  },
  featIcon: { fontSize:'28px', flexShrink:0 },
  featTitle: { fontWeight:600, fontSize:'15px', marginBottom:'6px' },
  featDesc: { color:'#888', fontSize:'13px', lineHeight:1.5 },

  // ── Pricing ───────────────────────────────────────────────────────────────
  priceBg: { padding:'60px 20px', textAlign:'center' },
  priceGrid: {
    display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))',
    gap:'24px', maxWidth:'780px', margin:'0 auto',
  },
  priceCard: {
    background:'#fff', border:'2px solid #e0d8f0', borderRadius:'20px',
    padding:'40px 32px',
    boxShadow:'0 16px 48px rgba(0,0,0,0.08)',
  },
  priceCardPro: {
    background:'#fff', border:'2px solid #764ba2', borderRadius:'20px',
    padding:'40px 32px', position:'relative',
    boxShadow:'0 16px 48px rgba(118,75,162,0.15)',
  },
  pricePopular: {
    position:'absolute', top:'-14px', left:'50%', transform:'translateX(-50%)',
    background:'linear-gradient(135deg,#667eea,#764ba2)', color:'#fff',
    fontSize:'11px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase',
    padding:'5px 18px', borderRadius:'20px',
  },
  pricePlanName: { fontWeight:600, fontSize:'18px', marginBottom:'8px', color:'#1a1a1a' },
  priceAmount: {
    fontFamily:"'Playfair Display',serif", fontSize:'48px', fontWeight:700,
    color:'#1a1a1a', lineHeight:1,
  },
  pricePer: { color:'#888', fontSize:'16px', marginBottom:'24px' },
  priceFeature: {
    display:'flex', alignItems:'center', gap:'10px',
    fontSize:'14px', color:'#444', padding:'7px 0', textAlign:'left',
  },
  priceCheck: { color:'#667eea', fontWeight:700, fontSize:'16px', flexShrink:0 },
  priceCta: {
    display:'inline-block', width:'100%', background:'linear-gradient(135deg,#667eea,#764ba2)',
    border:'none', borderRadius:'10px', color:'#fff', padding:'14px',
    fontSize:'15px', fontWeight:600, cursor:'pointer', marginTop:'24px',
    boxShadow:'0 8px 32px rgba(102,126,234,0.35)', textDecoration:'none', textAlign:'center',
  },
  priceCtaOutline: {
    display:'inline-block', width:'100%', background:'transparent',
    border:'2px solid #667eea', borderRadius:'10px', color:'#667eea', padding:'12px',
    fontSize:'15px', fontWeight:600, cursor:'pointer', marginTop:'24px',
    textDecoration:'none', textAlign:'center',
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    background:'#1a1a2e', padding:'32px 40px', textAlign:'center',
    color:'rgba(255,255,255,0.3)', fontSize:'13px',
  },
};

const FEATURES = [
  { icon:'🔍', title:'Web Search with Citations', desc:'Ask anything — your AI searches the web and always cites its sources with links.' },
  { icon:'📧', title:'Send Emails', desc:'Tell your AI to email anyone. It composes and sends on your behalf.' },
  { icon:'📞', title:'Make Phone Calls', desc:'Kova can call restaurants, airlines, or anyone else to handle things for you.' },
  { icon:'🍽️', title:'Book Restaurants', desc:'Just say where and when. Kova books on OpenTable, Resy, or calls directly.' },
  { icon:'📅', title:'Calendar Management', desc:'Schedule appointments, set reminders, and manage your calendar hands-free.' },
  { icon:'🌐', title:'Browse & Book Anything', desc:'Kova uses browser automation to fill forms, sign up, and book on any website.' },
];

const STANDARD_FEATURES = [
  'Kova AI assistant 24/7 on WhatsApp',
  '30 messages per day',
  'Restaurant & travel bookings',
  'Send emails & make calls on your behalf',
  'Web search with cited sources',
  'Calendar management',
  'Remembers all your preferences',
  'Dedicated WhatsApp number',
];

const PRO_FEATURES = [
  'Everything in Standard',
  '100 messages per day',
  'Priority response times',
  'Advanced browser automation',
  'Dedicated WhatsApp number',
  'Full preference memory',
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={L.page}>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div style={L.hero}>
        <div style={L.heroTag}>Your personal AI on WhatsApp</div>
        <h1 style={L.heroH1}>Meet Kova — your AI that actually does things</h1>
        <p style={L.heroSub}>
          Book restaurants, send emails, make phone calls, manage your calendar — all through
          a simple WhatsApp message. Powered by OpenClaw.
        </p>
        <button style={L.heroCta} onClick={() => navigate('/signup')}>
          Get Started →
        </button>
        <div style={L.heroPrice}>Starting at $49.99/month — cancel anytime</div>
        <div style={{ marginTop:'20px' }}>
          <span
            style={{ color:'rgba(255,255,255,0.4)', fontSize:'13px', cursor:'pointer', textDecoration:'underline' }}
            onClick={() => navigate('/portal/login')}
          >
            Already a member? Sign in
          </span>
        </div>
      </div>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <div style={L.section}>
        <h2 style={L.sectionTitle}>How It Works</h2>
        <p style={L.sectionSub}>Three steps to your own personal Kova assistant</p>
        <div style={L.stepsGrid}>
          {[
            { num:'1', title:'Sign up & pay', desc:'Create your account and subscribe. Takes 2 minutes.' },
            { num:'2', title:'Get your WhatsApp number', desc:'We assign you a dedicated WhatsApp number connected to your personal AI.' },
            { num:'3', title:'Start messaging', desc:'Text your AI anything — "Book dinner for 2 at 7pm" — and it handles the rest.' },
          ].map(s => (
            <div key={s.num} style={L.stepCard}>
              <div style={L.stepNum}>{s.num}</div>
              <div style={L.stepTitle}>{s.title}</div>
              <div style={L.stepDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <div style={L.featBg}>
        <h2 style={{ ...L.sectionTitle, marginBottom:'12px' }}>What Your AI Can Do</h2>
        <p style={L.sectionSub}>It's like having a personal assistant in your pocket</p>
        <div style={L.featGrid}>
          {FEATURES.map(f => (
            <div key={f.title} style={L.featCard}>
              <div style={L.featIcon}>{f.icon}</div>
              <div>
                <div style={L.featTitle}>{f.title}</div>
                <div style={L.featDesc}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <div style={L.priceBg}>
        <h2 style={{ ...L.sectionTitle, marginBottom:'12px' }}>Simple Pricing</h2>
        <p style={L.sectionSub}>Two plans, everything included. No hidden fees.</p>
        <div style={L.priceGrid}>
          <div style={L.priceCard}>
            <div style={L.pricePlanName}>Standard</div>
            <div style={L.priceAmount}>$49.99</div>
            <div style={L.pricePer}>per month</div>
            {STANDARD_FEATURES.map(f => (
              <div key={f} style={L.priceFeature}>
                <span style={L.priceCheck}>✓</span>
                <span>{f}</span>
              </div>
            ))}
            <button style={L.priceCtaOutline} onClick={() => navigate('/signup')}>
              Get Started →
            </button>
          </div>
          <div style={L.priceCardPro}>
            <div style={L.pricePopular}>Most Popular</div>
            <div style={L.pricePlanName}>Pro</div>
            <div style={L.priceAmount}>$149.99</div>
            <div style={L.pricePer}>per month</div>
            {PRO_FEATURES.map(f => (
              <div key={f} style={L.priceFeature}>
                <span style={L.priceCheck}>✓</span>
                <span>{f}</span>
              </div>
            ))}
            <button style={L.priceCta} onClick={() => navigate('/signup?plan=pro')}>
              Get Kova Pro →
            </button>
          </div>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div style={L.footer}>
        <div style={{ marginBottom:'8px' }}>
          <span style={{ cursor:'pointer', textDecoration:'underline' }} onClick={() => navigate('/terms')}>Terms of Service</span>
          <span style={{ margin:'0 12px' }}>|</span>
          <span style={{ cursor:'pointer', textDecoration:'underline' }} onClick={() => navigate('/privacy')}>Privacy Policy</span>
        </div>
        © {new Date().getFullYear()} Kova. All rights reserved.
      </div>
    </div>
  );
}
