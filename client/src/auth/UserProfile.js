import React from 'react';
import { useAuth } from './AuthContext';

const UserProfile = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
      <img src={user.avatar} alt="avatar" style={{ width: 48, height: 48, borderRadius: '50%' }} />
      <div>
        <div><strong>{user.displayName || user.username}</strong></div>
        <div>{user.email}</div>
      </div>
    </div>
  );
};

export default UserProfile;
