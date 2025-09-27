import { useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-barber-shop.jpg";
import Calendar from "@/components/Calendar";
import TimeSlots from "@/components/TimeSlots";
import BookingModal from "@/components/BookingModal";

const Homepage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      setShowBookingModal(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">
              Premium Cuts, <br />
              <span className="text-primary-glow">Perfect Style</span>
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Experience the finest barbering services with our skilled professionals. 
              Book your appointment today and discover your perfect look.
            </p>
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Downtown Location</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Book Your Appointment</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your preferred date and time. Our experienced barbers are ready to give you the perfect cut.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Calendar */}
            <Card className="card-elevated p-6 animate-bounce-in">
              <div className="flex items-center gap-3 mb-6">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Select Date</h3>
              </div>
              <Calendar 
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </Card>

            {/* Time Slots */}
            <Card className="card-elevated p-6 animate-bounce-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Available Times</h3>
              </div>
              {selectedDate ? (
                <TimeSlots 
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onSelectTime={setSelectedTime}
                />
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Please select a date first
                </p>
              )}
            </Card>
          </div>

          {/* Book Button */}
          {selectedDate && selectedTime && (
            <div className="text-center mt-8 animate-fade-in">
              <Button 
                onClick={handleBooking}
                className="btn-hero"
              >
                Book Appointment
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Classic Cut", price: "$25", duration: "30 min" },
              { name: "Beard Trim", price: "$15", duration: "20 min" },
              { name: "Full Service", price: "$35", duration: "45 min" }
            ].map((service, index) => (
              <Card key={service.name} className="card-elevated p-6 hover-lift animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>{service.duration}</span>
                  <span className="text-primary font-bold text-lg">{service.price}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />
    </div>
  );
};

export default Homepage;