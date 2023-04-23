import axios from 'axios';
import { Cookies } from 'quasar';

const client = axios.create({
  // TODO Fix this
  baseURL: process.env.BACKEND ?? 'http://localhost/backend/api',
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  // TODO Should we replace the auth token everytime
  // Can a user login twice? Is that a vulnerability?
  // Also should the cookie be private?
  if (config.headers.Authorization) {
    return config;
  }
  const token = Cookies.get('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  config.params = {
    ...config.params,
    // noPopulate: 'true',
  };
  return config;
});

const demoClient = axios.create({
  baseURL: `${process.env.BACKEND}/demo/`,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axios, client, demoClient };
