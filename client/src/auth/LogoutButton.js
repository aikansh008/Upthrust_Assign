import React from 'react';
import { useAuth } from './AuthContext';

const LogoutButton = () => {
  const { logout, user, loading } = useAuth();

  if (loading || !user) return null;

  return (
    <button 
      onClick={logout} 
      style={{ 
        padding: '10px 20px', 
        background: '#e74c3c', 
        color: '#fff', 
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
