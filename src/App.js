import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import SignupSuccess from './pages/SignupSuccess';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CustomerDetail from './pages/CustomerDetail';

function Guard({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/"               element={<Landing />} />
        <Route path="/signup"         element={<Signup />} />
        <Route path="/signup/success" element={<SignupSuccess />} />

        {/* Admin pages */}
        <Route path="/login"          element={<Login />} />
        <Route path="/dashboard"      element={<Guard><Dashboard /></Guard>} />
        <Route path="/customers/:id"  element={<Guard><CustomerDetail /></Guard>} />

        <Route path="*"               element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
