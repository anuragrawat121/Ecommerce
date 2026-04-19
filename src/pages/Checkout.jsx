import React, { useState } from "react";
import Navbar from "../components/Navbar";
import useProductContext from "../ContextApi/ProductContext";
import { ArrowLeft, CreditCard, Truck, ShieldCheck, CheckCircle2, X, SmartphoneNfc, Wallet, Send, Landmark, Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";

const Checkout = () => {
  const { currency, getCartAmount } = useProductContext();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isOrdered, setIsOrdered] = useState(false);
  const [showUpiPopup, setShowUpiPopup] = useState(false);
  const [upiMethod, setUpiMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const totalAmount = getCartAmount();
  const shippingFee = 0; // Keeping it free for luxury feel

  const upiApps = [
    { name: 'GPay', icon: SmartphoneNfc, brandColor: 'text-emerald-500', bgBox: 'bg-emerald-500/10', borderGlow: 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]' },
    { name: 'PhonePe', icon: Send, brandColor: 'text-purple-500', bgBox: 'bg-purple-500/10', borderGlow: 'border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]' },
    { name: 'Paytm', icon: Wallet, brandColor: 'text-sky-400', bgBox: 'bg-sky-400/10', borderGlow: 'border-sky-400/50 shadow-[0_0_30px_rgba(56,189,248,0.15)]' },
    { name: 'BHIM', icon: Landmark, brandColor: 'text-orange-400', bgBox: 'bg-orange-400/10', borderGlow: 'border-orange-400/50 shadow-[0_0_30px_rgba(251,146,60,0.15)]' },
  ];

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (paymentMethod === 'online') {
      setShowUpiPopup(true);
    } else {
      // Simulate order placement for COD
      setIsOrdered(true);
    }
  };

  const handleUpiPayment = () => {
    setShowUpiPopup(false);
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            <CheckCircle2 size={40} className="text-black" />
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Ordered</h1>
          <p className="text-gray-400 text-sm mb-8 font-medium">Your luxury purchase is being prepared. A confirmation email will be sent shortly.</p>
          <button 
            onClick={() => navigate("/")}
            className="w-full py-4 bg-white text-black text-xs font-black uppercase italic tracking-widest rounded-2xl hover:bg-gray-200 transition-all"
          >
            Back to Collection
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic leading-none">
              Checkout
            </h1>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">
              Secure Transaction
            </p>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Delivery Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Truck size={20} className="text-gray-400" />
              <h2 className="text-lg font-black uppercase italic tracking-tight">Delivery Details</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <input required type="text" placeholder="First Name" className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-white/30 transition-colors" />
              <input required type="text" placeholder="Last Name" className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-white/30 transition-colors" />
            </div>
            <input required type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-white/30 transition-colors" />
            <input required type="text" placeholder="Street Address" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-white/30 transition-colors" />
            
            <div className="grid grid-cols-2 gap-4">
              <input required type="text" placeholder="City" className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-white/30 transition-colors" />
              <input required type="text" placeholder="Postal Code" className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-white/30 transition-colors" />
            </div>
            <input required type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-white/30 transition-colors" />
          </div>

          {/* Right: Summary & Payment */}
          <div className="space-y-10">
            {/* Order Summary */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
              <h2 className="text-lg font-black uppercase italic tracking-tight mb-6">Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-500 uppercase font-bold tracking-widest">
                  <span>Subtotal</span>
                  <span>{currency}{totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400 uppercase font-bold tracking-widest">
                  <span>Shipping</span>
                  <span className="text-emerald-500 italic">Complementary</span>
                </div>
                <div className="h-px bg-white/10 w-full my-4" />
                <div className="flex justify-between text-xl font-black italic uppercase tracking-tighter">
                  <span>Total</span>
                  <span>{currency}{totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Payment Selection */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <CreditCard size={20} className="text-gray-400" />
                <h2 className="text-lg font-black uppercase italic tracking-tight">Payment Method</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('online')}
                  className={`flex flex-col items-center justify-center gap-3 h-28 rounded-2xl border-2 transition-all group ${paymentMethod === 'online' ? 'border-white bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'border-white/10 hover:border-white/30 bg-white/5 text-gray-400'}`}
                >
                  <SmartphoneNfc size={28} className={`transition-transform duration-500 ${paymentMethod === 'online' ? 'scale-110' : 'group-hover:scale-110 text-white'}`} />
                  <span className="font-bold text-xs uppercase tracking-widest">Online Payment</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex flex-col items-center justify-center gap-3 h-28 rounded-2xl border-2 transition-all group ${paymentMethod === 'cod' ? 'border-white bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'border-white/10 hover:border-white/30 bg-white/5 text-gray-400'}`}
                >
                  <Banknote size={28} className={`transition-transform duration-500 ${paymentMethod === 'cod' ? 'scale-110' : 'group-hover:scale-110 text-white'}`} />
                  <span className="font-bold text-xs uppercase tracking-widest">Cash on Delivery</span>
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-5 bg-white text-black text-xs font-black uppercase italic tracking-[0.3em] rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
            >
              Confirm Purchase
            </button>
            
            <div className="flex items-center justify-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck size={14} />
              Encrypted SSL Transaction
            </div>
          </div>
        </form>
      </main>

      {/* UPI Popup Overlay */}
      <AnimatePresence>
        {showUpiPopup && (
          <motion.div 
            key="upi-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowUpiPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="bg-[#050505] border border-white/10 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle background glow */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

              <div 
                className="absolute top-2 right-2 p-2 z-10 cursor-pointer"
                onClick={() => setShowUpiPopup(false)}
              >
                <button 
                  className="transition-all bg-transparent hover:bg-white/10 p-3 rounded-full backdrop-blur-md flex items-center justify-center opacity-60 hover:opacity-100"
                  type="button"
                  aria-label="Close UPI popup"
                >
                  <img src={assets.cross_icon} alt="Close" className="w-5 h-5 filter invert" />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-2 text-white relative z-10">
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                   <SmartphoneNfc size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">UPI Details</h3>
              </div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-10 relative z-10">Fast & Secure Authentication</p>

              <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                {upiApps.map((app) => {
                  const Icon = app.icon;
                  const isSelected = upiMethod === app.name;
                  return (
                    <button
                      key={app.name}
                      type="button"
                      onClick={() => setUpiMethod(app.name)}
                      className={`relative p-5 rounded-2xl border transition-all duration-300 overflow-hidden group ${isSelected ? `bg-white/5 ${app.borderGlow}` : 'border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/20'}`}
                    >
                      <div className={`flex flex-col items-center justify-center gap-4 relative z-10 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                         <div className={`p-3.5 rounded-2xl transition-colors duration-300 ${isSelected ? app.bgBox : 'bg-white/5'}`}>
                           <Icon size={24} className={isSelected ? app.brandColor : 'text-white'} />
                         </div>
                         <span className="text-xs font-bold uppercase tracking-widest text-white">{app.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mb-10 relative z-10">
                 <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">Enter UPI ID</label>
                 <input 
                   type="text" 
                   placeholder={upiMethod ? `e.g. 9876543210@${upiMethod.toLowerCase()}` : "username@upi"}
                   value={upiId}
                   onChange={(e) => setUpiId(e.target.value)}
                   className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm font-medium tracking-wide focus:outline-none focus:border-white/60 focus:ring-1 focus:ring-white/60 transition-all placeholder:text-white/20"
                 />
              </div>

              <button 
                type="button"
                onClick={handleUpiPayment}
                disabled={!upiId || !upiMethod}
                className="w-full py-5 bg-white text-black text-xs font-black uppercase italic tracking-[0.2em] rounded-2xl hover:bg-gray-200 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed flex justify-center items-center gap-3 shadow-[0_10px_40px_rgba(255,255,255,0.15)] relative z-10"
              >
                Verify & Place Order <CheckCircle2 size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
