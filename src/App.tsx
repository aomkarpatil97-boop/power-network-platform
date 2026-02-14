
import React, { useState, useEffect } from 'react';
import MobileBottomNav from './components/MobileBottomNav';
import Dashboard from './components/Dashboard';
import ChargingStationView from './components/ChargingStationView';
import MechanicView from './components/MechanicView';
import BookingsView from './components/BookingsView';
import ProfileView from './components/ProfileView';
import AuthView from './components/AuthView';
import AdminView from './components/AdminView';
import ProviderDashboard from './components/ProviderDashboard';
import ProviderBookingsView from './components/ProviderBookingsView';
import AIChatAssistant from './components/AIChatAssistant';
import { AppView, User, Vehicle, UserBooking, StationType } from './types';
import { INITIAL_VEHICLE, INITIAL_BOOKINGS } from './constants';
import { Bell, Menu, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('powernest_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [currentView, setCurrentView] = useState<AppView>(() => {
    const savedUser = localStorage.getItem('powernest_user');
    if (savedUser) {
      const u = JSON.parse(savedUser);
      return u.role === 'provider' ? 'provider_dashboard' : 'dashboard';
    }
    return 'dashboard';
  });

  const [stationFilter, setStationFilter] = useState<StationType | 'All'>('All');
  
  const [vehicle, setVehicle] = useState<Vehicle>(() => {
    const saved = localStorage.getItem('powernest_vehicle');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLE;
  });
  
  const [bookings, setBookings] = useState<UserBooking[]>(() => {
    const saved = localStorage.getItem('powernest_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('powernest_user', JSON.stringify(user));
      // Auto-switch to default view on first load if current view is invalid for role
      if (user.role === 'provider' && !currentView.startsWith('provider_') && currentView !== 'profile') {
        setCurrentView('provider_dashboard');
      } else if (user.role === 'user' && currentView.startsWith('provider_')) {
        setCurrentView('dashboard');
      }
    } else {
      localStorage.removeItem('powernest_user');
    }
  }, [user, currentView]);

  useEffect(() => {
    localStorage.setItem('powernest_vehicle', JSON.stringify(vehicle));
  }, [vehicle]);

  useEffect(() => {
    localStorage.setItem('powernest_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    let interval: number;
    if (vehicle.isCharging && vehicle.batteryLevel < 100) {
      interval = window.setInterval(() => {
        setVehicle(prev => ({
          ...prev,
          batteryLevel: Math.min(100, prev.batteryLevel + 0.5)
        }));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [vehicle.isCharging, vehicle.batteryLevel]);

  const handleAddBooking = (newBooking: UserBooking) => {
    setBookings(prev => [newBooking, ...prev]);
    if (newBooking.type === 'Charging') {
      setVehicle(prev => ({ ...prev, isCharging: true }));
      setCurrentView('dashboard'); // Jump to dashboard to see charging status
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    setCurrentView('dashboard');
  };

  const handleLogin = (userData: User, vehicleData: Vehicle) => {
    setUser(userData);
    setVehicle(vehicleData);
    setCurrentView(userData.role === 'provider' ? 'provider_dashboard' : 'dashboard');
  };

  const navigateToStations = (type: StationType | 'All') => {
    setStationFilter(type);
    setCurrentView('stations');
  };

  if (!user) {
    return <AuthView onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': 
        return <Dashboard vehicle={vehicle} bookings={bookings} setVehicle={setVehicle} onNavigate={setCurrentView} onFilterStations={navigateToStations} />;
      case 'stations': 
        return <ChargingStationView onBook={handleAddBooking} vehicle={vehicle} initialFilter={stationFilter} onFilterChange={setStationFilter} />;
      case 'services': 
        return <MechanicView onBook={handleAddBooking} vehicle={vehicle} />;
      case 'bookings': 
        return <BookingsView bookings={bookings} setBookings={setBookings} />;
      case 'provider_dashboard':
        return <ProviderDashboard user={user} bookings={bookings} onNavigate={setCurrentView} />;
      case 'provider_bookings':
        return <ProviderBookingsView bookings={bookings} setBookings={setBookings} />;
      case 'profile':
        return <ProfileView vehicle={vehicle} setVehicle={setVehicle} user={user} setUser={setUser} onLogout={handleLogout} />;
      case 'admin':
        return <AdminView bookings={bookings} />;
      default: 
        return <Dashboard vehicle={vehicle} bookings={bookings} setVehicle={setVehicle} onNavigate={setCurrentView} onFilterStations={navigateToStations} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      {/* Mobile Top Header */}
      <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 p-1.5 rounded-lg">
            <Zap className="w-4 h-4 text-white fill-current" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">powerNest</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-400">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden ring-2 ring-emerald-500/20" onClick={() => setCurrentView('profile')}>
            <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <div className="p-5">
          {renderView()}
        </div>
      </div>
      
      {/* Mobile-Style AI Assistant Overlay */}
      <AIChatAssistant />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        role={user.role} 
        user={user}
      />
    </div>
  );
};

export default App;
