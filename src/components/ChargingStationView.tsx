
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Zap, Clock, ChevronRight, X, Wrench, Navigation, Star } from 'lucide-react';
import { MOCK_STATIONS } from '../constants';
import { Station, UserBooking, Vehicle, PaymentMethod, StationType } from '../types';
import BookingModal from './BookingModal';

interface ChargingStationViewProps {
  onBook: (b: UserBooking) => void;
  vehicle: Vehicle;
  initialFilter: StationType | 'All';
  onFilterChange: (type: StationType | 'All') => void;
}

const ChargingStationView: React.FC<ChargingStationViewProps> = ({ 
  onBook, 
  vehicle, 
  initialFilter,
  onFilterChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedStation(null);
  }, [initialFilter]);

  const filteredStations = MOCK_STATIONS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesType = true;
    if (initialFilter === 'Hyper' || initialFilter === 'Fast') {
      matchesType = s.type === 'Hyper' || s.type === 'Fast';
    } else if (initialFilter === 'Standard') {
      matchesType = s.type === 'Standard';
    } else if (initialFilter === 'Mechanic') {
      matchesType = s.type === 'Mechanic';
    }

    return matchesSearch && matchesType;
  });

  const confirmBooking = (payment: PaymentMethod) => {
    if (!selectedStation) return;
    
    const newBooking: UserBooking = {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedStation.type === 'Mechanic' ? 'Mechanic' : 'Charging',
      title: selectedStation.name,
      date: 'Oct 24, 2024',
      time: selectedStation.availableSlots?.[0] || '14:30',
      status: 'Confirmed',
      price: selectedStation.type === 'Mechanic' ? `₹${selectedStation.price}` : `₹${(selectedStation.price * 30).toFixed(2)}`, 
      paymentMethod: payment,
      location: selectedStation.address,
      vehicleId: vehicle.id
    };
    
    onBook(newBooking);
    setIsBookingModalOpen(false);
  };

  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
    // Smooth scroll to the station in the list if needed
    const stationElement = document.getElementById(`station-${station.id}`);
    if (stationElement) {
      stationElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="fixed inset-0 pt-16 pb-20 bg-slate-50 flex flex-col z-0 overflow-hidden">
      {/* Search Header */}
      <div className="bg-white p-4 shadow-sm border-b border-slate-100 z-20">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder={`Search ${initialFilter === 'Mechanic' ? 'mechanics' : 'chargers'}...`}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top: Interactive Map (40% height) */}
        <div className="h-[40%] relative bg-slate-200 shrink-0">
          <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-122.4194,37.7749,12.5,0/1200x800?access_token=pk.eyJ1IjoiY2hhdGdwZ3QiLCJhIjoiY2x0eXJ0Z25pMGN6eTJrbnFscGxkY3RzdyJ9.dummy')] bg-cover bg-center grayscale brightness-105"></div>
          
          {filteredStations.map(s => (
            <div 
              key={s.id}
              className={`absolute p-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 shadow-xl cursor-pointer ${
                selectedStation?.id === s.id ? 'bg-emerald-500 scale-125 z-10 ring-4 ring-emerald-500/20' : 'bg-white z-0'
              }`}
              style={{ top: `${20 + (Math.random() * 60)}%`, left: `${20 + (Math.random() * 60)}%` }}
              onClick={() => handleStationClick(s)}
            >
              {s.type === 'Mechanic' ? (
                <Wrench className={`w-4 h-4 ${selectedStation?.id === s.id ? 'text-white' : 'text-amber-500'}`} />
              ) : (
                <Zap className={`w-4 h-4 ${selectedStation?.id === s.id ? 'text-white' : 'text-emerald-500'}`} />
              )}
            </div>
          ))}

          {/* Floating Action Buttons for quick filtering */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button 
              onClick={() => onFilterChange('Fast')}
              className={`p-3 rounded-full shadow-lg ${initialFilter === 'Fast' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400'}`}
            >
              <Zap className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onFilterChange('Mechanic')}
              className={`p-3 rounded-full shadow-lg ${initialFilter === 'Mechanic' ? 'bg-amber-500 text-white' : 'bg-white text-slate-400'}`}
            >
              <Wrench className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom: Detailed List (60% height) */}
        <div className="flex-1 overflow-y-auto bg-white rounded-t-[2.5rem] -mt-8 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10 no-scrollbar p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black font-display text-lg text-slate-900">
              {initialFilter === 'Mechanic' ? 'Recommended Mechanics' : 'Nearby Chargers'}
            </h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{filteredStations.length} available</span>
          </div>

          <div className="space-y-4">
            {filteredStations.map((station) => (
              <div 
                id={`station-${station.id}`}
                key={station.id}
                onClick={() => setSelectedStation(station)}
                className={`p-5 rounded-3xl border transition-all active:scale-98 ${
                  selectedStation?.id === station.id 
                    ? 'bg-slate-900 border-slate-900 shadow-xl' 
                    : 'bg-slate-50 border-slate-100'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-2xl ${
                      selectedStation?.id === station.id ? 'bg-white/10' : 'bg-white shadow-sm'
                    }`}>
                      {station.type === 'Mechanic' ? (
                        <Wrench className={`w-5 h-5 ${selectedStation?.id === station.id ? 'text-amber-400' : 'text-amber-500'}`} />
                      ) : (
                        <Zap className={`w-5 h-5 ${selectedStation?.id === station.id ? 'text-emerald-400' : 'text-emerald-500'}`} />
                      )}
                    </div>
                    <div>
                      <h4 className={`font-bold ${selectedStation?.id === station.id ? 'text-white' : 'text-slate-900'}`}>{station.name}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <p className={`text-[10px] font-bold ${selectedStation?.id === station.id ? 'text-slate-400' : 'text-slate-500'}`}>{station.address}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black ${selectedStation?.id === station.id ? 'text-emerald-400' : 'text-slate-900'}`}>
                      ₹{station.price}{station.type !== 'Mechanic' && '/unit'}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400">{station.distance}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2">
                    <Clock className={`w-3.5 h-3.5 ${selectedStation?.id === station.id ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                      {station.availableSlots?.slice(0, 2).map(slot => (
                        <span key={slot} className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${
                          selectedStation?.id === station.id ? 'bg-white/10 text-white' : 'bg-white text-slate-600 border border-slate-200'
                        }`}>{slot}</span>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStation(station);
                      setIsBookingModalOpen(true);
                    }}
                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      selectedStation?.id === station.id 
                        ? 'bg-emerald-500 text-slate-900' 
                        : 'bg-slate-900 text-white'
                    }`}
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            ))}
            
            {filteredStations.length === 0 && (
              <div className="text-center py-20">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-slate-300 w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-400">No services found</h4>
                <p className="text-xs text-slate-300">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onConfirm={confirmBooking}
        title={selectedStation?.name || ''}
        details={selectedStation?.address || ''}
        price={selectedStation?.type === 'Mechanic' ? `₹${selectedStation?.price}` : `₹${((selectedStation?.price || 15) * 30).toFixed(2)}`}
        type={selectedStation?.type === 'Mechanic' ? 'Service' : 'Charging'}
      />
    </div>
  );
};

export default ChargingStationView;
