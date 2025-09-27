import { Calendar, Clock, User, Phone, Mail, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  // Mock user data and appointments
  const user = {
    name: "John Doe",
    phone: "(555) 123-4567",
    email: "john.doe@email.com",
    totalAppointments: 12,
    memberSince: "March 2023"
  };

  const upcomingAppointments = [
    {
      id: 1,
      date: "2024-01-15",
      time: "2:30 PM",
      service: "Classic Cut",
      barber: "Mike Johnson",
      status: "confirmed"
    },
    {
      id: 2,
      date: "2024-01-22",
      time: "10:00 AM",
      service: "Full Service",
      barber: "Sarah Smith",
      status: "confirmed"
    }
  ];

  const pastAppointments = [
    {
      id: 3,
      date: "2024-01-08",
      time: "3:00 PM",
      service: "Beard Trim",
      barber: "Mike Johnson",
      status: "completed"
    },
    {
      id: 4,
      date: "2023-12-28",
      time: "11:30 AM",
      service: "Classic Cut",
      barber: "Tom Wilson",
      status: "completed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success/10 text-success border-success/20';
      case 'completed': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

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
                    <span>Member since {user.memberSince}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <Badge variant="secondary" className="text-sm">
                    {user.totalAppointments} Total Appointments
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
                  <Card key={appointment.id} className="card-elevated p-4 hover-lift">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        
                        <div>
                          <h3 className="font-semibold">{appointment.service}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(appointment.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {appointment.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {appointment.barber}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        <Button variant="outline" size="sm">
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
                <Card key={appointment.id} className="card-elevated p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold">{appointment.service}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(appointment.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {appointment.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {appointment.barber}
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