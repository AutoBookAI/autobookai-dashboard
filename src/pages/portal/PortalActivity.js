import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import customerApi from '../../lib/customerApi';

const S = {
  page: { minHeight: '100vh', background: '#f8f5f0', fontFamily: "'Inter',sans-serif", color: '#1a1a1a' },
  nav: {
    display: 'flex', alignItems: 'center', gap: '16px',
    padding: '0 40px', height: '64px', background: '#fff', borderBottom: '1px solid #ede8e1',
  },
  back: {
    background: 'transparent', border: '1px solid #e5e0d8', borderRadius: '6px',
    color: '#666', padding: '6px 14px', cursor: 'pointer', fontSize: '13px',
  },
  navTitle: { fontFamily: "'Playfair Display',serif", fontSize: '18px', fontWeight: 500 },
  main: { padding: '32px 40px', maxWidth: '800px', margin: '0 auto' },
  card: {
    background: '#fff', border: '1px solid #ede8e1', borderRadius: '12px',
    overflow: 'hidden',
  },
  row: {
    padding: '16px 24px', borderBottom: '1px solid #f0ebe4',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  eventType: {
    fontSize: '13px', fontWeight: 600, marginBottom: '2px',
    textTransform: 'capitalize',
  },
  description: { fontSize: '13px', color: '#666' },
  time: { fontSize: '12px', color: '#aaa', flexShrink: 0, marginLeft: '16px', whiteSpace: 'nowrap' },
  empty: { padding: '60px', textAlign: 'center', color: '#ccc', fontSize: '14px' },
  pager: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '20px' },
  pageBtn: {
    background: '#fff', border: '1px solid #e5e0d8', borderRadius: '6px',
    color: '#666', padding: '8px 16px', cursor: 'pointer', fontSize: '13px',
  },
  pageBtnDisabled: {
    background: '#f5f5f5', border: '1px solid #eee', borderRadius: '6px',
    color: '#ccc', padding: '8px 16px', fontSize: '13px', cursor: 'default',
  },
  pageInfo: { color: '#999', fontSize: '13px' },
};

export default function PortalActivity() {
  const [activities, setActivities] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const limit = 20;

  useEffect(() => { load(); }, [page]);

  async function load() {
    setLoading(true);
    try {
      const r = await customerApi.get(`/api/customer/activity?page=${page}&limit=${limit}`);
      setActivities(r.data.activities);
      setTotal(r.data.total);
    } catch {} finally { setLoading(false); }
  }

  const totalPages = Math.ceil(total / limit) || 1;

  function formatEventType(type) {
    return type.replace(/_/g, ' ');
  }

  function formatTime(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
      + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div style={S.page}>
      <nav style={S.nav}>
        <button style={S.back} onClick={() => navigate('/portal')}>← Back</button>
        <span style={S.navTitle}>Activity Log</span>
      </nav>

      <div style={S.main}>
        <div style={S.card}>
          {loading ? (
            <div style={S.empty}>Loading...</div>
          ) : activities.length === 0 ? (
            <div style={S.empty}>
              No activity yet. Send a message to Kova on WhatsApp to get started.
            </div>
          ) : (
            activities.map(a => (
              <div key={a.id} style={S.row}>
                <div>
                  <div style={S.eventType}>{formatEventType(a.event_type)}</div>
                  {a.description && <div style={S.description}>{a.description}</div>}
                </div>
                <div style={S.time}>{formatTime(a.created_at)}</div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div style={S.pager}>
            <button
              style={page <= 1 ? S.pageBtnDisabled : S.pageBtn}
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
            >
              Previous
            </button>
            <span style={S.pageInfo}>Page {page} of {totalPages}</span>
            <button
              style={page >= totalPages ? S.pageBtnDisabled : S.pageBtn}
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
