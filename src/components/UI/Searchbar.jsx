import React, { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useProductContext from "../../ContextApi/ProductContext";

function Searchbar() {
  const { search, setSearch, showSearch, setShowSearch } = useProductContext();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showSearch) {
      inputRef.current?.focus();
    }
  }, [showSearch]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSearch(false);
      navigate("/collection");
    }
  };

  return (
    <AnimatePresence>
      {showSearch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-6 bg-black/40 backdrop-blur-md"
          onClick={() => setShowSearch(false)}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl group"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search
                size={20}
                className="text-gray-400 group-focus-within:text-white transition-colors"
              />
            </div>
            <input
              ref={inputRef}
              className="w-full bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full py-4 px-14 text-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 transition-all duration-300 shadow-2xl"
              type="text"
              value={search}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for luxury pieces..."
            />
            <button
              onClick={() => setShowSearch(false)}
              className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Searchbar;
