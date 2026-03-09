import React from "react";
import Navbar from "../components/Navbar";

const Cart = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-bold">Cart</h1>
        <p className="mt-4 text-white/80">Your cart items will show here.</p>
      </div>
    </div>
  );
};

export default Cart;

