import React from 'react';
import { useAuth } from './AuthContext';

const LoginButton = () => {
  const { loginWithGitHub, loading, user } = useAuth();

  if (loading) return <button disabled>Loading...</button>;
  if (user) return null;

  return (
    <button onClick={loginWithGitHub} style={{ padding: '10px 20px', background: '#333', color: '#fff', borderRadius: '5px' }}>
      Login with GitHub
    </button>
  );
};

export default LoginButton;
