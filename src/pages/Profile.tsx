import { useState, useEffect } from "react";
import { Calendar, Clock, User, Phone, Mail, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppointmentService } from "@/services/appointmentService";
import { AuthService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import type { Appointment } from "@/services/api";

const Profile = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Get user data from localStorage or context
  const storedUser = AuthService.getStoredUser();
  const user = storedUser || {
    name: "John Doe",
    phone: "(555) 123-4567",
    email: "john.doe@email.com"
  };
  
  // Mock additional user stats (in real app, this would come from API)
  const userStats = {
    totalAppointments: 12,
    memberSince: "March 2023"
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await AppointmentService.getUserAppointments();
        
        if (response.success && response.data) {
          setAppointments(response.data);
        } else {
          // Fallback to mock data if API fails
          const mockAppointments: Appointment[] = [
            {
              _id: "1",
              customerId: "user_id",
              barberId: "barber_1",
              serviceId: "service_1",
              date: "2024-01-15",
              timeSlot: "2:30 PM",
              status: "confirmed",
              customerInfo: { name: user.name, phone: user.phone, email: user.email, notes: "" },
              price: 25,
              duration: 30,
              service: { _id: "1", name: "Classic Cut", description: "", price: 25, duration: 30, isActive: true },
              barber: { _id: "1", name: "Mike Johnson", email: "", phone: "", specialties: [], workingDays: [], workingHours: { start: "", end: "" }, isActive: true },
              createdAt: new Date().toISOString()
            },
            {
              _id: "2",
              customerId: "user_id",
              barberId: "barber_2",
              serviceId: "service_2",
              date: "2024-01-22",
              timeSlot: "10:00 AM",
              status: "confirmed",
              customerInfo: { name: user.name, phone: user.phone, email: user.email, notes: "" },
              price: 35,
              duration: 45,
              service: { _id: "2", name: "Full Service", description: "", price: 35, duration: 45, isActive: true },
              barber: { _id: "2", name: "Sarah Smith", email: "", phone: "", specialties: [], workingDays: [], workingHours: { start: "", end: "" }, isActive: true },
              createdAt: new Date().toISOString()
            }
          ];
          setAppointments(mockAppointments);
          
          toast({
            title: "Using Demo Data",
            description: "Could not connect to server. Using demo appointments.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        setAppointments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [toast, user.name, user.phone, user.email]);

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.date) >= new Date() && apt.status === 'confirmed'
  );

  const pastAppointments = appointments.filter(apt => 
    new Date(apt.date) < new Date() || apt.status === 'completed'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success/10 text-success border-success/20';
      case 'completed': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const handleReschedule = async (appointmentId: string) => {
    // This would typically open a reschedule modal
    toast({
      title: "Reschedule",
      description: "Reschedule functionality would be implemented here.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-48"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-20 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold mb-8">My Profile</h1>

          {/* User Info Card */}
          <Card className="card-elevated p-6 mb-8">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <User className="h-12 w-12 text-primary" />
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-4">{user.name}</h2>
                
                <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Downtown Location</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {userStats.memberSince}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <Badge variant="secondary" className="text-sm">
                    {userStats.totalAppointments} Total Appointments
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Upcoming Appointments */}
          <div className="mb-8 animate-slide-up">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
            
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment._id} className="card-elevated p-4 hover-lift">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        
                        <div>
                          <h3 className="font-semibold">{appointment.service?.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(appointment.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {appointment.timeSlot}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {appointment.barber?.name}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReschedule(appointment._id)}
                        >
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="card-glass p-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No upcoming appointments</p>
                <Button className="mt-4">Book New Appointment</Button>
              </Card>
            )}
          </div>

          {/* Past Appointments */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-semibold mb-4">Recent History</h2>
            
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <Card key={appointment._id} className="card-elevated p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold">{appointment.service?.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(appointment.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {appointment.timeSlot}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {appointment.barber?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;