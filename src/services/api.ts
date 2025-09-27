const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin' | 'barber';
  createdAt: string;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isActive: boolean;
}

export interface Barber {
  _id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  workingDays: string[];
  workingHours: {
    start: string;
    end: string;
  };
  isActive: boolean;
}

export interface Appointment {
  _id: string;
  customerId: string;
  barberId: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    notes: string;
  };
  price: number;
  duration: number;
  service?: Service;
  barber?: Barber;
  createdAt: string;
}

export interface TimeSlots {
  date: string;
  availableSlots: string[];
  bookedSlots: string[];
  blockedSlots: string[];
}

export interface DashboardStats {
  todayAppointments: number;
  weeklyAppointments: number;
  todayRevenue: number;
  availableSlots: number;
  completionRate: number;
}

// HTTP Client with error handling
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);