import simpleRestProvider from 'ra-data-simple-rest';
import { fetchUtils, type DataProvider } from 'react-admin';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api/admin';

/** Attach the admin JWT to every request. */
const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const headers = (options.headers as Headers) ?? new Headers({ Accept: 'application/json' });
  const token = localStorage.getItem('np_token');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, { ...options, headers });
};

export const dataProvider: DataProvider = simpleRestProvider(API_URL, httpClient);
