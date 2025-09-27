import { apiClient, ApiResponse, User } from './api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export class AuthService {
  // User registration
  static async register(userData: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await apiClient.post<{ user: User; token: string }>('/auth/register', userData);
    
    if (response.success && response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  // User login
  static async login(credentials: LoginData): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await apiClient.post<{ user: User; token: string }>('/auth/login', credentials);
    
    if (response.success && response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  // User logout
  static async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout', {});
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiClient.get<User>('/auth/me');
  }

  // Update user profile
  static async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await apiClient.put<User>('/auth/profile', userData);
    
    if (response.success && response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response;
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Get stored user data
  static getStoredUser(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  // Check if user is admin
  static isAdmin(): boolean {
    const user = this.getStoredUser();
    return user?.role === 'admin';
  }
}