
import React, { useState } from 'react';
import { Smartphone, ShieldCheck, X } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentGateway: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="bg-emerald-700 p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            <span className="font-bold">Razorpay Secure</span>
          </div>
          <button onClick={onCancel} className="hover:bg-white/20 p-1 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-500 text-sm">Order Amount</p>
              <h3 className="text-3xl font-black text-gray-900">₹20.00</h3>
            </div>
            <div className="bg-gray-50 px-3 py-1 rounded text-xs text-gray-400 font-mono">
              ID: ORD_92102
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h4 className="font-bold text-gray-700 text-sm border-b pb-2">Select Payment Method</h4>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={handlePay} disabled={loading} className="p-4 border border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all flex flex-col items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" className="h-4" alt="UPI" />
                <span className="text-xs font-bold text-gray-600">UPI / GPay</span>
              </button>
              <button onClick={handlePay} disabled={loading} className="p-4 border border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-gray-600">Paytm / PhonePe</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-emerald-700 font-bold animate-pulse">Processing Payment...</p>
            </div>
          ) : (
            <button
              onClick={handlePay}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
            >
              Pay Now
            </button>
          )}

          <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold tracking-widest">100% Secure & Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
