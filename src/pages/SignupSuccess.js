import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';

const S = {
  page: {
    minHeight:'100vh',
    background:'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    display:'flex', alignItems:'center', justifyContent:'center',
    fontFamily:"'Inter',sans-serif", padding:'40px 20px',
  },
  card: {
    background:'rgba(255,255,255,0.04)',
    backdropFilter:'blur(20px)',
    border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:'16px',
    padding:'52px 48px',
    width:'100%', maxWidth:'500px',
    boxShadow:'0 32px 80px rgba(0,0,0,0.4)',
    textAlign:'center',
  },
  icon: { fontSize:'48px', marginBottom:'16px' },
  title: {
    fontFamily:"'Playfair Display',serif",
    fontWeight:600, fontSize:'28px', color:'#fff',
    marginBottom:'8px',
  },
  sub: { color:'rgba(255,255,255,0.5)', fontSize:'14px', marginBottom:'36px', lineHeight:1.6 },

  // WhatsApp number display
  numberBox: {
    background:'rgba(37,211,102,0.1)', border:'2px solid rgba(37,211,102,0.3)',
    borderRadius:'16px', padding:'28px 24px', marginBottom:'32px',
  },
  numberLabel: {
    color:'rgba(255,255,255,0.5)', fontSize:'11px', fontWeight:600,
    letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'12px',
  },
  number: {
    fontFamily:'monospace', fontSize:'28px', fontWeight:700,
    color:'#25D366', letterSpacing:'2px',
  },
  numberHint: {
    color:'rgba(255,255,255,0.4)', fontSize:'12px', marginTop:'10px',
  },

  // Steps
  stepsBox: {
    background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
    borderRadius:'12px', padding:'24px', marginBottom:'32px', textAlign:'left',
  },
  stepsTitle: {
    color:'rgba(255,255,255,0.7)', fontSize:'13px', fontWeight:600,
    marginBottom:'16px', textTransform:'uppercase', letterSpacing:'0.5px',
  },
  step: {
    display:'flex', alignItems:'flex-start', gap:'12px',
    color:'rgba(255,255,255,0.6)', fontSize:'14px', lineHeight:1.5,
    marginBottom:'12px',
  },
  stepNum: {
    background:'rgba(102,126,234,0.2)', color:'#a0b4f7',
    borderRadius:'50%', width:'24px', height:'24px', fontSize:'12px', fontWeight:700,
    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
  },

  // Status
  statusBox: {
    background:'rgba(102,126,234,0.1)', border:'1px solid rgba(102,126,234,0.2)',
    borderRadius:'8px', padding:'14px 16px', marginBottom:'24px',
    color:'#a0b4f7', fontSize:'13px',
  },

  // Loading
  loadingText: { color:'rgba(255,255,255,0.4)', fontSize:'14px' },
  errorText: { color:'#ff9999', fontSize:'14px' },
};

export default function SignupSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus]     = useState('loading'); // loading | success | error | pending
  const [customer, setCustomer] = useState(null);
  const [retries, setRetries] = useState(0);
  const maxRetries = 24; // 24 × 5s = 2 minutes
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }
    checkStatus();
  }, [sessionId]);

  async function checkStatus() {
    try {
      const res = await api.get(`/api/signup/status?session_id=${sessionId}`);
      setCustomer(res.data);
      if (res.data.whatsapp_to) {
        setStatus('success');
      } else {
        setStatus('pending');
        setRetries(prev => {
          if (prev + 1 >= maxRetries) {
            setStatus('timeout');
            return prev + 1;
          }
          setTimeout(checkStatus, 5000);
          return prev + 1;
        });
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'loading') {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <div style={S.icon}>⏳</div>
          <div style={S.title}>Setting things up...</div>
          <div style={S.loadingText}>Confirming your payment and provisioning your AI assistant</div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <div style={S.icon}>⚠️</div>
          <div style={S.title}>Something went wrong</div>
          <div style={S.errorText}>
            We couldn't confirm your signup. If you were charged, please contact support — we'll sort it out.
          </div>
          <button
            style={{ ...S.statusBox, cursor:'pointer', border:'none', marginTop:'24px', textAlign:'center' }}
            onClick={() => navigate('/')}
          >
            ← Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.icon}>🎉</div>
        <div style={S.title}>Welcome to AI Assistant!</div>
        <div style={S.sub}>
          Your account is set up and your personal AI is{' '}
          {status === 'pending' ? 'being deployed...' : 'ready to go.'}
        </div>

        {status === 'pending' && (
          <div style={S.statusBox}>
            ⏳ Your AI agent is being deployed. This takes about 30 seconds.
            This page will update automatically.
          </div>
        )}

        {status === 'timeout' && (
          <div style={{ ...S.statusBox, borderColor:'rgba(255,180,100,0.3)', color:'#ffb464' }}>
            This is taking longer than expected. Your AI is still being set up — please check back
            in a few minutes or contact support if it persists.
          </div>
        )}

        {customer?.whatsapp_to && (
          <div style={S.numberBox}>
            <div style={S.numberLabel}>Your WhatsApp AI Number</div>
            <div style={S.number}>{customer.whatsapp_to}</div>
            <div style={S.numberHint}>Save this number in your contacts as "AI Assistant"</div>
          </div>
        )}

        <div style={S.stepsBox}>
          <div style={S.stepsTitle}>What to do next</div>
          <div style={S.step}>
            <div style={S.stepNum}>1</div>
            <div>Save the WhatsApp number above to your phone contacts</div>
          </div>
          <div style={S.step}>
            <div style={S.stepNum}>2</div>
            <div>Open WhatsApp and send a message to your AI — try "Hello!"</div>
          </div>
          <div style={S.step}>
            <div style={S.stepNum}>3</div>
            <div>Ask it to do anything — book a restaurant, search the web, send an email</div>
          </div>
        </div>

        <div style={{ color:'rgba(255,255,255,0.3)', fontSize:'12px' }}>
          Your subscription: $49.99/month. You can cancel anytime via your billing portal.
        </div>
        <button
          style={{
            background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)',
            borderRadius:'8px', color:'#a0b4f7', padding:'12px 24px', cursor:'pointer',
            fontSize:'14px', fontWeight:500, marginTop:'20px', fontFamily:"'Inter',sans-serif",
          }}
          onClick={() => navigate('/portal/login')}
        >
          Sign in to your portal →
        </button>
      </div>
    </div>
  );
}
