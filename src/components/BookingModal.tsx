import { Calendar, Clock, User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AppointmentService, BookAppointmentData } from "@/services/appointmentService";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | undefined;
  selectedTime: string;
}

const BookingModal = ({ isOpen, onClose, selectedDate, selectedTime }: BookingModalProps) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    notes: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleBooking = async () => {
    // Validate required fields
    if (!customerInfo.name || !customerInfo.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Invalid Selection",
        description: "Please select a valid date and time.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const appointmentData: BookAppointmentData = {
        date: selectedDate.toISOString().split('T')[0],
        timeSlot: selectedTime,
        serviceId: "default_service_id", // You can make this dynamic
        customerInfo
      };

      const response = await AppointmentService.bookAppointment(appointmentData);

      if (response.success) {
        toast({
          title: "Booking Confirmed!",
          description: `Your appointment has been booked for ${selectedDate.toLocaleDateString()} at ${selectedTime}.`,
        });

        // Reset form and close modal
        setCustomerInfo({ name: "", phone: "", email: "", notes: "" });
        onClose();
      } else {
        throw new Error(response.error || 'Failed to book appointment');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: error instanceof Error ? error.message : "Unable to book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Confirm Booking
          </DialogTitle>
          <DialogDescription className="text-center">
            Please confirm your appointment details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Appointment Summary */}
          <Card className="card-glass p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-medium">
                  {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <span className="font-medium">Classic Cut - $25</span>
              </div>
            </div>
          </Card>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Your Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                placeholder="(555) 123-4567"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                placeholder="your@email.com"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Special Requests (Optional)</Label>
              <Textarea
                id="notes"
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                placeholder="Any specific requests or preferences?"
                rows={3}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBooking}
              className="flex-1 bg-gradient-to-r from-primary to-primary-glow"
              disabled={isLoading}
            >
              {isLoading ? "Booking..." : "Confirm Booking"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;