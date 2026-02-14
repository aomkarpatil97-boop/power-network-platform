
import React, { useState } from 'react';
import { TrendingUp, Activity, Clock, Zap, Power, PowerOff, Info, User as UserIcon, Wrench, ClipboardList } from 'lucide-react';
import { User, UserBooking } from '../types';

interface ProviderDashboardProps {
  user: User;
  bookings: UserBooking[];
  onNavigate: (view: any) => void;
}

const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ user, bookings, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hoveredResource, setHoveredResource] = useState<number | null>(null);

  const isMechanic = user.businessType === 'EV Mechanic';
  const isInstaller = user.businessType === 'Normal Installer';
  const isFastCharging = user.businessType === 'Fast Charging';
  
  const isMechanicOrInstaller = isMechanic || isInstaller;
  const resourceLabel = isMechanicOrInstaller ? 'Technician' : 'Plug';
  const resourceCount = isMechanicOrInstaller ? (user.technicianCount || 3) : (user.plugCount || 4);
  
  const providerBookings = bookings.filter(b => b.status !== 'Cancelled');
  const revenue = providerBookings.reduce((acc, b) => acc + parseFloat(b.price.replace('₹', '').replace(',', '') || '0'), 0);
  
  // Mock logic for "Active" status (some are currently busy)
  const activeResources = [1, 3]; 
  const availableResourcesCount = resourceCount - activeResources.length;

  // For Normal Installers, we skip the Hub Overview (Dashboard) section as requested.
  // We'll show a simplified "Service Overview" or just the Activity log.
  if (isInstaller) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-display italic">Service Overview</h1>
            <p className="text-slate-500 font-medium">{user.name} • <span className="text-emerald-600">Installation Partner</span></p>
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all border w-full md:w-auto justify-center ${
              isOpen 
                ? 'bg-emerald-500 text-slate-900 border-emerald-600 shadow-lg shadow-emerald-500/20' 
                : 'bg-slate-200 text-slate-500 border-slate-300'
            }`}
          >
            {isOpen ? <Power className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
            {isOpen ? 'Active for Hire' : 'Currently Unavailable'}
          </button>
        </header>

        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
             <Activity className="w-12 h-12 text-slate-50 opacity-50" />
          </div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900">Recent Installations</h3>
              <p className="text-xs text-slate-400 font-medium">Tracking your completed and upcoming site visits.</p>
            </div>
            <button onClick={() => onNavigate('provider_bookings')} className="px-5 py-2.5 text-xs font-black text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors uppercase tracking-widest flex items-center gap-2">
              <ClipboardList className="w-3.5 h-3.5" />
              Installation Queue
            </button>
          </div>
          
          <div className="space-y-4">
            {providerBookings.slice(0, 5).map((booking, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-200 transition-colors">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-900 leading-none mb-1">{booking.userName || 'Guest User'}</p>
                    <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {booking.time} • Site Visit #{i+102}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-slate-900 block leading-none">{booking.price}</span>
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Confirmed</span>
                </div>
              </div>
            ))}
            {providerBookings.length === 0 && (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Info className="w-8 h-8 text-slate-200" />
                </div>
                <p className="text-slate-400 text-sm font-bold">No installation requests at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-display italic">Hub Overview</h1>
          <p className="text-slate-500 font-medium">{user.name} • <span className="text-emerald-600">{user.businessType}</span></p>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all border w-full md:w-auto justify-center ${
            isOpen 
              ? 'bg-emerald-500 text-slate-900 border-emerald-600 shadow-lg shadow-emerald-500/20' 
              : 'bg-slate-200 text-slate-500 border-slate-300'
          }`}
        >
          {isOpen ? <Power className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
          {isOpen 
            ? (isMechanicOrInstaller ? 'Shop Active' : 'Hub Online') 
            : (isMechanicOrInstaller ? 'Shop Closed' : 'Hub Offline')
          }
        </button>
      </header>

      {/* Primary Metric */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
          <div className="bg-emerald-50 p-5 rounded-2xl relative z-10">
            <TrendingUp className="w-10 h-10 text-emerald-500" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Live Hub Revenue</p>
            <p className="text-4xl font-black text-slate-900 tracking-tighter">₹{revenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        {/* Resource Status Bar */}
        <div className="bg-slate-900 text-white p-5 rounded-[2rem] flex items-center justify-between px-8 shadow-xl border border-white/5">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <div>
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Ready</p>
                <p className="text-xl font-black text-white leading-none">{availableResourcesCount} <span className="text-[10px] font-bold text-slate-400">Available</span></p>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
              <div>
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Busy</p>
                <p className="text-xl font-black text-white leading-none">{activeResources.length} <span className="text-[10px] font-bold text-slate-400">{isMechanicOrInstaller ? 'Active' : 'Attached'}</span></p>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">System Optimal</span>
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: resourceCount }).map((_, i) => {
            const resourceId = i + 1;
            const isActive = activeResources.includes(resourceId);
            const isHovered = hoveredResource === resourceId;

            return (
              <div 
                key={resourceId}
                onMouseEnter={() => setHoveredResource(resourceId)}
                onMouseLeave={() => setHoveredResource(null)}
                className={`relative group bg-white p-8 rounded-[2.5rem] border-2 transition-all cursor-default flex flex-col items-center justify-center text-center overflow-hidden ${
                  isHovered ? 'border-emerald-500 shadow-xl -translate-y-1' : 'border-slate-100'
                }`}
              >
                <div className="relative mb-4">
                  <div className={`p-5 rounded-2xl transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                    {isMechanicOrInstaller ? (
                      <UserIcon className={`w-10 h-10 ${isActive ? 'fill-blue-500/20' : ''}`} />
                    ) : (
                      <Zap className={`w-10 h-10 ${isActive ? 'fill-blue-500' : ''}`} />
                    )}
                  </div>
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                       <Clock className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>

                <h4 className="font-black text-slate-900 text-lg leading-tight">{resourceLabel} #{resourceId}</h4>
                <p className={`text-[10px] font-black uppercase tracking-[0.15em] mt-1.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                  {isActive ? (isMechanicOrInstaller ? 'On Job' : 'Charging') : 'Available'}
                </p>

                {/* Hover Schedule Overlay */}
                {isHovered && (
                  <div className="absolute inset-0 bg-slate-900/98 rounded-[2.4rem] z-20 flex flex-col items-center justify-center p-6 text-white animate-in fade-in zoom-in-95 duration-200">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-4">{resourceLabel} Schedule</p>
                    <div className="space-y-2 w-full">
                      {['09:00', '12:30', '15:00', '18:30'].map((slot, idx) => (
                        <div key={slot} className={`flex items-center justify-between py-2 px-4 rounded-xl text-[11px] font-bold ${idx === 0 && isActive ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/5 border border-white/10'}`}>
                          <span className="flex items-center gap-2">
                            <Clock className={`w-3 h-3 ${idx === 0 && isActive ? 'text-blue-400' : 'text-emerald-400'}`} /> {slot}
                          </span>
                          <span className={`text-[8px] uppercase ${idx === 0 && isActive ? 'text-blue-400' : 'text-slate-500'}`}>
                            {idx === 0 && isActive ? 'Active' : 'Booked'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Activity Log */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8">
           <Activity className="w-12 h-12 text-slate-50 opacity-50" />
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-900">Recent Service Activity</h3>
            <p className="text-xs text-slate-400 font-medium">Tracking the last 24 hours of hub operations.</p>
          </div>
          <button onClick={() => onNavigate('provider_bookings')} className="px-5 py-2.5 text-xs font-black text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors uppercase tracking-widest">
            Queue Manager
          </button>
        </div>
        
        <div className="space-y-4">
          {providerBookings.slice(0, 3).map((booking, i) => (
            <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {isMechanicOrInstaller ? <Wrench className="w-5 h-5 text-slate-400" /> : <Zap className="w-5 h-5 text-emerald-500" />}
                </div>
                <div>
                  <p className="text-base font-black text-slate-900 leading-none mb-1">{booking.userName || 'Guest User'}</p>
                  <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {booking.time} • {resourceLabel} #{Math.floor(Math.random() * resourceCount) + 1}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-slate-900 block leading-none">{booking.price}</span>
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Paid Online</span>
              </div>
            </div>
          ))}
          {providerBookings.length === 0 && (
            <div className="text-center py-12 flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Info className="w-8 h-8 text-slate-200" />
              </div>
              <p className="text-slate-400 text-sm font-bold">No active bookings for today yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
