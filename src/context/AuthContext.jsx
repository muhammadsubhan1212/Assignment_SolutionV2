import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loginUser } from '../services/fareService';

const AuthContext = createContext(null);
const STORAGE_KEY = 'assignment_solution_auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed.user ?? null);
        setToken(parsed.token ?? null);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password, remember = true) => {
    const result = await loginUser({ email, password });
    if (!result.success) {
      throw new Error(result.message || 'Login failed');
    }
    setUser(result.user);
    setToken(result.token);
    if (remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: result.user, token: result.token }));
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [user, token, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
