
import React, { useState } from 'react';
import { User, StationType } from '../types';
import { Store, MapPin, Clock, Tag, Plus, Check, Power, ShieldAlert } from 'lucide-react';

interface ServiceManagementViewProps {
  user: User;
}

const ServiceManagementView: React.FC<ServiceManagementViewProps> = ({ user }) => {
  const [isLive, setIsLive] = useState(true);
  const [price, setPrice] = useState(user.businessType === 'Charging' ? '18.50' : '1499');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display">Service Manager</h1>
          <p className="text-slate-500">Configure your listing and real-time operational status.</p>
        </div>
        <button 
          onClick={() => setIsLive(!isLive)}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all ${
            isLive ? 'bg-emerald-500 text-slate-900 shadow-xl shadow-emerald-500/20' : 'bg-slate-200 text-slate-500'
          }`}
        >
          <Power className="w-5 h-5" />
          {isLive ? 'Station Live' : 'Maintenance Mode'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Store className="w-6 h-6 text-emerald-500" />
              <h2 className="text-xl font-bold">Base Listing Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Display Name</label>
                <input 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold"
                  defaultValue={user.name}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Location Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    defaultValue="455 Market St, Mumbai"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  {user.businessType === 'Charging' ? 'Rate (₹ per kWh)' : 'Base Service Fee (₹)'}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input 
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-black text-emerald-600"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Available Type</label>
                <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none font-bold">
                  {user.businessType === 'Charging' ? (
                    <>
                      <option>Hyper (DC Fast)</option>
                      <option>Standard (AC)</option>
                    </>
                  ) : (
                    <>
                      <option>Certified Workshop</option>
                      <option>Mobile Mechanic</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <button 
              onClick={handleSave}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                saved ? 'bg-emerald-500 text-slate-900' : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {saved ? <><Check className="w-5 h-5" /> All Changes Saved</> : 'Update Service Profile'}
            </button>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-emerald-500" />
                <h2 className="text-xl font-bold">Operational Slots</h2>
              </div>
              <button className="text-emerald-500 font-bold text-sm flex items-center gap-1 hover:underline">
                <Plus className="w-4 h-4" /> Add Bulk Slots
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].map(slot => (
                <div key={slot} className="px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 flex items-center gap-3">
                  {slot}
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-[3rem] text-white overflow-hidden relative group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">Driver-Side Preview</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">This is how your station appears to EV owners in the powerNest map view.</p>
              
              <div className="bg-white p-6 rounded-2xl text-slate-900 scale-95 origin-left">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-sm leading-tight">{user.name}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700">Available</span>
                </div>
                <p className="text-[10px] text-slate-500 mb-4 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-slate-400" />
                  Mumbai Central Hub
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest bg-emerald-500 text-white">Hyper</span>
                  <p className="text-emerald-600 font-black text-xs tracking-tight">₹{price}/unit</p>
                </div>
              </div>
            </div>
            <Tag className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
          </div>

          <div className="p-6 bg-rose-50 border border-rose-100 rounded-[2.5rem] flex gap-4">
            <ShieldAlert className="w-6 h-6 text-rose-500 shrink-0" />
            <div>
              <p className="font-bold text-rose-900 text-sm mb-1">Price Control Alert</p>
              <p className="text-xs text-rose-700 leading-relaxed font-medium">Your current pricing is 15% higher than the local average. This might reduce your booking priority.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceManagementView;
