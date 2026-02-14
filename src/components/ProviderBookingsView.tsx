
import React, { useState } from 'react';
import { UserBooking, BookingStatus } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  User, 
  MessageSquare, 
  ChevronRight, 
  TrendingUp, 
  Zap, 
  Car,
  Activity
} from 'lucide-react';

interface ProviderBookingsViewProps {
  bookings: UserBooking[];
  setBookings: (b: UserBooking[]) => void;
}

const ProviderBookingsView: React.FC<ProviderBookingsViewProps> = ({ bookings, setBookings }) => {
  const [activeTab, setActiveTab] = useState<BookingStatus | 'All'>('All');

  const updateStatus = (id: string, status: BookingStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  const filtered = bookings.filter(b => activeTab === 'All' || b.status === activeTab);
  
  // Calculate Daily Revenue (Live)
  const dailyRevenue = bookings
    .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
    .reduce((acc, b) => acc + parseFloat(b.price.replace('₹', '').replace(',', '') || '0'), 0);

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-10">
      {/* 2. Live Revenue Header (Start of the section) */}
      <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden ring-1 ring-white/10">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 blur-[80px] rounded-full -mr-20 -mt-20 animate-pulse" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="bg-emerald-500 p-5 rounded-[1.5rem] shadow-lg shadow-emerald-500/30">
              <TrendingUp className="w-8 h-8 text-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Live Daily Revenue</p>
              </div>
              <h2 className="text-5xl font-black font-display italic tracking-tighter">₹{dailyRevenue.toLocaleString()}</h2>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Now</p>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <p className="text-xl font-bold text-white">{bookings.filter(b => b.status === 'Confirmed').length}</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Success Rate</p>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <p className="text-xl font-bold text-white">98.2%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Customer List Section */}
      <section className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <div>
            <h1 className="text-3xl font-black font-display text-slate-900">Customer List</h1>
            <p className="text-slate-500 font-medium">Manage charging sessions and slot schedules.</p>
          </div>
          <div className="flex bg-slate-200/50 p-1 rounded-2xl border border-slate-200">
            {['All', 'Confirmed', 'Completed', 'Cancelled'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5">
          {filtered.length > 0 ? filtered.map((booking) => (
            <div key={booking.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition-all flex flex-col gap-6 relative overflow-hidden group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-6 flex-1">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden relative border-2 border-slate-50 shadow-inner">
                    <img src={booking.userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.id}`} alt="User" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                      <Zap className="w-2.5 h-2.5 text-white fill-current" />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-black text-slate-900 leading-tight">{booking.userName || 'Guest Driver'}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 
                        booking.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                        booking.status === 'Completed' ? 'bg-slate-100 text-slate-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                        <Clock className="w-3.5 h-3.5" /> Slot: {booking.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5" /> {booking.vehicleId ? 'Tata Nexon EV' : 'Standard EV'}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Zap className="w-3.5 h-3.5" /> Assigned Plug #{Math.floor(Math.random() * 4) + 1}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Service Value</p>
                    <p className="text-2xl font-black text-slate-900 tracking-tight">{booking.price}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    {booking.status === 'Pending' && (
                      <>
                        <button 
                          onClick={() => updateStatus(booking.id, 'Confirmed')}
                          className="p-4 bg-emerald-500 text-slate-900 hover:bg-emerald-400 rounded-2xl transition-all shadow-lg shadow-emerald-500/20"
                          title="Confirm Customer"
                        >
                          <CheckCircle2 className="w-6 h-6" />
                        </button>
                        <button 
                          onClick={() => updateStatus(booking.id, 'Cancelled')}
                          className="p-4 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-2xl transition-colors"
                          title="Cancel Booking"
                        >
                          <XCircle className="w-6 h-6" />
                        </button>
                      </>
                    )}
                    {booking.status === 'Confirmed' && (
                      <button 
                        onClick={() => updateStatus(booking.id, 'Completed')}
                        className="flex items-center gap-2 px-8 py-4 bg-emerald-500 text-slate-900 font-bold rounded-2xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
                      >
                        Complete Session <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                    <button className="p-4 text-slate-400 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors border border-slate-100">
                      <MessageSquare className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-100">
                    <MapPin className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600">Travel From: {booking.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Payment Security:</span>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-lg border flex items-center gap-1.5 ${
                    booking.paymentMethod === 'Online' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}>
                    <CheckCircle2 className="w-3 h-3" /> {booking.paymentMethod} Verified
                  </span>
                </div>
              </div>
            </div>
          )) : (
            <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-slate-200 flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Queue Empty</h3>
              <p className="text-slate-400 font-medium max-w-[240px]">No customers found for this criteria. New bookings will automatically appear here.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProviderBookingsView;
