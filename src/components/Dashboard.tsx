
import React from 'react';
import { Battery, Zap, ChevronRight, Wrench, History, Clock, CheckCircle2 } from 'lucide-react';
import { Vehicle, UserBooking, AppView, StationType } from '../types';
import { MOCK_STATIONS } from '../constants';

interface DashboardProps {
  vehicle: Vehicle;
  bookings: UserBooking[];
  setVehicle: (v: Vehicle) => void;
  onNavigate: (view: AppView) => void;
  onFilterStations: (type: StationType | 'All') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  vehicle, 
  bookings, 
  setVehicle, 
  onNavigate,
  onFilterStations 
}) => {
  const range = Math.floor(vehicle.batteryCapacity * 6.5 * (vehicle.batteryLevel / 100));

  // Filter some fast plugs and mechanics for the "Home Page" display
  const liveResources = MOCK_STATIONS.filter(s => s.type === 'Hyper' || s.type === 'Fast' || s.type === 'Mechanic');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ultra-simplified Battery Header */}
      <section className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <Battery className={`w-10 h-10 ${vehicle.batteryLevel < 20 ? 'text-rose-500' : 'text-emerald-400'}`} />
            {vehicle.isCharging && (
              <Zap className="absolute -right-1 -top-1 w-4 h-4 text-emerald-400 fill-current animate-pulse" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-black font-display italic tracking-tighter leading-none">
              {Math.floor(vehicle.batteryLevel)}%
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Coverage</p>
          <p className="text-2xl font-black text-emerald-400 font-display italic leading-none">{range} km</p>
        </div>
      </section>

      {/* Main Service Options */}
      <section className="space-y-4">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">Select Service</h3>
        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => onFilterStations('Fast')}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between active:scale-95 transition-transform group"
          >
            <div className="flex items-center gap-5">
              <div className="bg-emerald-500 p-4 rounded-2xl shadow-lg shadow-emerald-500/20">
                <Zap className="w-7 h-7 text-white fill-current" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-slate-900 text-lg">Fast Charging</h4>
                <p className="text-xs text-slate-400 font-medium">High speed DC charging (Level 3)</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
          </button>

          <button 
            onClick={() => onFilterStations('Standard')}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between active:scale-95 transition-transform group"
          >
            <div className="flex items-center gap-5">
              <div className="bg-blue-500 p-4 rounded-2xl shadow-lg shadow-blue-500/20">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-slate-900 text-lg">Normal Charging</h4>
                <p className="text-xs text-slate-400 font-medium">Standard AC charging (Level 2)</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
          </button>

          <button 
            onClick={() => onFilterStations('Mechanic')}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between active:scale-95 transition-transform group"
          >
            <div className="flex items-center gap-5">
              <div className="bg-amber-500 p-4 rounded-2xl shadow-lg shadow-amber-500/20">
                <Wrench className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-slate-900 text-lg">EV Mechanic</h4>
                <p className="text-xs text-slate-400 font-medium">Maintenance & Repairs</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-amber-500 transition-colors" />
          </button>
        </div>
      </section>

      {/* Live Availability Section */}
      <section className="space-y-4">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">Live Availability</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {liveResources.map((station) => (
            <div 
              key={station.id} 
              className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm min-w-[280px] shrink-0"
              onClick={() => onFilterStations(station.type)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${station.type === 'Mechanic' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  {station.type === 'Mechanic' ? <Wrench className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    station.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {station.status}
                  </span>
                  <p className="text-[10px] font-bold text-slate-400 mt-1">{station.distance}</p>
                </div>
              </div>
              <h4 className="font-bold text-slate-900 truncate mb-1">{station.name}</h4>
              <p className="text-[10px] text-slate-500 mb-4">{station.type === 'Mechanic' ? 'Certified Technicians' : 'Fast Plugs'} Available</p>
              
              <div className="space-y-2">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Booked Time Slots</p>
                <div className="flex flex-wrap gap-1.5">
                  {['09:00', '11:00', '13:30', '16:00'].map(slot => (
                    <div key={slot} className="px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-400 line-through decoration-slate-300">
                      {slot}
                    </div>
                  ))}
                  {station.availableSlots?.slice(0, 2).map(slot => (
                    <div key={slot} className="px-2 py-1 bg-emerald-50 border border-emerald-100 rounded-lg text-[10px] font-bold text-emerald-600">
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent History Preview */}
      <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-900">Recent Bookings</h3>
          <button onClick={() => onNavigate('bookings')} className="text-xs font-bold text-emerald-600">View All</button>
        </div>
        <div className="space-y-3">
          {bookings.slice(0, 1).map((b, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
              <div className="bg-white p-2 rounded-xl shadow-xs">
                <History className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-900">{b.title}</p>
                <p className="text-[10px] text-slate-500">{b.date}</p>
              </div>
              <div className="text-right">
                 <p className="text-xs font-black text-slate-900">{b.price}</p>
              </div>
            </div>
          ))}
          {bookings.length === 0 && <p className="text-[10px] text-slate-400 italic text-center py-2">No recent history</p>}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
