import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import useProductContext from "../ContextApi/ProductContext";
import ProductCard from "../components/ProductCard";
import {
  SlidersHorizontal,
  ChevronDown,
  Grid3x3,
  Grid2x2,
} from "lucide-react";

const CATEGORIES = ["All", "Men", "Women", "Kids", "Footwear"];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const Collection = ({ hideNavbar = false }) => {
  const { products, search } = useProductContext();
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]); // Adjusted for premium pricing
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState(5);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Global Search filter (from context)
    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (p) => parseFloat(p.price) >= priceRange[0] && parseFloat(p.price) <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, search, sortBy, priceRange, products]);

  return (
    <div id="collection-section" className="min-h-screen bg-black text-white relative z-0 pt-24 font-sans">
      {!hideNavbar && <Navbar />}
      
      {/* Header & Controls Section */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-8 mb-12"
        >
          {/* Title & Stats */}
          <div className="flex items-end justify-between border-b border-white/10 pb-6">
            <div className="space-y-1">
              <h1 className="text-5xl font-black tracking-tighter uppercase italic">
                The Collection
              </h1>
              <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] italic flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                {filteredProducts.length} Premium Pieces
              </p>
            </div>

            {/* Grid Toggles */}
            <div className="hidden md:flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl">
              <button
                onClick={() => setGridCols(5)}
                className={`p-2.5 rounded-lg transition-all ${
                  gridCols === 5 ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid3x3 size={20} />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-2.5 rounded-lg transition-all ${
                  gridCols === 3 ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid2x2 size={20} />
              </button>
            </div>
          </div>

          {/* Filtering Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${
                    selectedCategory === cat 
                    ? "bg-white border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                    : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Premium Sort Dropdown */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 text-white pl-5 pr-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:border-white/30 transition-all cursor-pointer outline-none min-w-[180px] justify-between group"
                >
                  <span className="truncate">
                    {SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label}
                  </span>
                  <motion.div
                    animate={{ rotate: isSortOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "circOut" }}
                  >
                    <ChevronDown
                      size={16}
                      strokeWidth={3}
                      className="text-gray-500 group-hover:text-white transition-colors"
                    />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full mt-2 right-0 w-full min-w-[200px] bg-[#111] border border-white/10 rounded-2xl overflow-hidden z-50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl"
                    >
                      <div className="py-2">
                        {SORT_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setSortBy(opt.value);
                              setIsSortOpen(false);
                            }}
                            className={`w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                              sortBy === opt.value
                                ? "bg-white text-black"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2.5 px-6 py-3 border rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  showFilters ? "bg-white border-white text-black" : "border-white/10 text-gray-400 hover:border-white/30 bg-white/5"
                }`}
              >
                <SlidersHorizontal size={16} strokeWidth={3} />
                Filters
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-8 border border-white/10 rounded-[32px] bg-white/5 backdrop-blur-3xl shadow-2xl">
                  <div className="max-w-md space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-black uppercase tracking-[.2em] text-white">Price Range</h3>
                      <span className="text-xs font-black bg-white text-black px-3 py-1 rounded-full tracking-tighter">
                        $0 — ${priceRange[1]}
                      </span>
                    </div>
                    <div className="relative h-2 bg-white/5 rounded-full border border-white/10 flex items-center px-1">
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full h-1 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                      <span>Min $0</span>
                      <span>Max $2000+</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              key={selectedCategory + sortBy + search + priceRange[1]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`grid gap-x-6 gap-y-12 ${
                gridCols === 5
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {filteredProducts.map((item, index) => (
                <div key={item.id || index} className="flex justify-center">
                  <ProductCard product={item} index={index} />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center space-y-6 border border-dashed border-white/10 rounded-[32px] bg-white/[0.02]"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-white/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <SlidersHorizontal size={64} className="text-gray-800 relative z-10" strokeWidth={1} />
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">No Matches Found</h3>
                <p className="text-gray-500 uppercase font-bold text-xs tracking-widest">Refine your selection or clear filters</p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setPriceRange([0, 2000]);
                  setSortBy("featured");
                }}
                className="px-8 py-3 bg-white text-black font-black uppercase text-[10px] tracking-[.3em] rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all active:scale-95"
              >
                Reset All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Collection;
