
import React from 'react';
import { UserBooking } from '../types';
import { Calendar, Clock, MapPin, Tag, CheckCircle2, Clock3, XCircle } from 'lucide-react';

interface BookingsViewProps {
  bookings: UserBooking[];
  setBookings: (b: UserBooking[]) => void;
}

const BookingsView: React.FC<BookingsViewProps> = ({ bookings, setBookings }) => {
  const cancelBooking = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-emerald-100 text-emerald-700';
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'Completed': return 'bg-slate-100 text-slate-700';
      case 'Cancelled': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-50 text-slate-500';
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold font-display">My Bookings</h1>
        <p className="text-slate-500">Track and manage your appointments and charging slots.</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {bookings.length > 0 ? bookings.map((booking) => (
          <div key={booking.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                booking.type === 'Charging' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {booking.type === 'Charging' ? <Tag className="w-8 h-8" /> : <Clock3 className="w-8 h-8" />}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">{booking.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusStyle(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {booking.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {booking.time}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {booking.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 justify-between md:justify-end">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PAYMENT: {booking.paymentMethod}</p>
                <p className="text-xl font-black text-slate-900">{booking.price}</p>
              </div>
              
              {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                <button 
                  onClick={() => cancelBooking(booking.id)}
                  className="p-3 text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors"
                  title="Cancel Booking"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        )) : (
          <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-slate-100">
            <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-medium">No bookings found. Start by finding a station!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsView;
