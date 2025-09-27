import { useState } from "react";
import { Calendar as CalendarIcon, Clock, User, Settings, BarChart3, Plus, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CalendarComponent from "@/components/Calendar";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [blockedSlots, setBlockedSlots] = useState<string[]>(["11:00 AM", "4:00 PM"]);
  const { toast } = useToast();

  // Mock appointments data
  const todayAppointments = [
    { id: 1, time: "9:00 AM", customer: "John Doe", service: "Classic Cut", phone: "(555) 123-4567", status: "confirmed" },
    { id: 2, time: "10:30 AM", customer: "Jane Smith", service: "Full Service", phone: "(555) 987-6543", status: "completed" },
    { id: 3, time: "2:30 PM", customer: "Mike Johnson", service: "Beard Trim", phone: "(555) 456-7890", status: "confirmed" },
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  const toggleSlotBlock = (time: string) => {
    if (blockedSlots.includes(time)) {
      setBlockedSlots(blockedSlots.filter(slot => slot !== time));
      toast({
        title: "Slot Unblocked",
        description: `${time} is now available for booking.`,
      });
    } else {
      setBlockedSlots([...blockedSlots, time]);
      toast({
        title: "Slot Blocked",
        description: `${time} has been blocked from booking.`,
      });
    }
  };

  const getSlotStatus = (time: string) => {
    const hasAppointment = todayAppointments.some(apt => apt.time === time);
    const isBlocked = blockedSlots.includes(time);
    
    if (hasAppointment) return 'booked';
    if (isBlocked) return 'blocked';
    return 'available';
  };

  const getSlotColor = (status: string) => {
    switch (status) {
      case 'booked': return 'bg-primary/10 text-primary border-primary/30';
      case 'blocked': return 'bg-destructive/10 text-destructive border-destructive/30';
      case 'available': return 'bg-success/10 text-success border-success/30 hover:bg-success hover:text-success-foreground';
      default: return '';
    }
  };

  const stats = [
    { label: "Today's Appointments", value: "8", icon: CalendarIcon },
    { label: "This Week", value: "45", icon: BarChart3 },
    { label: "Revenue Today", value: "$320", icon: User },
    { label: "Available Slots", value: "12", icon: Clock },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Appointment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Appointment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customer">Customer Name</Label>
                    <Input id="customer" placeholder="Enter customer name" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <Label>Service</Label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Classic Cut - $25</option>
                      <option>Beard Trim - $15</option>
                      <option>Full Service - $35</option>
                    </select>
                  </div>
                  <Button className="w-full">Book Appointment</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="card-elevated p-4 animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Today's Schedule */}
            <Card className="card-elevated p-6 animate-slide-up">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Today's Schedule
              </h2>
              
              <div className="space-y-3">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium">{appointment.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.time} • {appointment.service}
                      </p>
                    </div>
                    <Badge 
                      className={appointment.status === 'completed' 
                        ? 'bg-success/10 text-success border-success/20' 
                        : 'bg-primary/10 text-primary border-primary/20'
                      }
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Slot Management */}
            <Card className="card-elevated p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Manage Time Slots
              </h2>
              
              <div className="mb-4">
                <CalendarComponent 
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                />
              </div>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Click slots to block/unblock for {selectedDate?.toLocaleDateString()}
                </p>
                
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => {
                    const status = getSlotStatus(time);
                    const appointment = todayAppointments.find(apt => apt.time === time);
                    
                    return (
                      <Button
                        key={time}
                        variant="outline"
                        size="sm"
                        onClick={() => status === 'available' || status === 'blocked' ? toggleSlotBlock(time) : null}
                        disabled={status === 'booked'}
                        className={`${getSlotColor(status)} h-10 text-xs relative`}
                      >
                        {time}
                        {status === 'blocked' && (
                          <X className="h-3 w-3 absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full" />
                        )}
                      </Button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-success/20 border border-success/40"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-primary/20 border border-primary/40"></div>
                    <span>Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-destructive/20 border border-destructive/40"></div>
                    <span>Blocked</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;