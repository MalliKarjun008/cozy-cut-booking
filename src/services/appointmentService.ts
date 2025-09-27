import { apiClient, ApiResponse, Appointment, TimeSlots } from './api';

export interface BookAppointmentData {
  date: string;
  timeSlot: string;
  serviceId: string;
  barberId?: string;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    notes: string;
  };
}

export class AppointmentService {
  // Book a new appointment
  static async bookAppointment(appointmentData: BookAppointmentData): Promise<ApiResponse<Appointment>> {
    return apiClient.post<Appointment>('/appointments', appointmentData);
  }

  // Get user's appointments
  static async getUserAppointments(): Promise<ApiResponse<Appointment[]>> {
    return apiClient.get<Appointment[]>('/appointments');
  }

  // Get specific appointment
  static async getAppointment(id: string): Promise<ApiResponse<Appointment>> {
    return apiClient.get<Appointment>(`/appointments/${id}`);
  }

  // Update/reschedule appointment
  static async updateAppointment(id: string, data: Partial<BookAppointmentData>): Promise<ApiResponse<Appointment>> {
    return apiClient.put<Appointment>(`/appointments/${id}`, data);
  }

  // Cancel appointment
  static async cancelAppointment(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/appointments/${id}`);
  }

  // Get available time slots for a date
  static async getAvailableSlots(date: string, barberId?: string): Promise<ApiResponse<TimeSlots>> {
    const endpoint = barberId 
      ? `/appointments/slots/${date}/${barberId}`
      : `/appointments/slots/${date}`;
    return apiClient.get<TimeSlots>(endpoint);
  }
}

// Hook for managing appointment booking state
export const useAppointmentBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookAppointment = async (appointmentData: BookAppointmentData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await AppointmentService.bookAppointment(appointmentData);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to book appointment');
      }

      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    bookAppointment,
    isLoading,
    error,
  };
};

import { useState } from 'react';