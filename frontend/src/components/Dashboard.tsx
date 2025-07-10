import React, { useEffect, useState } from 'react';

interface DashboardProps {
  onLogout?: () => void;
}

interface UserData {
  id: string;
  name?: string;
  email: string;
  picture: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) return;
      try {
        const res = await fetch('http://localhost:5001/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch user');
        const data = await res.json();
        console.log('Fetched user data:', data);
        setUser(data);
      } catch (err) {
        setError('Could not load user data');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading)
    return (
        <div style={styles.loadingContainer}>
          <div style={styles.loader}></div>
          <span style={{ marginTop: 12, fontSize: 18, color: '#555' }}>Loading...</span>
        </div>
    );
  if (error || !user) {
    // Clear JWT and redirect to login if user not found or error
    localStorage.removeItem('jwtToken');
    window.location.href = '/';
    return null;
  }

  // Validate user.picture and use fallback if needed
  const isValidPicture = user.picture && user.picture.startsWith('http');
  const profileImage = isValidPicture ? user.picture : '/google.png';

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 15,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        padding: '3rem',
        textAlign: 'center',
        minWidth: 340,
        maxWidth: 400,
        backdropFilter: 'blur(10px)',
        pointerEvents: 'auto',
      }}>
        <div style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid #007BFF',
          margin: '0 auto 24px auto',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => (e.currentTarget.src = '/google.png')} />
        </div>
        <h2 style={{ marginBottom: 12, fontSize: '1.8rem', color: '#fff' }}>Welcome, {(user.name && user.name !== 'undefined') ? user.name : 'User'}!</h2>
        <div style={{ marginTop: 8, fontSize: 18, color: '#fff' }}>Name: {(user.name && user.name !== 'undefined') ? user.name : '-'}</div>
        <div style={{ marginTop: 4, fontSize: 16, color: '#fff' }}>Email: {user.email || '-'}</div>
        {onLogout && (
          <button onClick={onLogout} style={{ marginTop: 24, padding: '0.75rem 2rem', borderRadius: 8, background: '#DC3545', color: '#fff', border: 'none', fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 15px rgba(118, 75, 162, 0.4)',
    padding: '3rem 4rem',
    maxWidth: 400,
    width: '100%',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderRadius: '50%',
    overflow: 'hidden',
    border: '5px solid #764ba2',
    margin: '0 auto 24px auto',
    background: '#fff',
    boxShadow: '0 4px 15px rgba(118, 75, 162, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  defaultAvatar: {
    width: '60%',
    height: '60%',
    opacity: 0.4,
  },
  welcomeText: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#4b0082',
    marginBottom: 12,
    letterSpacing: 1.2,
    textShadow: '1px 1px 3px rgba(118, 75, 162, 0.6)',
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  logoutButton: {
    padding: '0.75rem 2.5rem',
    borderRadius: 50,
    backgroundColor: '#DC3545',
    color: '#fff',
    border: 'none',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(220, 53, 69, 0.5)',
    userSelect: 'none',
    transition: 'all 0.3s ease',
  },
  loadingContainer: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  loader: {
    border: '6px solid #f3f3f3',
    borderTop: '6px solid #764ba2',
    borderRadius: '50%',
    width: 50,
    height: 50,
    animation: 'spin 1s linear infinite',
  },
  errorContainer: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#ffe6e6',
  },
};

// Add keyframes for loader animation
const styleSheet = document.styleSheets[0];
const keyframes =
    `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Dashboard;
