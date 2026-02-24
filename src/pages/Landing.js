import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppIcon from '../components/AppIcon';

/* ═══════════════════════════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════════════════════════ */
const L = {
  // ── Global ──────────────────────────────────────────────────────────────
  page: {
    minHeight: '100vh',
    fontFamily: "'Inter', sans-serif",
    color: '#e0e0e0',
    background: '#1a1a2e',
    overflowX: 'hidden',
  },

  // ── Hero ────────────────────────────────────────────────────────────────
  hero: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '120px 24px 100px',
    overflow: 'hidden',
  },
  heroInner: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '860px',
    margin: '0 auto',
  },
  heroTag: {
    display: 'inline-block',
    background: 'rgba(102,126,234,0.12)',
    border: '1px solid rgba(102,126,234,0.3)',
    borderRadius: '40px',
    padding: '8px 22px',
    fontSize: '13px',
    fontWeight: 600,
    letterSpacing: '1.5px',
    color: '#a0b4f7',
    marginBottom: '32px',
    textTransform: 'uppercase',
    backdropFilter: 'blur(10px)',
  },
  heroH1: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: 'clamp(36px, 6vw, 72px)',
    lineHeight: 1.08,
    margin: '0 auto 24px',
    letterSpacing: '-1.5px',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #ffffff 0%, #a0b4f7 50%, #c4b5fd 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSub: {
    fontSize: 'clamp(16px, 2vw, 20px)',
    lineHeight: 1.7,
    color: 'rgba(255,255,255,0.55)',
    maxWidth: '600px',
    margin: '0 auto 48px',
    fontWeight: 400,
  },
  heroBtnRow: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  heroCta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '14px',
    color: '#fff',
    padding: '18px 42px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    boxShadow: '0 8px 40px rgba(102,126,234,0.45), inset 0 1px 0 rgba(255,255,255,0.15)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    letterSpacing: '0.3px',
  },
  heroCtaSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '14px',
    color: '#fff',
    padding: '18px 42px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    backdropFilter: 'blur(12px)',
    transition: 'transform 0.2s ease, background 0.2s ease, border-color 0.2s ease',
    letterSpacing: '0.3px',
  },
  heroPrice: {
    marginTop: '28px',
    fontSize: '14px',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: '0.5px',
  },
  particle: {
    position: 'absolute',
    borderRadius: '50%',
    pointerEvents: 'none',
  },

  // ── Nav bar (floating) ──────────────────────────────────────────────────
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 40px',
    backdropFilter: 'blur(20px)',
    background: 'rgba(26,26,46,0.7)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  navBrand: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '26px',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '-0.5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  navLogo: {
    height: '32px',
    width: '32px',
    objectFit: 'contain',
  },
  navLinks: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  },
  navLink: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    letterSpacing: '0.3px',
  },
  navCta: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 0.15s ease',
    letterSpacing: '0.3px',
  },

  // ── Section shared ──────────────────────────────────────────────────────
  section: {
    padding: '120px 24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionLabel: {
    display: 'inline-block',
    background: 'rgba(102,126,234,0.12)',
    border: '1px solid rgba(102,126,234,0.25)',
    borderRadius: '40px',
    padding: '6px 18px',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '1.5px',
    color: '#a0b4f7',
    marginBottom: '20px',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: 'clamp(28px, 4vw, 48px)',
    textAlign: 'center',
    marginBottom: '16px',
    color: '#ffffff',
    letterSpacing: '-0.5px',
    lineHeight: 1.15,
  },
  sectionSub: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.45)',
    fontSize: 'clamp(15px, 1.5vw, 18px)',
    marginBottom: '72px',
    maxWidth: '600px',
    margin: '0 auto 72px',
    lineHeight: 1.6,
  },

  // ── How it Works ────────────────────────────────────────────────────────
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '48px',
    position: 'relative',
  },
  stepCard: {
    textAlign: 'center',
    padding: '40px 28px',
    borderRadius: '20px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    backdropFilter: 'blur(12px)',
    transition: 'transform 0.3s ease, border-color 0.3s ease',
  },
  stepNum: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    fontWeight: 700,
    marginBottom: '24px',
    boxShadow: '0 8px 32px rgba(102,126,234,0.35)',
  },
  stepTitle: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 600,
    fontSize: '20px',
    marginBottom: '12px',
    color: '#fff',
  },
  stepDesc: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: '15px',
    lineHeight: 1.7,
  },

  // ── Features ────────────────────────────────────────────────────────────
  featBg: {
    background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
    padding: '120px 24px',
    position: 'relative',
  },
  featGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '24px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  featCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '36px 32px',
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
    backdropFilter: 'blur(12px)',
    transition: 'transform 0.3s ease, border-color 0.3s ease, background 0.3s ease',
    cursor: 'default',
  },
  featIconWrap: {
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    background: 'rgba(102,126,234,0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '26px',
    flexShrink: 0,
  },
  featTitle: {
    fontWeight: 600,
    fontSize: '17px',
    marginBottom: '8px',
    color: '#fff',
  },
  featDesc: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: '14px',
    lineHeight: 1.65,
  },

  // ── Social Proof ────────────────────────────────────────────────────────
  testimonialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '28px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  testimonialCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '36px 32px',
    backdropFilter: 'blur(12px)',
    transition: 'transform 0.3s ease, border-color 0.3s ease',
  },
  testimonialStars: {
    fontSize: '18px',
    marginBottom: '16px',
    letterSpacing: '2px',
    color: '#f5c542',
  },
  testimonialQuote: {
    fontSize: '15px',
    lineHeight: 1.75,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '24px',
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  testimonialAvatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 700,
    fontSize: '16px',
  },
  testimonialName: {
    fontWeight: 600,
    fontSize: '15px',
    color: '#fff',
  },
  testimonialRole: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.4)',
    marginTop: '2px',
  },

  // ── Pricing ─────────────────────────────────────────────────────────────
  priceBg: {
    background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
    padding: '120px 24px',
    textAlign: 'center',
  },
  priceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '32px',
    maxWidth: '820px',
    margin: '0 auto',
  },
  priceCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '24px',
    padding: '48px 36px',
    backdropFilter: 'blur(16px)',
    textAlign: 'left',
    transition: 'transform 0.3s ease, border-color 0.3s ease',
  },
  priceCardPro: {
    background: 'rgba(102,126,234,0.08)',
    border: '2px solid rgba(102,126,234,0.35)',
    borderRadius: '24px',
    padding: '48px 36px',
    position: 'relative',
    backdropFilter: 'blur(16px)',
    textAlign: 'left',
    boxShadow: '0 16px 64px rgba(102,126,234,0.15)',
    transition: 'transform 0.3s ease, border-color 0.3s ease',
  },
  pricePopular: {
    position: 'absolute',
    top: '-14px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    padding: '6px 22px',
    borderRadius: '40px',
    boxShadow: '0 4px 16px rgba(102,126,234,0.4)',
  },
  pricePlanName: {
    fontWeight: 600,
    fontSize: '16px',
    marginBottom: '8px',
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  priceAmount: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(40px, 5vw, 56px)',
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1,
  },
  pricePer: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: '16px',
    marginBottom: '32px',
    marginTop: '4px',
  },
  priceDivider: {
    height: '1px',
    background: 'rgba(255,255,255,0.08)',
    margin: '0 0 24px',
  },
  priceFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    color: 'rgba(255,255,255,0.65)',
    padding: '8px 0',
    textAlign: 'left',
  },
  priceCheck: {
    color: '#667eea',
    fontWeight: 700,
    fontSize: '16px',
    flexShrink: 0,
  },
  priceCta: {
    display: 'block',
    width: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '14px',
    color: '#fff',
    padding: '16px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '32px',
    boxShadow: '0 8px 32px rgba(102,126,234,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    letterSpacing: '0.3px',
  },
  priceCtaOutline: {
    display: 'block',
    width: '100%',
    background: 'rgba(102,126,234,0.08)',
    border: '1px solid rgba(102,126,234,0.35)',
    borderRadius: '14px',
    color: '#a0b4f7',
    padding: '16px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '32px',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'transform 0.2s ease, background 0.2s ease, border-color 0.2s ease',
    letterSpacing: '0.3px',
  },

  // ── FAQ ─────────────────────────────────────────────────────────────────
  faqWrap: {
    maxWidth: '720px',
    margin: '0 auto',
  },
  faqItem: {
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  faqQuestion: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    color: '#fff',
    padding: '24px 0',
    fontSize: '17px',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: "'Inter', sans-serif",
    transition: 'color 0.2s ease',
  },
  faqIcon: {
    fontSize: '22px',
    color: '#667eea',
    fontWeight: 300,
    flexShrink: 0,
    transition: 'transform 0.3s ease',
    marginLeft: '16px',
  },
  faqAnswer: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '15px',
    lineHeight: 1.75,
    paddingBottom: '24px',
    paddingRight: '40px',
  },

  // ── Contact ──────────────────────────────────────────────────────────────
  contactBg: {
    background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
    padding: '120px 24px',
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
    maxWidth: '720px',
    margin: '0 auto',
  },
  contactCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '40px 32px',
    textAlign: 'center',
    backdropFilter: 'blur(12px)',
    transition: 'transform 0.3s ease, border-color 0.3s ease',
  },
  contactIcon: {
    fontSize: '40px',
    marginBottom: '16px',
  },
  contactTitle: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 600,
    fontSize: '22px',
    marginBottom: '8px',
    color: '#fff',
  },
  contactDesc: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: '14px',
    lineHeight: 1.65,
    marginBottom: '20px',
  },
  contactNumber: {
    display: 'inline-block',
    background: 'rgba(102,126,234,0.12)',
    border: '1px solid rgba(102,126,234,0.25)',
    borderRadius: '12px',
    padding: '12px 24px',
    color: '#a0b4f7',
    fontSize: '18px',
    fontWeight: 600,
    letterSpacing: '0.5px',
  },

  // ── Footer ──────────────────────────────────────────────────────────────
  footer: {
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '48px 40px',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.25)',
    fontSize: '13px',
    background: 'rgba(15,15,30,0.5)',
  },
  footerBrand: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '22px',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '20px',
  },
  footerLinks: {
    display: 'flex',
    gap: '28px',
    justifyContent: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  footerLink: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const FeatureIcon = ({ type }) => {
  const paths = {
    phone: 'M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.02l-2.2 2.19z',
    email: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.01L12 13l8-6.99V6H4zm0 2.83V18h16V8.83l-8 7-8-7z',
    search: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
    calendar: 'M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z',
    restaurant: 'M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z',
    travel: 'M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z',
  };
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(102,126,234,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d={paths[type]} fill="rgba(102,126,234,0.9)" stroke="none" />
    </svg>
  );
};

const FEATURES = [
  { iconType: 'phone', title: 'Phone Calls', desc: 'Kova calls restaurants, services, and businesses on your behalf -- so you never have to sit on hold again.' },
  { iconType: 'email', title: 'Email Management', desc: 'Sends and drafts emails for you. Just tell Kova what to say and who to send it to.' },
  { iconType: 'search', title: 'Web Research', desc: 'Finds information, prices, reviews, and availability across the web in seconds.' },
  { iconType: 'calendar', title: 'Calendar Management', desc: 'Schedules events, sets reminders, and keeps your calendar organized hands-free.' },
  { iconType: 'restaurant', title: 'Restaurant Bookings', desc: 'Reserves tables at your favorite spots via OpenTable, Resy, or by calling directly.' },
  { iconType: 'travel', title: 'Travel Planning', desc: 'Searches flights, books hotels, and builds full itineraries tailored to your preferences.' },
];

const STEPS = [
  { num: '1', title: 'Sign Up', desc: 'Create your account in less than 2 minutes. Just $40/month for your personal AI assistant.' },
  { num: '2', title: 'Connect WhatsApp', desc: 'We assign you a dedicated Kova number. Just text it on WhatsApp to activate your assistant.' },
  { num: '3', title: 'Kova Handles Everything', desc: 'Make requests in plain language. Kova calls, books, emails, and researches -- all for you.' },
];

const TESTIMONIALS = [
  {
    quote: "Kova saved me hours every week. I just text what I need and it handles restaurant reservations, emails, even phone calls. It feels like having a real personal assistant.",
    name: 'Sarah M.',
    role: 'Marketing Director',
    initials: 'SM',
  },
  {
    quote: "I was skeptical at first, but after Kova booked my entire vacation -- flights, hotels, dinner reservations -- I was completely sold. Worth every penny.",
    name: 'James R.',
    role: 'Startup Founder',
    initials: 'JR',
  },
  {
    quote: "As someone who gets 200+ emails a day, having Kova draft replies and manage my calendar has been a game-changer. I actually have free time now.",
    name: 'Priya K.',
    role: 'Investment Analyst',
    initials: 'PK',
  },
];

const PLAN_FEATURES = [
  '30 WhatsApp messages per day',
  '60 call minutes per month',
  '2 web tasks per day',
  'AI phone calls on your behalf',
  'Email sending & drafting',
  'Web search & research',
  'Calendar management',
  'Preference memory',
  'Dedicated WhatsApp number',
];

const FAQS = [
  {
    q: 'What is Kova?',
    a: 'Kova is your AI personal assistant that lives on WhatsApp. You text it requests in plain language and it handles them for you -- making phone calls, sending emails, booking restaurants, managing your calendar, and much more.',
  },
  {
    q: 'How does it work?',
    a: 'After signing up, you receive a dedicated WhatsApp number for your Kova assistant. Simply text it like you would a real assistant: "Book a table for 2 at Nobu tonight at 8pm" or "Email my accountant about the Q4 report." Kova takes action immediately.',
  },
  {
    q: 'Is my data secure?',
    a: 'Absolutely. All communications are encrypted end-to-end. We never sell your data and all personal information is stored securely. You can delete your data at any time from your portal.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes, there are no contracts or cancellation fees. You can cancel your subscription at any time from your customer portal, and you will retain access until the end of your billing period.',
  },
  {
    q: 'What can Kova do?',
    a: 'Kova can make phone calls, send emails, search the web, book restaurants, plan travel, manage your calendar, set reminders, and more. Your plan includes 30 messages/day, 60 call minutes/month, and 2 web tasks/day.',
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PARTICLES (floating decorations for hero)
   ═══════════════════════════════════════════════════════════════════════════ */
const PARTICLES = [
  { size: 6, x: '10%', y: '20%', delay: 0, dur: 6 },
  { size: 4, x: '85%', y: '15%', delay: 1, dur: 8 },
  { size: 8, x: '70%', y: '70%', delay: 2, dur: 7 },
  { size: 5, x: '20%', y: '75%', delay: 0.5, dur: 9 },
  { size: 3, x: '50%', y: '10%', delay: 3, dur: 6 },
  { size: 7, x: '90%', y: '50%', delay: 1.5, dur: 8 },
  { size: 4, x: '5%', y: '50%', delay: 2.5, dur: 7 },
  { size: 6, x: '40%', y: '85%', delay: 0.8, dur: 9 },
  { size: 3, x: '60%', y: '30%', delay: 3.5, dur: 6 },
  { size: 5, x: '30%', y: '40%', delay: 1.2, dur: 8 },
];

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function Landing() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={L.page}>

      {/* ── Keyframe animations (injected once) ────────────────────────────── */}
      <style>{`
        @keyframes heroGradient {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50%      { transform: translateY(-20px); opacity: 0.8; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 0.6; }
        }
      `}</style>

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav style={{
        ...L.nav,
        ...(scrolled ? {
          background: 'rgba(26,26,46,0.92)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
        } : {}),
      }}>
        <div style={L.navBrand} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/kova-logo.svg" alt="Kova" style={L.navLogo} />
          Kova
        </div>
        <div style={L.navLinks}>
          <span style={L.navLink} onClick={() => scrollTo('features')}>Features</span>
          <span style={L.navLink} onClick={() => scrollTo('pricing')}>Pricing</span>
          <span style={L.navLink} onClick={() => scrollTo('faq')}>FAQ</span>
          <span style={L.navLink} onClick={() => scrollTo('contact')}>Contact</span>
          <span style={L.navLink} onClick={() => navigate('/portal/login')}>Sign In</span>
          <button style={L.navCta} onClick={() => navigate('/signup')}>
            Get Started
          </button>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div style={{
        ...L.hero,
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 35%, #0f3460 65%, #1a1a2e 100%)',
        backgroundSize: '400% 400%',
        animation: 'heroGradient 12s ease infinite',
      }}>
        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            style={{
              ...L.particle,
              width: p.size,
              height: p.size,
              left: p.x,
              top: p.y,
              background: i % 2 === 0
                ? 'rgba(102,126,234,0.5)'
                : 'rgba(118,75,162,0.5)',
              animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite`,
              boxShadow: `0 0 ${p.size * 3}px ${
                i % 2 === 0
                  ? 'rgba(102,126,234,0.3)'
                  : 'rgba(118,75,162,0.3)'
              }`,
            }}
          />
        ))}

        {/* Large ambient glow circles */}
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102,126,234,0.08) 0%, transparent 70%)',
          top: '-200px',
          right: '-100px',
          pointerEvents: 'none',
          animation: 'pulse 6s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(118,75,162,0.08) 0%, transparent 70%)',
          bottom: '-150px',
          left: '-100px',
          pointerEvents: 'none',
          animation: 'pulse 8s ease-in-out 2s infinite',
        }} />

        <div style={{
          ...L.heroInner,
          animation: 'fadeInUp 0.8s ease-out',
        }}>
          <div style={L.heroTag}>AI-Powered Personal Assistant</div>
          <h1 style={L.heroH1}>Your AI Personal Assistant</h1>
          <p style={L.heroSub}>
            Meet Kova -- the WhatsApp-powered AI that makes phone calls, books restaurants,
            sends emails, and manages your calendar. Just text what you need.
          </p>
          <div style={L.heroBtnRow}>
            <button
              style={L.heroCta}
              onClick={() => navigate('/signup')}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 48px rgba(102,126,234,0.55), inset 0 1px 0 rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 40px rgba(102,126,234,0.45), inset 0 1px 0 rgba(255,255,255,0.15)'; }}
            >
              Get Started
              <span style={{ fontSize: '18px' }}>&rarr;</span>
            </button>
            <button
              style={L.heroCtaSecondary}
              onClick={() => navigate('/portal/login')}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.borderColor = 'rgba(255,255,255,0.25)'; }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.background = 'rgba(255,255,255,0.06)'; e.target.style.borderColor = 'rgba(255,255,255,0.15)'; }}
            >
              Sign In
            </button>
          </div>
          <div style={L.heroPrice}>$40/month &middot; Cancel anytime</div>
        </div>
      </div>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <div style={L.section} id="how-it-works">
        <div style={{ textAlign: 'center' }}>
          <div style={L.sectionLabel}>Simple Setup</div>
        </div>
        <h2 style={L.sectionTitle}>How It Works</h2>
        <p style={L.sectionSub}>
          Get your own AI personal assistant in three easy steps
        </p>
        <div style={L.stepsGrid}>
          {STEPS.map((s) => (
            <div
              key={s.num}
              style={L.stepCard}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(102,126,234,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
            >
              <div style={L.stepNum}>{s.num}</div>
              <div style={L.stepTitle}>{s.title}</div>
              <div style={L.stepDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <div style={L.featBg} id="features">
        <div style={{ textAlign: 'center' }}>
          <div style={L.sectionLabel}>Capabilities</div>
        </div>
        <h2 style={{ ...L.sectionTitle, marginBottom: '16px' }}>What Kova Can Do</h2>
        <p style={L.sectionSub}>
          A full-service AI assistant that handles the tasks you do not want to
        </p>
        <div style={L.featGrid}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              style={{
                ...L.featCard,
                ...(hoveredFeature === i ? {
                  transform: 'translateY(-4px)',
                  borderColor: 'rgba(102,126,234,0.3)',
                  background: 'rgba(255,255,255,0.06)',
                } : {}),
              }}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div style={L.featIconWrap}><FeatureIcon type={f.iconType} /></div>
              <div>
                <div style={L.featTitle}>{f.title}</div>
                <div style={L.featDesc}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Social Proof ───────────────────────────────────────────────────── */}
      <div style={L.section} id="testimonials">
        <div style={{ textAlign: 'center' }}>
          <div style={L.sectionLabel}>Testimonials</div>
        </div>
        <h2 style={L.sectionTitle}>Loved by Busy Professionals</h2>
        <p style={L.sectionSub}>
          See what our members are saying about their Kova experience
        </p>
        <div style={L.testimonialGrid}>
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              style={L.testimonialCard}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(102,126,234,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              <div style={L.testimonialStars}>
                {'\u2605\u2605\u2605\u2605\u2605'}
              </div>
              <div style={L.testimonialQuote}>"{t.quote}"</div>
              <div style={L.testimonialAuthor}>
                <div style={L.testimonialAvatar}>{t.initials}</div>
                <div>
                  <div style={L.testimonialName}>{t.name}</div>
                  <div style={L.testimonialRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <div style={L.priceBg} id="pricing">
        <div style={{ textAlign: 'center' }}>
          <div style={L.sectionLabel}>Pricing</div>
        </div>
        <h2 style={{ ...L.sectionTitle, marginBottom: '16px' }}>Simple, Transparent Pricing</h2>
        <p style={L.sectionSub}>
          One plan, no hidden fees. Everything you need in one package.
        </p>
        <div style={{ maxWidth: '440px', margin: '0 auto' }}>
          <div
            style={L.priceCardPro}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(102,126,234,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(102,126,234,0.35)'; }}
          >
            <div style={L.pricePlanName}>Kova Assistant</div>
            <div style={L.priceAmount}>$40</div>
            <div style={L.pricePer}>per month</div>
            <div style={L.priceDivider} />
            {PLAN_FEATURES.map((f) => (
              <div key={f} style={L.priceFeature}>
                <span style={L.priceCheck}>{'\u2713'}</span>
                <span>{f}</span>
              </div>
            ))}
            <button
              style={L.priceCta}
              onClick={() => navigate('/signup')}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 48px rgba(102,126,234,0.5), inset 0 1px 0 rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 32px rgba(102,126,234,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'; }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <div style={L.section} id="faq">
        <div style={{ textAlign: 'center' }}>
          <div style={L.sectionLabel}>FAQ</div>
        </div>
        <h2 style={{ ...L.sectionTitle, marginBottom: '16px' }}>Frequently Asked Questions</h2>
        <p style={L.sectionSub}>
          Everything you need to know about Kova
        </p>
        <div style={L.faqWrap}>
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} style={L.faqItem}>
                <button
                  style={L.faqQuestion}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <span>{faq.q}</span>
                  <span style={{
                    ...L.faqIcon,
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>+</span>
                </button>
                {isOpen && (
                  <div style={L.faqAnswer}>{faq.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Contact ────────────────────────────────────────────────────────── */}
      <div style={L.contactBg} id="contact">
        <div style={{ textAlign: 'center' }}>
          <div style={L.sectionLabel}>Contact</div>
        </div>
        <h2 style={{ ...L.sectionTitle, marginBottom: '16px' }}>Reach Kova Anytime</h2>
        <p style={L.sectionSub}>
          Two ways to connect with your AI assistant
        </p>
        <div style={L.contactGrid}>
          <div
            style={L.contactCard}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(102,126,234,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <div style={L.contactIcon}><AppIcon name="whatsapp" size={28} /></div>
            <div style={L.contactTitle}>WhatsApp</div>
            <div style={L.contactDesc}>Text your dedicated Kova number on WhatsApp. Available 24/7.</div>
            <div style={L.contactNumber}>+1 (978) 558-8477</div>
          </div>
          <div
            style={L.contactCard}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(102,126,234,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <div style={L.contactIcon}><svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(102,126,234,0.9)"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.02l-2.2 2.19z"/></svg></div>
            <div style={L.contactTitle}>Phone</div>
            <div style={L.contactDesc}>Call your Kova number for voice conversations. AI-powered, always ready.</div>
            <div style={L.contactNumber}>+1 (978) 558-8477</div>
          </div>
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer style={L.footer}>
        <div style={L.footerBrand}>Kova</div>
        <div style={L.footerLinks}>
          <span
            style={L.footerLink}
            onClick={() => navigate('/terms')}
            onMouseEnter={e => { e.target.style.color = 'rgba(255,255,255,0.7)'; }}
            onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,0.4)'; }}
          >
            Terms of Service
          </span>
          <span
            style={L.footerLink}
            onClick={() => navigate('/privacy')}
            onMouseEnter={e => { e.target.style.color = 'rgba(255,255,255,0.7)'; }}
            onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,0.4)'; }}
          >
            Privacy Policy
          </span>
          <span
            style={L.footerLink}
            onClick={() => navigate('/portal/login')}
            onMouseEnter={e => { e.target.style.color = 'rgba(255,255,255,0.7)'; }}
            onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,0.4)'; }}
          >
            Sign In
          </span>
        </div>
        <div>&copy; 2026 Kova. All rights reserved.</div>
      </footer>
    </div>
  );
}
