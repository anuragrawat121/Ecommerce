import React, { useState } from "react";
import Navbar from "../components/Navbar";
import useProductContext from "../ContextApi/ProductContext";
import { ArrowLeft, CreditCard, Truck, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Checkout = () => {
  const { currency, getCartAmount } = useProductContext();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isOrdered, setIsOrdered] = useState(false);

  const totalAmount = getCartAmount();
  const shippingFee = 0; // Keeping it free for luxury feel

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Simulate order placement
    setIsOrdered(true);
    // In a real app, we would clear the cart and save to backend/localStorage here
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
                  className={`flex items-center justify-center gap-3 h-16 rounded-2xl border-2 transition-all font-bold text-xs uppercase tracking-widest ${paymentMethod === 'online' ? 'border-white bg-white text-black' : 'border-white/10 hover:border-white/30 bg-white/5'}`}
                >
                  Online Payment
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center justify-center gap-3 h-16 rounded-2xl border-2 transition-all font-bold text-xs uppercase tracking-widest ${paymentMethod === 'cod' ? 'border-white bg-white text-black' : 'border-white/10 hover:border-white/30 bg-white/5'}`}
                >
                  Cash on Delivery
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
    </div>
  );
};

export default Checkout;
