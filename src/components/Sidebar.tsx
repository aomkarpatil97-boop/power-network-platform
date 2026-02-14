
import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  Wrench, 
  CalendarCheck, 
  Zap,
  LogOut,
  Settings,
  ClipboardList
} from 'lucide-react';
import { AppView, UserRole } from '../types';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  onLogout: () => void;
  role: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, onLogout, role }) => {
  const userNavItems = [
    { id: 'dashboard' as AppView, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'stations' as AppView, icon: MapPin, label: 'Charging' },
    { id: 'services' as AppView, icon: Wrench, label: 'Servicing' },
    { id: 'bookings' as AppView, icon: CalendarCheck, label: 'My Bookings' },
  ];

  const providerNavItems = [
    { id: 'provider_dashboard' as AppView, icon: LayoutDashboard, label: 'Overview' },
    { id: 'provider_bookings' as AppView, icon: ClipboardList, label: 'Booking Queue' },
  ];

  const navItems = role === 'provider' ? providerNavItems : userNavItems;

  return (
    <div className="w-64 bg-slate-900 h-screen fixed left-0 top-0 flex flex-col text-white shadow-xl z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-emerald-500 p-2 rounded-xl">
          <Zap className="w-6 h-6 text-slate-900 fill-slate-900" />
        </div>
        <div>
          <span className="text-2xl font-bold font-display tracking-tight block leading-none">powerNest</span>
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{role === 'provider' ? 'Provider Hub' : 'Driver Edition'}</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === item.id 
                ? 'bg-emerald-500 text-slate-900 font-semibold' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <button 
          onClick={() => onViewChange('profile')}
          className={`w-full flex items-center gap-3 px-4 py-2 transition-colors ${
            currentView === 'profile' ? 'text-white bg-slate-800 rounded-xl' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="w-5 h-5" />
          Settings
        </button>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-rose-400 hover:text-rose-300 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
