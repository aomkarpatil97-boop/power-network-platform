
import React, { useState } from 'react';
import { MECHANIC_SERVICES } from '../constants';
import { Battery, Disc, Cpu, Zap, Star, ShieldCheck, Wrench } from 'lucide-react';
import { MechanicService, UserBooking, Vehicle, PaymentMethod } from '../types';
import BookingModal from './BookingModal';

interface MechanicViewProps {
  onBook: (b: UserBooking) => void;
  vehicle: Vehicle;
}

const MechanicView: React.FC<MechanicViewProps> = ({ onBook, vehicle }) => {
  const [selectedService, setSelectedService] = useState<MechanicService | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Battery': return <Battery className="w-8 h-8 text-emerald-500" />;
      case 'Disc': return <Disc className="w-8 h-8 text-blue-500" />;
      case 'Cpu': return <Cpu className="w-8 h-8 text-purple-500" />;
      case 'Zap': return <Zap className="w-8 h-8 text-amber-500" />;
      default: return <Wrench className="w-8 h-8 text-slate-500" />;
    }
  };

  const handleBook = (service: MechanicService) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const confirmBooking = (payment: PaymentMethod) => {
    if (!selectedService) return;
    
    // Determine if it's a standard mechanic service or a charger installation
    const isInstallation = selectedService.title.toLowerCase().includes('installation');

    const newBooking: UserBooking = {
      id: Math.random().toString(36).substr(2, 9),
      type: isInstallation ? 'Installation' : 'Mechanic',
      title: selectedService.title,
      date: 'Oct 25, 2024',
      time: '09:00',
      status: 'Confirmed',
      price: `₹${selectedService.price}`,
      paymentMethod: payment,
      location: isInstallation ? 'Your Residence' : 'powerNest Service Center',
      vehicleId: vehicle.id
    };
    
    onBook(newBooking);
    setIsBookingModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold font-display">Service & Installation</h1>
        <p className="text-slate-500">Certified EV experts for maintenance and home charging setup.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MECHANIC_SERVICES.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col group">
            <div className="mb-4 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {getIcon(service.icon)}
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">{service.title}</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              {service.description}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest block mb-0.5">Starting at</span>
                <p className="text-xl font-black text-slate-900">₹{service.price}</p>
              </div>
              <button 
                onClick={() => handleBook(service)}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col lg:flex-row items-center gap-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -mr-20 -mt-20" />
        <div className="flex-1 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-bold border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" />
            powerNest Certified Experts
          </div>
          <h2 className="text-4xl font-bold font-display leading-tight">Professional Home Charger Setup</h2>
          <p className="text-slate-400 text-lg max-w-xl">
            Don't worry about the high-voltage complexity. Our certified electricians handle everything from permit acquisition to the final safety test of your Level 2 home charger.
          </p>
          <div className="flex gap-8 pt-4">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
              <div className="text-left">
                <span className="font-bold text-2xl block leading-none">4.9/5</span>
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Rating</span>
              </div>
            </div>
            <div className="h-12 w-px bg-slate-800" />
            <div>
              <p className="font-bold text-2xl block leading-none">2-Year</p>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Warranty</p>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 w-full lg:w-[450px] relative">
          <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full" />
          <img 
            src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=600" 
            alt="EV Service" 
            className="rounded-[2.5rem] shadow-2xl relative z-10 border-8 border-slate-800"
          />
        </div>
      </div>

      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onConfirm={confirmBooking}
        title={selectedService?.title || ''}
        details={selectedService?.description || ''}
        price={`₹${selectedService?.price}`}
        type={selectedService?.title.toLowerCase().includes('installation') ? 'Installation' : 'Service'}
      />
    </div>
  );
};

export default MechanicView;
