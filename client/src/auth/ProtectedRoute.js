import React from 'react';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, fallback = null }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '2rem',
        color: '#666' 
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return fallback || (
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center',
        color: 'white',
        margin: '2rem 0'
      }}>
        <h3>🔒 Authentication Required</h3>
        <p>Please log in with GitHub to access workflow automation features.</p>
        <p>Your workflows will be saved to your personal account.</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;