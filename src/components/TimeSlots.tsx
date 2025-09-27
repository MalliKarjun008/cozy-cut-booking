import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimeSlotsProps {
  selectedDate: Date;
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

const TimeSlots = ({ selectedDate, selectedTime, onSelectTime }: TimeSlotsProps) => {
  // Generate time slots from 9 AM to 6 PM
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  // Mock booked slots - in real app this would come from backend
  const bookedSlots = ["10:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"];
  
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

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Available slots for {selectedDate.toLocaleDateString()}
      </p>
      
      <div className="grid grid-cols-3 gap-3">
        {timeSlots.map((time) => {
          const isBooked = bookedSlots.includes(time);
          const isPast = isSlotPast(time);
          const isSelected = selectedTime === time;
          const isDisabled = isBooked || isPast;

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