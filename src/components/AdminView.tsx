
import React from 'react';
import { UserBooking } from '../types';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { TrendingUp, Users, MapPin, Activity } from 'lucide-react';

interface AdminViewProps {
  bookings: UserBooking[];
}

const AdminView: React.FC<AdminViewProps> = ({ bookings }) => {
  const chartData = [
    { name: '08:00', load: 45 },
    { name: '10:00', load: 85 },
    { name: '12:00', load: 120 },
    { name: '14:00', load: 160 },
    { name: '16:00', load: 95 },
    { name: '18:00', load: 210 },
    { name: '20:00', load: 140 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold font-display">Fleet & Network Admin</h1>
        <p className="text-slate-500">System analytics and infrastructure monitoring.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '₹4,52,290', icon: TrendingUp, color: 'text-emerald-500' },
          { label: 'Active Users', value: '1,284', icon: Users, color: 'text-blue-500' },
          { label: 'Network Load', value: '72%', icon: Activity, color: 'text-amber-500' },
          { label: 'Station Status', value: '14/15 OK', icon: MapPin, color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <stat.icon className={`w-6 h-6 ${stat.color} mb-4`} />
            <p className="text-sm text-slate-400 font-bold mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-8">Peak Load Trends (Network Hourly)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '16px', border: 'none' }} />
                <Bar dataKey="load" radius={[10, 10, 10, 10]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.load > 150 ? '#10b981' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
          <h3 className="text-lg font-bold mb-6">Recent System Alerts</h3>
          <div className="space-y-4">
            {[
              { type: 'Critical', msg: 'Hyper Station #4 offline in Downtown Mumbai', time: '2m ago' },
              { type: 'Maintenance', msg: 'Software update pushed to 142 vehicles', time: '45m ago' },
              { type: 'Info', msg: 'Peak usage detected at GreenDrive Plaza', time: '1h ago' },
            ].map((alert, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${alert.type === 'Critical' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {alert.type}
                  </span>
                  <span className="text-xs text-white/40">{alert.time}</span>
                </div>
                <p className="text-sm font-medium text-white/80">{alert.msg}</p>
              </div>
            ))}
          </div>
          <button className="w-full py-4 mt-8 bg-white/10 border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all">
            System Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
