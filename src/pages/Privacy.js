import React from 'react';
import { useNavigate } from 'react-router-dom';

const S = {
  page: {
    minHeight:'100vh', fontFamily:"'Inter',sans-serif", color:'#1a1a1a',
    background:'#f8f5f0',
  },
  header: {
    background:'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    padding:'40px 20px', textAlign:'center', color:'#fff',
  },
  headerTitle: {
    fontFamily:"'Playfair Display',serif", fontWeight:700,
    fontSize:'clamp(24px, 4vw, 40px)', marginBottom:'8px',
  },
  headerSub: { color:'rgba(255,255,255,0.5)', fontSize:'14px' },
  content: {
    maxWidth:'760px', margin:'0 auto', padding:'40px 20px 80px',
    lineHeight:1.8, fontSize:'14px', color:'#444',
  },
  h2: {
    fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:'22px',
    color:'#1a1a1a', marginTop:'36px', marginBottom:'12px',
  },
  p: { marginBottom:'12px' },
  ul: { paddingLeft:'24px', marginBottom:'12px' },
  li: { marginBottom:'6px' },
  backLink: {
    display:'inline-block', color:'#667eea', fontSize:'14px',
    textDecoration:'none', cursor:'pointer', marginBottom:'24px',
  },
};

export default function Privacy() {
  const navigate = useNavigate();
  const effectiveDate = 'February 17, 2026';

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div style={S.headerTitle}>Privacy Policy</div>
        <div style={S.headerSub}>Last updated: {effectiveDate}</div>
      </div>
      <div style={S.content}>
        <span style={S.backLink} onClick={() => navigate(-1)}>← Back</span>

        <p style={S.p}>
          This Privacy Policy describes how AutoBookAI ("we", "us", "our") collects, uses, and
          protects your personal information when you use our AI assistant platform ("Service").
        </p>

        <h2 style={S.h2}>1. Information We Collect</h2>
        <p style={S.p}>We collect the following types of information:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Account information:</strong> Name, email address, and password (hashed) when you create an account.</li>
          <li style={S.li}><strong>Payment information:</strong> Processed securely through Stripe. We do not store your full credit card details on our servers.</li>
          <li style={S.li}><strong>Profile preferences:</strong> Dining preferences, travel preferences, dietary restrictions, loyalty program numbers, and other personal preferences you choose to provide.</li>
          <li style={S.li}><strong>Conversation history:</strong> Messages you exchange with the AI assistant, including requests and responses.</li>
          <li style={S.li}><strong>Activity logs:</strong> Records of actions the AI performs on your behalf (emails sent, calls made, bookings, searches).</li>
          <li style={S.li}><strong>Phone number:</strong> Your WhatsApp phone number, automatically captured when you first message the assistant.</li>
          <li style={S.li}><strong>Usage data:</strong> Message counts, feature usage, and interaction patterns.</li>
        </ul>

        <h2 style={S.h2}>2. How We Use Your Information</h2>
        <p style={S.p}>We use your information to:</p>
        <ul style={S.ul}>
          <li style={S.li}>Provide, maintain, and improve the Service</li>
          <li style={S.li}>Personalize the AI assistant's responses using your profile and preferences</li>
          <li style={S.li}>Process payments and manage your subscription</li>
          <li style={S.li}>Perform actions on your behalf (sending emails, making calls, bookings)</li>
          <li style={S.li}>Communicate with you about your account and the Service</li>
          <li style={S.li}>Detect and prevent fraud, abuse, or security issues</li>
        </ul>

        <h2 style={S.h2}>3. Data Security</h2>
        <p style={S.p}>
          We take the security of your data seriously. Sensitive information such as loyalty program
          numbers and integration credentials is encrypted at rest using AES-256 encryption with
          per-customer encryption keys. All data is transmitted over HTTPS/TLS encrypted connections.
        </p>
        <p style={S.p}>
          <strong>However, no method of transmission over the Internet or electronic storage is 100%
          secure.</strong> While we strive to use commercially acceptable means to protect your personal
          information, we cannot guarantee its absolute security. We are not liable for any unauthorized
          access to, or breach of, your data despite our security measures.
        </p>

        <h2 style={S.h2}>4. Third-Party Services</h2>
        <p style={S.p}>The Service integrates with third-party services to fulfill your requests:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Anthropic (Claude AI):</strong> Your messages are processed by Claude to generate responses. Anthropic's usage policies apply.</li>
          <li style={S.li}><strong>Twilio:</strong> Used for WhatsApp messaging and phone calls.</li>
          <li style={S.li}><strong>Stripe:</strong> Handles payment processing.</li>
          <li style={S.li}><strong>Google:</strong> Calendar integration when connected by you.</li>
          <li style={S.li}><strong>Websites:</strong> The AI may interact with third-party websites on your behalf. Those sites have their own privacy policies.</li>
        </ul>
        <p style={S.p}>
          We are not responsible for the privacy practices of these third-party services. We encourage
          you to review their privacy policies.
        </p>

        <h2 style={S.h2}>5. Data Retention</h2>
        <p style={S.p}>
          We retain your conversation history and activity logs to provide continuity in the AI
          assistant's service. Account data is retained for the duration of your subscription. If you
          cancel your account, we will delete your personal data within 30 days, except where retention
          is required by law or for legitimate business purposes (e.g., billing records).
        </p>

        <h2 style={S.h2}>6. Your Rights</h2>
        <p style={S.p}>You have the right to:</p>
        <ul style={S.ul}>
          <li style={S.li}>Access the personal information we hold about you</li>
          <li style={S.li}>Request correction of inaccurate information</li>
          <li style={S.li}>Request deletion of your account and associated data</li>
          <li style={S.li}>Update your profile preferences at any time through the customer portal</li>
          <li style={S.li}>Cancel your subscription at any time</li>
        </ul>

        <h2 style={S.h2}>7. Children's Privacy</h2>
        <p style={S.p}>
          The Service is not intended for use by individuals under the age of 18. We do not knowingly
          collect personal information from children. If we become aware that a child has provided us
          with personal information, we will take steps to delete it.
        </p>

        <h2 style={S.h2}>8. Changes to This Policy</h2>
        <p style={S.p}>
          We may update this Privacy Policy from time to time. We will notify you of material changes
          by posting the updated policy on the Service. Continued use after changes constitutes
          acceptance of the updated policy.
        </p>

        <h2 style={S.h2}>9. Contact</h2>
        <p style={S.p}>
          If you have questions about this Privacy Policy or wish to exercise your data rights, please
          contact us through the platform dashboard or reach out to our support team.
        </p>
      </div>
    </div>
  );
}
