import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const response = await axios.get('http://localhost:9000/auth/current-user', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
        clearAuthData();
      } else {
        setError(err.response?.data?.message || 'Failed to load user data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await axios.get('http://localhost:9000/auth/current-user', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error refreshing user data');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
    navigate('/signin');
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return { 
    user, 
    loading, 
    error, 
    refreshUser,
    logout,
    fetchCurrentUser 
  };
};

export default useCurrentUser;