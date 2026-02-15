import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
        <Route path="/login"          element={<Login />} />
        <Route path="/dashboard"      element={<Guard><Dashboard /></Guard>} />
        <Route path="/customers/:id"  element={<Guard><CustomerDetail /></Guard>} />
        <Route path="*"               element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
