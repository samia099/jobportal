import axios from 'axios';
import { useState } from 'react';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
  });

  // Add request interceptor for auth token
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const makeRequest = async (method, url, data = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api[method](url, data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    signUp: (userData) => makeRequest('post', '/auth/signup', userData),
    signIn: (credentials) => makeRequest('post', '/auth/signin', credentials),
    getUser: (userId) => makeRequest('get', `/auth/user/${userId}`),
  };
};

export default useApi;