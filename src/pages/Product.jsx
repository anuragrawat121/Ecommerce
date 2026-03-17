import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProductContext from "../ContextApi/ProductContext";
import Navbar from "../components/Navbar";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RelatedProducts from "../components/Utils/RelatedProducts.jsx";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useProductContext();
  const navigate = useNavigate();

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        // Handle both mock data string and new data array formats
        const imgSource = Array.isArray(item.image)
          ? item.image[0]
          : item.image;
        setImage(imgSource);
        return null;
      }
    });
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Ensure image array for gallery mapping
  const imageGallery = Array.isArray(productData.image)
    ? productData.image
    : [productData.image];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 min-h-[calc(100vh-80px)] flex flex-col justify-center">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="flex-1 lg:max-w-[450px] flex flex-col-reverse sm:flex-row gap-3">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-start gap-3 sm:w-[15%] w-full hide-scrollbar">
              {imageGallery.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setImage(item)}
                  className={`cursor-pointer rounded-xl overflow-hidden aspect-[3/4] sm:aspect-square flex-shrink-0 bg-gray-900 border-2 transition-all duration-300 ${item === image ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-80"}`}
                >
                  <img
                    src={item}
                    alt={`${productData.name} view ${index + 1}`}
                    className="w-full h-full object-cover mix-blend-lighten"
                  />
                </div>
              ))}
            </div>
            <div className="w-full sm:w-[85%] aspect-square sm:aspect-[4/5] max-h-[50vh] sm:max-h-[65vh] bg-gray-900 rounded-[24px] overflow-hidden p-4 relative">
              <img
                className="w-full h-full object-contain mix-blend-lighten"
                src={image}
                alt={productData.name}
              />
              {/* Optional badges could go here if implemented on data model */}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col pt-2 sm:pt-6">
            <div className="mb-1">
              <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase italic">
                {productData.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase italic leading-none mb-3">
              {productData.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${
                      i < Math.floor(productData.rating || 4)
                        ? "fill-white text-white"
                        : "fill-transparent text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm font-bold text-gray-400">
                ({productData.reviews || 122} Reviews)
              </p>
            </div>

            <p className="text-3xl font-black tracking-tighter italic mb-4">
              ${productData.price}
            </p>

            {/* --- End of Main Details Block (Pricing, Size, Add to Cart) --- */}
            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Select Size
                </h3>
                <button className="text-[10px] font-bold text-white uppercase italic underline hover:text-gray-300">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(productData.sizes || ["S", "M", "L", "XL"]).map(
                  (item, index) => (
                    <button
                      onClick={() => setSize(item)}
                      className={`h-10 w-10 text-sm flex items-center justify-center rounded-lg border-2 font-bold transition-all duration-300
                      ${
                        item === size
                          ? "border-white bg-white text-black scale-105"
                          : "border-gray-700 hover:border-white text-gray-400 hover:text-white bg-gray-900"
                      }
                    `}
                      key={index}
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => {
                  if (size) {
                    addToCart(productData._id, size);
                  }
                }}
                className={`flex-1 py-3.5 rounded-xl text-xs font-black uppercase italic tracking-widest flex items-center justify-center gap-2 transition-colors active:scale-95 ${
                  !size
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                <ShoppingCart size={16} className={!size ? "opacity-30" : ""} />
                ADD TO CART
              </button>
            </div>

            <div className="h-px w-full bg-white/10 mb-4" />

            {/* Animated Tab Section */}
            <div className="mb-4">
              <div className="flex gap-6 border-b border-gray-800 mb-4 relative">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors relative z-10 ${activeTab === "description" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors relative z-10 ${activeTab === "reviews" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                >
                  Reviews ({productData.reviews || 122})
                </button>

                {/* Animated Indicator */}
                <motion.div
                  layoutId="productTabIndicator"
                  className="absolute bottom-0 h-0.5 bg-white"
                  initial={false}
                  animate={{
                    left: activeTab === "description" ? "0%" : "90px", // Approximate widths, better done with refs in complex apps
                    width: activeTab === "description" ? "85px" : "95px",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>

              <div className="relative overflow-hidden min-h-[120px]">
                <AnimatePresence mode="wait">
                  {activeTab === "description" && (
                    <motion.div
                      key="description"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-300 text-sm leading-relaxed space-y-4"
                    >
                      <p>
                        {productData.description ||
                          "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment."}
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-400">
                        <li>100% Original product.</li>
                        <li>Cash on delivery is available.</li>
                        <li>Easy return and exchange policy within 7 days.</li>
                      </ul>
                    </motion.div>
                  )}
                  {activeTab === "reviews" && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-300 text-sm leading-relaxed"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl font-black italic">
                          {productData.rating || 4.5}
                        </div>
                        <div>
                          <div className="flex text-white mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < Math.floor(productData.rating || 4.5)
                                    ? "fill-white"
                                    : "fill-transparent text-gray-600"
                                }
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 uppercase tracking-widest">
                            Based on {productData.reviews || 122} reviews
                          </p>
                        </div>
                      </div>
                      <p className="italic text-gray-400">
                        "Excellent quality and perfect fit. The material feels
                        premium and exactly as described in the images. Highly
                        recommended!" <br /> - Verified Buyer
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </main>
    </div>
  );
};

export default Product;
