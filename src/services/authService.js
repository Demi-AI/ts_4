import apiClient from './apiClient';

const authService = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },
};

export default authService;
