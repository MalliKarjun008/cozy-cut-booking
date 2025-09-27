import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AppointmentService } from "@/services/appointmentService";
import { useToast } from "@/hooks/use-toast";

interface TimeSlotsProps {
  selectedDate: Date;
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

const TimeSlots = ({ selectedDate, selectedTime, onSelectTime }: TimeSlotsProps) => {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Generate default time slots from 9 AM to 6 PM
  const allTimeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!selectedDate) return;

      setIsLoading(true);
      try {
        const dateString = selectedDate.toISOString().split('T')[0];
        const response = await AppointmentService.getAvailableSlots(dateString);

        if (response.success && response.data) {
          setTimeSlots(response.data.availableSlots);
          setBookedSlots(response.data.bookedSlots);
          setBlockedSlots(response.data.blockedSlots);
        } else {
          // Fallback to mock data if API fails
          setTimeSlots(allTimeSlots);
          setBookedSlots(["10:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"]);
          setBlockedSlots([]);
          
          toast({
            title: "Using Demo Data",
            description: "Could not connect to server. Using demo time slots.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Failed to fetch time slots:', error);
        // Fallback to mock data
        setTimeSlots(allTimeSlots);
        setBookedSlots(["10:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"]);
        setBlockedSlots([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeSlots();
  }, [selectedDate, toast]);

  // Check if today and if slot is in the past
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const currentTime = new Date();
  
  const isSlotPast = (time: string) => {
    if (!isToday) return false;
    const [timeStr, period] = time.split(' ');
    const [hours, minutes] = timeStr.split(':').map(Number);
    const slotHours = period === 'PM' && hours !== 12 ? hours + 12 : hours;
    const slotTime = new Date();
    slotTime.setHours(slotHours, minutes, 0);
    return slotTime < currentTime;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 animate-spin" />
          <p className="text-sm text-muted-foreground">Loading available slots...</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-12 bg-muted/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Available slots for {selectedDate.toLocaleDateString()}
      </p>
      
      <div className="grid grid-cols-3 gap-3">
        {allTimeSlots.map((time) => {
          const isBooked = bookedSlots.includes(time);
          const isBlocked = blockedSlots.includes(time);
          const isPast = isSlotPast(time);
          const isSelected = selectedTime === time;
          const isDisabled = isBooked || isPast || isBlocked;

          return (
            <Button
              key={time}
              variant="outline"
              onClick={() => !isDisabled && onSelectTime(time)}
              disabled={isDisabled}
              className={cn(
                "time-slot h-12",
                isSelected && "btn-slot-selected",
                !isSelected && !isDisabled && "btn-slot-available hover:scale-105",
                isDisabled && "btn-slot-booked"
              )}
            >
              {time}
            </Button>
          );
        })}
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-success/20 border border-success/40"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-primary border border-primary"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-destructive/20 border border-destructive/40"></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default TimeSlots;