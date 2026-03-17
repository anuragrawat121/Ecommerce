import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import useProductContext from "../ContextApi/ProductContext";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useProductContext();
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const totalAmount = cartData.reduce((acc, item) => {
    const p = products.find((p) => p._id === item._id);
    return acc + (p?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic leading-none">
              Your <span className="text-gray-500">Cart</span>
            </h1>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">
              {cartData.length} LINE ITEMS
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {cartData.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                  <ShoppingBag size={32} className="text-gray-600" />
                </div>
                <h2 className="text-xl font-bold mb-2 uppercase tracking-tight">Your cart is empty</h2>
                <p className="text-gray-500 text-sm mb-8">Looks like you haven't added anything yet.</p>
                <Link
                  to="/"
                  className="px-8 py-3 bg-white text-black text-xs font-black uppercase italic tracking-widest rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Start Shopping
                </Link>
              </motion.div>
            ) : (
              cartData.map((item, index) => {
                const productData = products.find((p) => p._id === item._id);
                if (!productData) return null;

                return (
                  <motion.div
                    key={`${item._id}-${item.size}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    layout
                    className="flex items-center gap-4 sm:gap-6 bg-gray-900/50 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-800 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={productData.image[0]}
                        alt={productData.name}
                        className="w-full h-full object-cover mix-blend-lighten"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <Link to={`/product/${item._id}`} className="hover:text-gray-300 transition-colors">
                          <h3 className="font-bold text-sm sm:text-base uppercase tracking-tight truncate italic">
                            {productData.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => updateQuantity(item._id, item.size, 0)}
                          className="text-gray-600 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-black bg-white/10 px-2 py-0.5 rounded tracking-widest">
                          {item.size}
                        </span>
                        <span className="text-sm font-bold text-gray-400 italic">
                          {currency}{productData.price}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-black/30">
                          <button
                            disabled={item.quantity <= 1}
                            onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                            className="p-1 px-2 hover:bg-white/5 disabled:opacity-20 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-xs font-bold w-10 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                            className="p-1 px-2 hover:bg-white/5 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-black italic text-sm sm:text-base">
                          {currency}{productData.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {cartData.length > 0 && (
          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-end">
            <div className="w-full sm:w-80 space-y-3 mb-8">
              <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>{currency}{totalAmount}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-emerald-500">Free</span>
              </div>
              <div className="h-px bg-white/5 w-full my-2" />
              <div className="flex justify-between text-lg font-black italic uppercase tracking-tighter">
                <span>Total</span>
                <span>{currency}{totalAmount}</span>
              </div>
            </div>

            <button className="w-full sm:w-80 py-4 bg-white text-black text-xs font-black uppercase italic tracking-[0.2em] rounded-xl hover:bg-gray-200 transition-colors shadow-2xl shadow-white/5">
              Proceed to Checkout
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;

