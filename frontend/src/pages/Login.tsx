import React from 'react';

const Login: React.FC = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5001/auth/google';
  };

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', padding: '3rem', textAlign: 'center', width: '400px', backdropFilter: 'blur(10px)' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: '#111' }}>Welcome Back</h1>
      <button onClick={handleLogin} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 2rem', fontSize: '1rem', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: '#007BFF', color: 'white', margin: '0 auto', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
        <img src="/google.png" alt="Google Icon" style={{ width: '20px', marginRight: '0.5rem' }} />
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
