import type { AuthProvider } from 'react-admin';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api/admin';

export const authProvider: AuthProvider = {
  async login({ username, password }) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),
    });
    if (!res.ok) {
      throw new Error('Invalid email or password');
    }
    const data = await res.json();
    localStorage.setItem('np_token', data.token);
    localStorage.setItem('np_user', JSON.stringify(data.user));
  },

  async logout() {
    localStorage.removeItem('np_token');
    localStorage.removeItem('np_user');
  },

  async checkAuth() {
    if (!localStorage.getItem('np_token')) throw new Error('Not authenticated');
  },

  async checkError(error) {
    const status = error?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('np_token');
      localStorage.removeItem('np_user');
      throw new Error('Session expired');
    }
  },

  async getIdentity() {
    const raw = localStorage.getItem('np_user');
    if (!raw) throw new Error('No identity');
    const user = JSON.parse(raw);
    return { id: user.id, fullName: user.name, email: user.email };
  },

  async getPermissions() {
    const raw = localStorage.getItem('np_user');
    return raw ? JSON.parse(raw).role : 'guest';
  },
};
