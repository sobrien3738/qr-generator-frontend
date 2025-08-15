import axios from 'axios';
import { User, QRCode, QRCodeAnalytics, DashboardAnalytics } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (data: { email: string; password: string; name: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  getProfile: async (): Promise<{ user: User }> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (data: { name: string }): Promise<{ user: User }> => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    const response = await api.put('/auth/password', data);
    return response.data;
  },
};

// QR Code API
export const qrAPI = {
  generate: async (data: {
    url: string;
    title?: string;
    description?: string;
    size?: number;
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
    foregroundColor?: string;
    backgroundColor?: string;
  }): Promise<QRCode> => {
    const response = await api.post('/qr/generate', data);
    return response.data;
  },

  getQRCode: async (id: string): Promise<QRCode> => {
    const response = await api.get(`/qr/${id}`);
    return response.data;
  },

  getUserQRCodes: async (page = 1, limit = 10) => {
    const response = await api.get(`/qr/user/list?page=${page}&limit=${limit}`);
    return response.data;
  },

  updateQRCode: async (id: string, data: {
    title?: string;
    description?: string;
    isActive?: boolean;
  }): Promise<QRCode> => {
    const response = await api.put(`/qr/${id}`, data);
    return response.data;
  },

  deleteQRCode: async (id: string) => {
    const response = await api.delete(`/qr/${id}`);
    return response.data;
  },
};

// Analytics API
export const analyticsAPI = {
  getQRCodeAnalytics: async (id: string): Promise<QRCodeAnalytics> => {
    const response = await api.get(`/analytics/qr/${id}`);
    return response.data;
  },

  getDashboardAnalytics: async (): Promise<DashboardAnalytics> => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  exportData: async (id: string) => {
    const response = await api.get(`/analytics/export/${id}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default api;