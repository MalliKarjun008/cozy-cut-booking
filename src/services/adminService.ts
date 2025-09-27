import { apiClient, ApiResponse, Appointment, DashboardStats } from './api';

export interface AdminAppointmentFilters {
  date?: string;
  status?: string;
  barberId?: string;
  page?: number;
  limit?: number;
}

export interface BlockSlotsData {
  date: string;
  timeSlots: string[];
  barberId?: string;
  reason?: string;
}

export class AdminService {
  // Get all appointments with filters
  static async getAllAppointments(filters: AdminAppointmentFilters = {}): Promise<ApiResponse<{
    appointments: Appointment[];
    total: number;
    page: number;
    totalPages: number;
  }>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, String(value));
    });
    
    const endpoint = `/admin/appointments${params.toString() ? `?${params}` : ''}`;
    return apiClient.get(endpoint);
  }

  // Get today's schedule
  static async getTodaySchedule(): Promise<ApiResponse<Appointment[]>> {
    return apiClient.get<Appointment[]>('/admin/appointments/today');
  }

  // Get dashboard statistics
  static async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return apiClient.get<DashboardStats>('/admin/stats');
  }

  // Update appointment status
  static async updateAppointmentStatus(
    appointmentId: string, 
    status: 'confirmed' | 'completed' | 'cancelled' | 'no-show'
  ): Promise<ApiResponse<Appointment>> {
    return apiClient.put<Appointment>(`/admin/appointments/${appointmentId}/status`, { status });
  }

  // Block time slots
  static async blockSlots(data: BlockSlotsData): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/admin/slots/block', data);
  }

  // Unblock time slots
  static async unblockSlots(data: BlockSlotsData): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/admin/slots/unblock', data);
  }

  // Get blocked slots for a date
  static async getBlockedSlots(date: string): Promise<ApiResponse<string[]>> {
    return apiClient.get<string[]>(`/admin/slots/blocked?date=${date}`);
  }
}