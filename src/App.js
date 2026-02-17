import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import SignupSuccess from './pages/SignupSuccess';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CustomerDetail from './pages/CustomerDetail';
import PortalLogin from './pages/portal/PortalLogin';
import Portal from './pages/portal/Portal';
import PortalPreferences from './pages/portal/PortalPreferences';
import PortalActivity from './pages/portal/PortalActivity';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('Uncaught error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', fontFamily: "'Inter',sans-serif", color: '#1a1a1a',
          background: '#f8f5f0',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>Something went wrong</div>
          <div style={{ color: '#999', fontSize: '14px', marginBottom: '24px' }}>
            An unexpected error occurred. Please try refreshing the page.
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg,#667eea,#764ba2)', border: 'none',
              borderRadius: '8px', color: '#fff', padding: '12px 28px', cursor: 'pointer',
              fontSize: '14px', fontWeight: 600,
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function Guard({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" replace />;
}

function CustomerGuard({ children }) {
  return localStorage.getItem('customerToken') ? children : <Navigate to="/portal/login" replace />;
}

export default function App() {
  return (
    <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/"               element={<Landing />} />
        <Route path="/signup"         element={<Signup />} />
        <Route path="/signup/success" element={<SignupSuccess />} />
        <Route path="/terms"          element={<Terms />} />
        <Route path="/privacy"        element={<Privacy />} />

        {/* Admin pages */}
        <Route path="/login"          element={<Login />} />
        <Route path="/dashboard"      element={<Guard><Dashboard /></Guard>} />
        <Route path="/customers/:id"  element={<Guard><CustomerDetail /></Guard>} />

        {/* Customer portal */}
        <Route path="/portal/login"       element={<PortalLogin />} />
        <Route path="/portal"             element={<CustomerGuard><Portal /></CustomerGuard>} />
        <Route path="/portal/preferences" element={<CustomerGuard><PortalPreferences /></CustomerGuard>} />
        <Route path="/portal/activity"    element={<CustomerGuard><PortalActivity /></CustomerGuard>} />

        <Route path="*"               element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </ErrorBoundary>
  );
}
