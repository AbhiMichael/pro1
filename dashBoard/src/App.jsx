import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import DashboardPage from './pages/dashboard';
import DataPage from './pages/data';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/data" element={<DataPage />} />
      </Routes>
    </Router>
  );
}

export default App;
