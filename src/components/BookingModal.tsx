
import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CreditCard, ShieldCheck, Wallet, CheckCircle2 } from 'lucide-react';
import { PaymentMethod } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (payment: PaymentMethod) => void;
  title: string;
  details: string;
  price: string;
  type: 'Charging' | 'Service' | 'Installation';
}

const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  details, 
  price,
  type 
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Online');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    setIsProcessing(true);
    // Simulate API delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onConfirm(paymentMethod);
      }, 1500);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {showSuccess ? (
          <div className="p-12 text-center animate-in zoom-in-50 duration-300">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
            <p className="text-slate-500">Your slot has been successfully reserved.</p>
          </div>
        ) : (
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${type === 'Charging' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                {type === 'Charging' ? <CreditCard className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 font-display mb-1">Confirm Your Booking</h2>
            <p className="text-slate-500 text-sm mb-6">Review your selection and choose a payment method.</p>

            <div className="space-y-4 mb-8">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
                <MapPin className="w-5 h-5 text-slate-400 mt-1" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">LOCATION / SERVICE</p>
                  <p className="font-bold text-slate-900">{title}</p>
                  <p className="text-xs text-slate-500 leading-tight">{details}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">DATE</p>
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Calendar className="w-4 h-4 text-emerald-500" /> Oct 24
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">TIME</p>
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Clock className="w-4 h-4 text-emerald-500" /> 14:30
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">CHOOSE PAYMENT METHOD</p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPaymentMethod('Online')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all font-bold text-sm ${
                      paymentMethod === 'Online' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" /> Online
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('Cash')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all font-bold text-sm ${
                      paymentMethod === 'Cash' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    <Wallet className="w-4 h-4" /> Cash
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8 px-2">
              <span className="font-bold text-slate-400">Total Price</span>
              <span className="text-2xl font-black text-slate-900">{price}</span>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 px-4 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirm}
                disabled={isProcessing}
                className="flex-1 px-4 py-4 bg-emerald-500 text-slate-900 font-bold rounded-2xl hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center disabled:opacity-50"
              >
                {isProcessing ? <span className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" /> : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
