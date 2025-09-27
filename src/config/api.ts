// API Configuration
export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    PROFILE: '/auth/profile',
  },
  
  // Appointments
  APPOINTMENTS: {
    BASE: '/appointments',
    SLOTS: '/appointments/slots',
    BY_ID: (id: string) => `/appointments/${id}`,
  },
  
  // Admin
  ADMIN: {
    APPOINTMENTS: '/admin/appointments',
    TODAY_SCHEDULE: '/admin/appointments/today',
    STATS: '/admin/stats',
    UPDATE_STATUS: (id: string) => `/admin/appointments/${id}/status`,
    BLOCK_SLOTS: '/admin/slots/block',
    UNBLOCK_SLOTS: '/admin/slots/unblock',
    BLOCKED_SLOTS: '/admin/slots/blocked',
  },
  
  // Services & Barbers
  SERVICES: {
    BASE: '/services',
    BY_ID: (id: string) => `/services/${id}`,
  },
  
  BARBERS: {
    BASE: '/barbers',
    SCHEDULE: (id: string) => `/barbers/${id}/schedule`,
    BY_ID: (id: string) => `/barbers/${id}`,
  },
};