
import React, { useState } from 'react';
import { Vehicle, User } from '../types';
import { UserCircle, Car, Settings, CreditCard, ShieldCheck, Check, Mail, User as UserIcon, Bike, Battery, LogOut } from 'lucide-react';

interface ProfileViewProps {
  user: User;
  setUser: (u: User) => void;
  vehicle: Vehicle;
  setVehicle: (v: Vehicle) => void;
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, setUser, vehicle, setVehicle, onLogout }) => {
  const [vForm, setVForm] = useState(vehicle);
  const [uForm, setUForm] = useState(user);
  const [vSaved, setVSaved] = useState(false);
  const [uSaved, setUSaved] = useState(false);

  const handleSaveVehicle = () => {
    setVehicle(vForm);
    setVSaved(true);
    setTimeout(() => setVSaved(false), 2000);
  };

  const handleSaveUser = () => {
    setUser(uForm);
    setUSaved(true);
    setTimeout(() => setUSaved(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col items-center text-center gap-4">
        <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-emerald-500 ring-offset-4 bg-slate-200 shadow-xl">
          <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">{user.name}</h1>
          <p className="text-slate-500 text-sm">{user.email}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full">
            {user.role === 'provider' ? 'Service Provider' : 'Driver Edition'}
          </span>
        </div>
      </header>

      <div className="space-y-4">
        {/* Personal Details Card */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <UserIcon className="w-5 h-5 text-emerald-500" />
            <h2 className="font-bold">Account Info</h2>
          </div>
          
          <div className="space-y-4">
            <input 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-sm outline-none font-bold" 
              value={uForm.name}
              placeholder="Full Name"
              onChange={e => setUForm({...uForm, name: e.target.value})}
            />
            <input 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-sm outline-none font-bold" 
              value={uForm.email}
              placeholder="Email Address"
              onChange={e => setUForm({...uForm, email: e.target.value})}
            />
            <button 
              onClick={handleSaveUser}
              className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${
                uSaved ? 'bg-emerald-500 text-slate-900' : 'bg-slate-900 text-white'
              }`}
            >
              {uSaved ? 'Account Saved' : 'Save Profile'}
            </button>
          </div>
        </div>

        {/* Vehicle Info Card */}
        {user.role === 'user' && (
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <Car className="w-5 h-5 text-emerald-500" />
              <h2 className="font-bold">Vehicle Details</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <input 
                  className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-sm outline-none font-bold" 
                  value={vForm.brand}
                  placeholder="Brand"
                  onChange={e => setVForm({...vForm, brand: e.target.value})}
                />
                <input 
                  className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-sm outline-none font-bold" 
                  value={vForm.model}
                  placeholder="Model"
                  onChange={e => setVForm({...vForm, model: e.target.value})}
                />
              </div>
              <button 
                onClick={handleSaveVehicle}
                className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${
                  vSaved ? 'bg-emerald-500 text-slate-900' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {vSaved ? 'Vehicle Updated' : 'Update Car Details'}
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={onLogout}
          className="w-full py-5 rounded-[2.5rem] border-2 border-rose-100 text-rose-500 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:bg-rose-50 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out from powerNest
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
