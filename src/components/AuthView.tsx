
import React, { useState } from 'react';
import { Zap, Mail, Lock, User, ArrowRight, Car, Settings2, Battery, ArrowLeft, Bike, Store, ShieldCheck, Wrench, Hammer } from 'lucide-react';
import { User as UserType, Vehicle, VehicleType, UserRole, BusinessType } from '../types';

interface AuthViewProps {
  onLogin: (u: UserType, v: Vehicle) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'credentials' | 'role_select' | 'business_details' | 'onboarding'>('credentials');
  const [role, setRole] = useState<UserRole>('user');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: 'Four-wheeler' as VehicleType,
    brand: '',
    model: '',
    batteryCapacity: '75',
    businessName: '',
    businessType: '' as BusinessType, // Changed to empty string to remove default selection highlight
    plugCount: '4',
    technicianCount: '2'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'provider') {
      setStep('business_details');
    } else {
      setStep('onboarding');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser: UserType = {
      id: 'u-' + Math.random().toString(36).substr(2, 9),
      name: role === 'provider' ? formData.businessName : formData.name,
      email: formData.email,
      isPro: true, 
      role: role,
      avatar: `https://api.dicebear.com/7.x/${role === 'provider' ? 'bottts' : 'avataaars'}/svg?seed=${formData.name || formData.businessName}`,
      businessType: role === 'provider' ? (formData.businessType as BusinessType || 'Fast Charging') : undefined,
      plugCount: role === 'provider' && formData.businessType === 'Fast Charging' ? parseInt(formData.plugCount) : undefined,
      technicianCount: role === 'provider' && (formData.businessType === 'EV Mechanic' || formData.businessType === 'Normal Installer') ? parseInt(formData.technicianCount) : undefined,
    };

    const newVehicle: Vehicle = {
      id: 'v-' + Math.random().toString(36).substr(2, 9),
      type: formData.type,
      brand: formData.brand,
      model: formData.model,
      batteryCapacity: parseFloat(formData.batteryCapacity) || 75,
      batteryLevel: 65,
      isCharging: false
    };

    onLogin(newUser, newVehicle);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-inter text-slate-900">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="bg-slate-900 p-8 text-white relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="bg-emerald-500 p-3 rounded-2xl mb-4">
              <Zap className="w-8 h-8 text-slate-900 fill-slate-900" />
            </div>
            <h2 className="text-3xl font-bold font-display tracking-tight mb-2">powerNest</h2>
            <div className="flex items-center gap-2">
              <div className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step === 'credentials' ? 'bg-emerald-500' : 'bg-slate-700'}`} />
              <div className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step === 'business_details' || (step === 'onboarding' && role === 'user') ? 'bg-emerald-500' : 'bg-slate-700'}`} />
              <div className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step === 'onboarding' && role === 'provider' ? 'bg-emerald-500' : 'bg-slate-700'}`} />
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          {step === 'credentials' ? (
            <form onSubmit={handleNext} className="space-y-6 animate-in slide-in-from-left-4 duration-500">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Welcome</h3>
                <p className="text-slate-500 text-sm">Sign in to your digital ecosystem.</p>
              </div>

              <div className="bg-slate-50 p-1.5 rounded-2xl border border-slate-100 flex mb-8">
                <button 
                  type="button"
                  onClick={() => setRole('user')}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${role === 'user' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
                >
                  <Car className="w-4 h-4 inline-block mr-2" /> Driver
                </button>
                <button 
                  type="button"
                  onClick={() => setRole('provider')}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${role === 'provider' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
                >
                  <Store className="w-4 h-4 inline-block mr-2" /> Provider
                </button>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    required
                    name="email"
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    required
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/10"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          ) : step === 'business_details' && role === 'provider' ? (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              <button 
                type="button" 
                onClick={() => setStep('credentials')}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-4 text-sm font-bold"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-1">Business Setup</h3>
                <p className="text-slate-500 text-sm">Select your service category.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'Fast Charging', label: 'Fast Charging Station', icon: Zap, desc: 'Provide high-speed DC charging points.' },
                  { id: 'EV Mechanic', label: 'EV Mechanic Shop', icon: Wrench, desc: 'Specialized maintenance for electric vehicles.' },
                  { id: 'Normal Installer', label: 'Normal Charging Installer', icon: Hammer, desc: 'Home and commercial AC charging setups.' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setFormData({...formData, businessType: type.id as BusinessType});
                      setStep('onboarding');
                    }}
                    className={`p-5 rounded-[2rem] border-2 text-left transition-all flex items-center gap-5 group ${
                      formData.businessType === type.id 
                        ? 'border-emerald-500 bg-emerald-50' 
                        : 'border-slate-100 bg-white hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md'
                    }`}
                  >
                    <div className={`p-4 rounded-2xl transition-colors ${
                      formData.businessType === type.id 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-100 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white'
                    }`}>
                      <type.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className={`font-bold transition-colors ${
                        formData.businessType === type.id ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                      }`}>{type.label}</p>
                      <p className="text-xs text-slate-500">{type.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              <button 
                type="button" 
                onClick={() => setStep(role === 'provider' ? 'business_details' : 'credentials')}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-4 text-sm font-bold"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-1">{role === 'provider' ? 'Resource Details' : 'Vehicle Specifications'}</h3>
                <p className="text-slate-500 text-sm">{role === 'provider' ? 'Configure your station / shop capacity.' : "Tell us what you're driving."}</p>
              </div>

              {role === 'user' ? (
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input required name="name" type="text" placeholder="Username" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" value={formData.name} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Vehicle Details</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative"><Bike className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <select name="type" className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm appearance-none" value={formData.type} onChange={handleChange}>
                          <option value="Two-wheeler">Two-wheeler</option>
                          <option value="Three-wheeler">Three-wheeler</option>
                          <option value="Four-wheeler">Four-wheeler</option>
                        </select>
                      </div>
                      <div className="relative"><Car className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" /><input required name="brand" type="text" placeholder="Brand" className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm" value={formData.brand} onChange={handleChange} /></div>
                      <div className="relative"><Settings2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" /><input required name="model" type="text" placeholder="Vehicle Model" className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm" value={formData.model} onChange={handleChange} /></div>
                      <div className="relative"><Battery className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" /><input required name="batteryCapacity" type="number" placeholder="Battery Cap. (kWh)" className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm" value={formData.batteryCapacity} onChange={handleChange} /></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input required name="businessName" type="text" placeholder="Business / Station Name" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" value={formData.businessName} onChange={handleChange} />
                  </div>
                  
                  {formData.businessType === 'Fast Charging' ? (
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 px-1">How many fast charging plugs do you have?</label>
                      <div className="relative">
                        <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                          required 
                          name="plugCount" 
                          type="number" 
                          min="1"
                          placeholder="Number of Plugs" 
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                          value={formData.plugCount} 
                          onChange={handleChange} 
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 px-1">How many technicians are available?</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                          required 
                          name="technicianCount" 
                          type="number" 
                          min="1"
                          placeholder="Number of Technicians" 
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                          value={formData.technicianCount} 
                          onChange={handleChange} 
                        />
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <p className="text-xs text-emerald-800 leading-relaxed font-medium">As a {formData.businessType || 'Provider'}, your {formData.businessType === 'Fast Charging' ? 'plugs' : 'technicians'} will be visible to drivers in real-time.</p>
                  </div>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-emerald-500 text-slate-900 py-5 rounded-[2.5rem] font-bold flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all active:scale-95 shadow-xl shadow-emerald-500/20 mt-4 text-lg"
              >
                Complete Setup <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthView;
