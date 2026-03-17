import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";

/**
 * ProductCard Component
 * Blends a premium design with smooth Framer Motion animations.
 *
 * Props:
 * - product: Object containing image, brand, name, price, badge, rating, reviews, category, discount, isNew
 * - index: Integer for staggered entry animations
 */
const ProductCard = ({ product, index = 0 }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Support both the mock data and the new assets.js structure
  const {
    _id = "1",
    image:
      rawImage = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
    brand = "Off-White",
    name = "ODSY-1000 low-top sneakers",
    price = "715.00",
    badge = "New Season",
    rating = 4.5,
    reviews = 12,
    category = "SNEAKERS",
    discount = null,
    isNew = false,
  } = product || {};

  // Handle image array or string
  const image = Array.isArray(rawImage) ? rawImage[0] : rawImage;

  return (
    <Link to={`/product/${_id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative bg-white rounded-[20px] p-4 w-full max-w-[260px] shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-gray-100 flex flex-col gap-3 font-sans h-full"
      >
        {/* Header - Badge and Favorite */}
        <div className="flex justify-between items-center h-7 relative z-10">
          <div className="flex gap-1.5">
            {isNew && (
              <div className="px-2 py-0.5 rounded-lg bg-emerald-500 text-white text-[9px] font-black uppercase tracking-tighter italic">
                NEW
              </div>
            )}
            {discount && (
              <div className="px-2 py-0.5 rounded-lg bg-red-500 text-white text-[9px] font-black uppercase tracking-tighter italic">
                -{discount}
              </div>
            )}
            {badge && !isNew && !discount && (
              <div className="flex items-center gap-1 px-2 py-0.5 border border-gray-100 rounded-lg bg-white shadow-sm">
                <Star size={8} className="fill-gray-600 text-gray-600" />
                <span className="text-[10px] font-bold text-gray-800 uppercase tracking-tight italic">
                  {badge}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all duration-300 ${
              isFavorite
                ? "bg-red-50 text-red-500"
                : "text-gray-400 hover:text-gray-900"
            }`}
          >
            <Heart
              size={18}
              strokeWidth={2}
              className={isFavorite ? "fill-current" : ""}
            />
          </button>
        </div>

        {/* Product Image Section */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-4">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-110"
          />

          {/* Quick Add Overlay - Visible on Mobile and on Hover for Desktop */}
          <motion.div
            initial={false}
            animate={{
              opacity: isHovered
                ? 1
                : typeof window !== "undefined" && window.innerWidth < 768
                  ? 1
                  : 0,
              y: isHovered
                ? 0
                : typeof window !== "undefined" && window.innerWidth < 768
                  ? 0
                  : 10,
            }}
            className="absolute bottom-3 left-3 right-3 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300"
          >
            <button className="w-full bg-black/90 backdrop-blur-md text-white py-2.5 rounded-xl text-[12px] font-black uppercase italic tracking-tighter flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg">
              <ShoppingCart size={14} strokeWidth={2.5} />
              ADD TO CART
            </button>
          </motion.div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col items-center text-center gap-1">
          <span className="text-[10px] font-black tracking-[0.1em] text-gray-400 uppercase italic">
            {category || brand}
          </span>
          <h3 className="text-[16px] font-black text-gray-900 tracking-tighter italic uppercase leading-tight line-clamp-1">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-0.5 my-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={`${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-100 text-gray-200"
                }`}
              />
            ))}
            <span className="text-[10px] font-bold text-gray-400 ml-1">
              ({reviews || 0})
            </span>
          </div>

          <span className="text-[18px] font-black text-gray-900 tracking-tighter italic">
            ${price}
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
