
import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  Wrench, 
  CalendarCheck, 
  User,
  ClipboardList
} from 'lucide-react';
import { AppView, UserRole, User as UserType } from '../types';

interface MobileBottomNavProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  role: UserRole;
  user?: UserType | null;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentView, onViewChange, role, user }) => {
  const isInstaller = user?.businessType === 'Normal Installer';

  const userTabs = [
    { id: 'dashboard' as AppView, icon: LayoutDashboard, label: 'Home' },
    { id: 'stations' as AppView, icon: MapPin, label: 'Map' },
    { id: 'bookings' as AppView, icon: CalendarCheck, label: 'Bookings' },
    { id: 'profile' as AppView, icon: User, label: 'Profile' },
  ];

  const providerTabs = isInstaller ? [
    { id: 'provider_dashboard' as AppView, icon: LayoutDashboard, label: 'Overview' },
    { id: 'provider_bookings' as AppView, icon: ClipboardList, label: 'Installations' },
    { id: 'profile' as AppView, icon: User, label: 'Profile' },
  ] : [
    { id: 'provider_dashboard' as AppView, icon: LayoutDashboard, label: 'Hub' },
    { id: 'provider_bookings' as AppView, icon: ClipboardList, label: 'Customers' },
    { id: 'profile' as AppView, icon: User, label: 'Profile' },
  ];

  const tabs = role === 'provider' ? providerTabs : userTabs;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 flex items-center justify-around px-2 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-safe">
      {tabs.map((tab) => {
        const isActive = currentView === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onViewChange(tab.id)}
            className="flex flex-col items-center justify-center flex-1 gap-1 py-1 relative group"
          >
            <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? 'bg-emerald-500/10' : 'bg-transparent'}`}>
              <tab.icon className={`w-6 h-6 transition-colors ${isActive ? 'text-emerald-500' : 'text-slate-400 group-active:scale-90'}`} />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-emerald-500' : 'text-slate-400'}`}>
              {tab.label}
            </span>
            {isActive && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald-500 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
