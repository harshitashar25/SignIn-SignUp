import React, { useState, useEffect } from 'react';
import './App.css';
import Dither from './Dither';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in URL (after Google login)
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    if (urlToken) {
      localStorage.setItem('jwtToken', urlToken);
      setToken(urlToken);
      // Remove token from URL and redirect to dashboard
      window.history.replaceState({}, document.title, '/dashboard');
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = () => {
    window.location.href = 'http://localhost:5001/auth/google'; // Redirect to backend endpoint for Google OAuth (updated to port 5001)
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    navigate('/');
  };

  useEffect(() => {
    const checkTokenExpiry = () => {
      const storedToken = localStorage.getItem('jwtToken');
      if (storedToken) {
        const expiryTime = JSON.parse(atob(storedToken.split('.')[1])).exp * 1000;
        if (Date.now() > expiryTime) {
          handleLogout();
        }
      }
    };

    const interval = setInterval(checkTokenExpiry, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App" style={{ fontFamily: 'Inter, Poppins, Nunito, sans-serif', color: 'black', height: '100vh', width: '100vw', position: 'relative' }}>
      <Dither
        waveColor={[0.5, 0.5, 0.5]}
        disableAnimation={false}
        enableMouseInteraction={true}
        mouseRadius={0.3}
        colorNum={4}
        waveAmplitude={0.3}
        waveFrequency={3}
        waveSpeed={0.05}
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={token ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
