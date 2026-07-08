import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../components/login';
import RegisterPage from '../components/register';
import Dashboard from '../components/dashboard';
import ProtectedRoute from '../components/ProtectedRoute';

function Home() {
  return (
    <div className="Home">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default Home;
