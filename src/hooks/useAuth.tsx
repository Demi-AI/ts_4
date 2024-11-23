import React, { useState } from 'react';

interface User {
  name: string;
}

interface AuthContext {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: { username: string; password: string }) => void;
  logout: () => void;
}

// useAuth Hook
const useAuth = (): AuthContext => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = (credentials: { username: string; password: string }) => {
    setLoading(true);
    setError(null);

    // 模擬登入操作
    setTimeout(() => {
      if (credentials.username === 'user' && credentials.password === 'pass') {
        setUser({ name: 'John Doe' });
      } else {
        setError('Invalid credentials');
      }
      setLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
  };
};

// AuthComponent
const AuthComponent: React.FC = () => {
  const { user, loading, error, login, logout } = useAuth();

  const handleLogin = () => {
    const credentials = { username: 'user', password: 'pass' };
    login(credentials);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default AuthComponent;
