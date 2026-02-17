import React from 'react';
import { useNavigate } from 'react-router-dom';

const L = {
  page: { minHeight:'100vh', fontFamily:"'Inter',sans-serif", color:'#1a1a1a' },

  // ── Hero ────────────────────────────────────────────────────────────────────
  hero: {
    background:'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    padding:'80px 40px 100px', textAlign:'center', color:'#fff',
  },
  heroTag: {
    display:'inline-block', background:'rgba(102,126,234,0.2)', border:'1px solid rgba(102,126,234,0.4)',
    borderRadius:'20px', padding:'6px 16px', fontSize:'12px', fontWeight:600,
    letterSpacing:'1px', color:'#a0b4f7', marginBottom:'24px', textTransform:'uppercase',
  },
  heroH1: {
    fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:'52px',
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
  section: { padding:'80px 40px', maxWidth:'1000px', margin:'0 auto' },
  sectionTitle: {
    fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:'32px',
    textAlign:'center', marginBottom:'12px',
  },
  sectionSub: {
    textAlign:'center', color:'#888', fontSize:'16px', marginBottom:'56px', maxWidth:'560px', margin:'0 auto 56px',
  },
  stepsGrid: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'40px' },
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
  featBg: { background:'#f8f5f0', padding:'80px 40px' },
  featGrid: { display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'24px', maxWidth:'900px', margin:'0 auto' },
  featCard: {
    background:'#fff', border:'1px solid #ede8e1', borderRadius:'12px',
    padding:'28px 32px', display:'flex', gap:'16px', alignItems:'flex-start',
  },
  featIcon: { fontSize:'28px', flexShrink:0 },
  featTitle: { fontWeight:600, fontSize:'15px', marginBottom:'6px' },
  featDesc: { color:'#888', fontSize:'13px', lineHeight:1.5 },

  // ── Pricing ───────────────────────────────────────────────────────────────
  priceBg: { padding:'80px 40px', textAlign:'center' },
  priceCard: {
    background:'#fff', border:'2px solid #e0d8f0', borderRadius:'20px',
    padding:'48px 40px', maxWidth:'420px', margin:'0 auto',
    boxShadow:'0 16px 48px rgba(0,0,0,0.08)',
  },
  priceAmount: {
    fontFamily:"'Playfair Display',serif", fontSize:'56px', fontWeight:700,
    color:'#1a1a1a', lineHeight:1,
  },
  pricePer: { color:'#888', fontSize:'16px', marginBottom:'28px' },
  priceFeature: {
    display:'flex', alignItems:'center', gap:'10px',
    fontSize:'14px', color:'#444', padding:'8px 0', textAlign:'left',
  },
  priceCheck: { color:'#667eea', fontWeight:700, fontSize:'16px', flexShrink:0 },
  priceCta: {
    display:'inline-block', width:'100%', background:'linear-gradient(135deg,#667eea,#764ba2)',
    border:'none', borderRadius:'10px', color:'#fff', padding:'16px',
    fontSize:'16px', fontWeight:600, cursor:'pointer', marginTop:'28px',
    boxShadow:'0 8px 32px rgba(102,126,234,0.35)', textDecoration:'none', textAlign:'center',
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
  { icon:'📞', title:'Make Phone Calls', desc:'Your AI can call restaurants, airlines, or anyone else to handle things for you.' },
  { icon:'🍽️', title:'Book Restaurants', desc:'Just say where and when. Your AI books on OpenTable, Resy, or calls directly.' },
  { icon:'📅', title:'Calendar Management', desc:'Schedule appointments, set reminders, and manage your calendar hands-free.' },
  { icon:'🌐', title:'Browse & Book Anything', desc:'Your AI uses browser automation to fill forms, sign up, and book on any website.' },
];

const PLAN_FEATURES = [
  'WhatsApp AI assistant 24/7',
  'Restaurant & travel bookings',
  'Send emails & make calls on your behalf',
  'Web search with cited sources',
  'Calendar management',
  'Remembers all your preferences',
  'Dedicated WhatsApp number',
  'Fully private & isolated AI agent',
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={L.page}>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div style={L.hero}>
        <div style={L.heroTag}>Your personal AI on WhatsApp</div>
        <h1 style={L.heroH1}>An AI assistant that actually does things for you</h1>
        <p style={L.heroSub}>
          Book restaurants, send emails, make phone calls, manage your calendar — all through
          a simple WhatsApp message. Powered by Claude AI.
        </p>
        <button style={L.heroCta} onClick={() => navigate('/signup')}>
          Get Started →
        </button>
        <div style={L.heroPrice}>$49.99/month — cancel anytime</div>
      </div>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <div style={L.section}>
        <h2 style={L.sectionTitle}>How It Works</h2>
        <p style={L.sectionSub}>Three steps to your own personal AI assistant</p>
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
        <p style={L.sectionSub}>One plan, everything included. No hidden fees.</p>
        <div style={L.priceCard}>
          <div style={L.priceAmount}>$49.99</div>
          <div style={L.pricePer}>per month</div>
          {PLAN_FEATURES.map(f => (
            <div key={f} style={L.priceFeature}>
              <span style={L.priceCheck}>✓</span>
              <span>{f}</span>
            </div>
          ))}
          <button style={L.priceCta} onClick={() => navigate('/signup')}>
            Get Your AI Assistant →
          </button>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div style={L.footer}>
        © {new Date().getFullYear()} AI Assistant. All rights reserved.
      </div>
    </div>
  );
}
