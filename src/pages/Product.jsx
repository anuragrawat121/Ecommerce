import React from "react";
import Navbar from "../components/Navbar";

const Product = ({ hideNavbar = false }) => {
  return (
    <div
      id="product"
      className="min-h-screen w-full bg-black text-white relative z-0"
    >
      {!hideNavbar && <Navbar />}
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-bold">Product</h1>
        <p className="mt-4 text-white/80">Edit this page content.</p>
      </div>
    </div>
  );
};

export default Product;
