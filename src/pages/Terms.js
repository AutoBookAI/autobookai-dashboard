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
  h3: { fontWeight:600, fontSize:'15px', color:'#1a1a1a', marginTop:'24px', marginBottom:'8px' },
  p: { marginBottom:'12px' },
  ul: { paddingLeft:'24px', marginBottom:'12px' },
  li: { marginBottom:'6px' },
  backLink: {
    display:'inline-block', color:'#667eea', fontSize:'14px',
    textDecoration:'none', cursor:'pointer', marginBottom:'24px',
  },
};

export default function Terms() {
  const navigate = useNavigate();
  const effectiveDate = 'February 17, 2026';

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div style={S.headerTitle}>Terms of Service</div>
        <div style={S.headerSub}>Last updated: {effectiveDate}</div>
      </div>
      <div style={S.content}>
        <span style={S.backLink} onClick={() => navigate(-1)}>← Back</span>

        <p style={S.p}>
          These Terms of Service ("Terms") govern your access to and use of the Kova platform
          ("Service"), operated by Kova ("we", "us", "our"). By creating an account or using
          the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.
        </p>

        <h2 style={S.h2}>1. Service Description</h2>
        <p style={S.p}>
          Kova provides an AI-powered personal assistant accessible via WhatsApp. The assistant
          can help with tasks including but not limited to: sending emails, making phone calls, searching
          the web, managing calendar events, and performing actions on websites on your behalf such as
          making reservations or bookings.
        </p>

        <h2 style={S.h2}>2. AI Limitations and Disclaimer</h2>
        <p style={S.p}>
          The Service uses artificial intelligence to process your requests. You acknowledge and agree that:
        </p>
        <ul style={S.ul}>
          <li style={S.li}><strong>AI may make mistakes.</strong> The AI assistant may produce inaccurate, incomplete, or incorrect responses. You should independently verify any important information before acting on it.</li>
          <li style={S.li}><strong>No guarantee of accuracy.</strong> We do not warrant that the AI's responses, recommendations, or actions will be accurate, reliable, timely, or error-free.</li>
          <li style={S.li}><strong>No guarantee of availability.</strong> The Service may experience downtime, interruptions, or degraded performance at any time without notice.</li>
          <li style={S.li}><strong>Third-party interactions.</strong> When the AI interacts with third-party websites or services on your behalf, we have no control over those third parties and cannot guarantee the outcome of such interactions.</li>
        </ul>

        <h2 style={S.h2}>3. No Liability for Actions and Bookings</h2>
        <p style={S.p}>
          The AI assistant may perform actions on your behalf, including making reservations, bookings,
          purchases, and other transactions. You acknowledge and agree that:
        </p>
        <ul style={S.ul}>
          <li style={S.li}>You are solely responsible for reviewing and confirming any actions before the AI completes them.</li>
          <li style={S.li}>We are not liable for any bookings, reservations, purchases, or other transactions made by the AI, including incorrect bookings, double bookings, missed reservations, or unwanted purchases.</li>
          <li style={S.li}>We are not liable for any financial losses, costs, fees, penalties, or charges resulting from actions taken by the AI on your behalf.</li>
          <li style={S.li}>We are not liable for any consequential, incidental, indirect, or special damages arising from your use of the Service.</li>
        </ul>

        <h2 style={S.h2}>4. Service Provided "As-Is"</h2>
        <p style={S.p}>
          THE SERVICE IS PROVIDED ON AN "AS-IS" AND "AS-AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY
          KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT
          THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
        </p>

        <h2 style={S.h2}>5. Limitation of Liability</h2>
        <p style={S.p}>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL AUTOBOOKAI, ITS OWNERS, OFFICERS,
          EMPLOYEES, OR AGENTS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
          OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR
          OTHER INTANGIBLE LOSSES, RESULTING FROM: (A) YOUR USE OR INABILITY TO USE THE SERVICE;
          (B) ANY ACTIONS TAKEN BY THE AI ASSISTANT ON YOUR BEHALF; (C) ANY ERRORS, MISTAKES, OR
          INACCURACIES IN THE AI'S RESPONSES OR ACTIONS; (D) UNAUTHORIZED ACCESS TO YOUR DATA;
          OR (E) ANY THIRD-PARTY CONDUCT RELATED TO THE SERVICE.
        </p>
        <p style={S.p}>
          OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE THREE (3) MONTHS
          PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
        </p>

        <h2 style={S.h2}>6. Account Termination</h2>
        <p style={S.p}>
          We reserve the right to suspend or terminate your account at any time, with or without cause,
          and with or without notice. Reasons for termination may include, but are not limited to,
          violation of these Terms, abusive use of the Service, non-payment, or any conduct that we
          determine to be harmful to the Service or other users.
        </p>

        <h2 style={S.h2}>7. Acceptable Use</h2>
        <p style={S.p}>You agree not to use the Service to:</p>
        <ul style={S.ul}>
          <li style={S.li}>Engage in any illegal, fraudulent, or harmful activity</li>
          <li style={S.li}>Violate any applicable laws, regulations, or third-party rights</li>
          <li style={S.li}>Harass, abuse, threaten, or impersonate others</li>
          <li style={S.li}>Attempt to gain unauthorized access to any systems or data</li>
          <li style={S.li}>Use the AI to generate spam, malware, or deceptive content</li>
          <li style={S.li}>Circumvent usage limits or rate restrictions</li>
          <li style={S.li}>Use the Service in any manner that could damage, disable, or impair the Service</li>
        </ul>

        <h2 style={S.h2}>8. Payment and Billing</h2>
        <p style={S.p}>
          The Service is offered on a monthly subscription basis at $40/month. You authorize us to
          charge your payment method on a recurring basis. You may cancel your subscription at any time,
          effective at the end of the current billing period. No refunds are provided for partial months.
          Your plan includes 30 messages per day, 60 call minutes per month, and 2 web tasks per day.
        </p>

        <h2 style={S.h2}>9. Indemnification</h2>
        <p style={S.p}>
          You agree to indemnify, defend, and hold harmless Kova and its owners, officers,
          employees, and agents from any claims, damages, losses, liabilities, costs, and expenses
          (including reasonable attorney fees) arising from your use of the Service, your violation
          of these Terms, or any actions taken by the AI on your behalf.
        </p>

        <h2 style={S.h2}>10. Changes to Terms</h2>
        <p style={S.p}>
          We may modify these Terms at any time. Continued use of the Service after changes are posted
          constitutes acceptance of the modified Terms. We will make reasonable efforts to notify you
          of material changes.
        </p>

        <h2 style={S.h2}>11. Governing Law</h2>
        <p style={S.p}>
          These Terms shall be governed by and construed in accordance with applicable laws. Any disputes
          arising from these Terms or your use of the Service shall be resolved through binding
          arbitration on an individual basis.
        </p>

        <h2 style={S.h2}>12. Contact</h2>
        <p style={S.p}>
          If you have questions about these Terms, please contact us through the platform dashboard
          or reach out to our support team.
        </p>
      </div>
    </div>
  );
}
