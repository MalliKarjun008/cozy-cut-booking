import { apiClient, ApiResponse, Service, Barber } from './api';

export class ServiceService {
  // Get all services
  static async getServices(): Promise<ApiResponse<Service[]>> {
    return apiClient.get<Service[]>('/services');
  }

  // Create new service (admin only)
  static async createService(serviceData: Omit<Service, '_id' | 'createdAt'>): Promise<ApiResponse<Service>> {
    return apiClient.post<Service>('/services', serviceData);
  }

  // Update service (admin only)
  static async updateService(id: string, serviceData: Partial<Service>): Promise<ApiResponse<Service>> {
    return apiClient.put<Service>(`/services/${id}`, serviceData);
  }

  // Delete service (admin only)
  static async deleteService(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/services/${id}`);
  }
}

export class BarberService {
  // Get all barbers
  static async getBarbers(): Promise<ApiResponse<Barber[]>> {
    return apiClient.get<Barber[]>('/barbers');
  }

  // Get barber's schedule
  static async getBarberSchedule(id: string, date?: string): Promise<ApiResponse<any>> {
    const endpoint = date ? `/barbers/${id}/schedule?date=${date}` : `/barbers/${id}/schedule`;
    return apiClient.get(endpoint);
  }

  // Create new barber (admin only)
  static async createBarber(barberData: Omit<Barber, '_id' | 'createdAt'>): Promise<ApiResponse<Barber>> {
    return apiClient.post<Barber>('/barbers', barberData);
  }

  // Update barber (admin only)
  static async updateBarber(id: string, barberData: Partial<Barber>): Promise<ApiResponse<Barber>> {
    return apiClient.put<Barber>(`/barbers/${id}`, barberData);
  }
}