import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, LogIn, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useProductContext from "../ContextApi/ProductContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setShowSearch, getCartCount } = useProductContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status on mount and when location changes
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      // If not on home page, navigate to home then scroll
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100); // Small delay to allow DOM to render
    } else {
      // If already on home page, just scroll
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const navItemClass = "text-white px-3 py-2 inline-flex items-center gap-2 hover:text-gray-400 transition-colors cursor-pointer text-sm font-bold uppercase tracking-widest";
  const mobileNavItemClass = "text-white text-xl py-4 flex items-center gap-3 w-full justify-center transition-all cursor-pointer font-bold uppercase tracking-widest";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <nav
      className={`fixed h-[75px] top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/50 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b-transparent"
      }`}
    >
      <div className="flex justify-between items-center w-full h-20 px-6 md:px-12">
        <div className="font-black text-white text-3xl tracking-tighter uppercase italic cursor-pointer">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            LUXURY
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6">
          <a className={navItemClass} onClick={(e) => scrollToSection(e, "home-section")}>
            Home
          </a>
          <a className={navItemClass} onClick={(e) => scrollToSection(e, "collection-section")}>
            Collection
          </a>
          <a className={navItemClass} onClick={(e) => scrollToSection(e, "about-section")}>
            About
          </a>
          <a className={navItemClass} onClick={(e) => scrollToSection(e, "contact-section")}>
            Contact
          </a>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            className={navItemClass}
            onClick={() => setShowSearch(true)}
          >
            <Search size={20} />
            <span className="text-sm font-medium">Search</span>
          </button>
          <NavLink className={navItemClass} to="/cart">
            <div className="relative">
              <ShoppingCart size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[10px] font-black rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </div>
            <span className="text-sm font-medium">Cart</span>
          </NavLink>
          {isLoggedIn ? (
            <button className={navItemClass} onClick={handleLogout}>
              <LogIn size={20} className="rotate-180" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          ) : (
            <NavLink className={navItemClass} to="/login">
              <LogIn size={20} />
              <span className="text-sm font-medium">Login</span>
            </NavLink>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white block transition-transform duration-300"
          />
          <motion.span
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-white block transition-opacity duration-300"
          />
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white block transition-transform duration-300"
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden absolute top-0 left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 pt-24 pb-8"
          >
            <div className="flex flex-col items-center px-6">
              <motion.div className="w-full" variants={itemVariants}>
                <a className={mobileNavItemClass} onClick={(e) => scrollToSection(e, "home-section")}>
                  Home
                </a>
              </motion.div>
              <motion.div className="w-full" variants={itemVariants}>
                <a className={mobileNavItemClass} onClick={(e) => scrollToSection(e, "collection-section")}>
                  Collection
                </a>
              </motion.div>
              <motion.div className="w-full" variants={itemVariants}>
                <a className={mobileNavItemClass} onClick={(e) => scrollToSection(e, "about-section")}>
                  About
                </a>
              </motion.div>
              <motion.div className="w-full" variants={itemVariants}>
                <a className={mobileNavItemClass} onClick={(e) => scrollToSection(e, "contact-section")}>
                  Contact
                </a>
              </motion.div>

              <motion.div
                className="w-full h-px bg-white/10 my-6"
                variants={itemVariants}
              />

              {/* Mobile Actions - Aligned Horizontally */}
              <motion.div
                className="flex w-full justify-around gap-4"
                variants={itemVariants}
              >
                <button
                  className="flex flex-col items-center gap-2 p-4 text-white hover:text-gray-400 transition-colors"
                  onClick={() => {
                    setShowSearch(true);
                    if (isMenuOpen) setIsMenuOpen(false);
                  }}
                >
                  <Search size={24} />
                  <span className="text-sm">Search</span>
                </button>
                <NavLink
                  className="flex flex-col items-center gap-2 p-4 text-white hover:text-gray-400 transition-colors"
                  to="/cart"
                  onClick={toggleMenu}
                >
                  <ShoppingCart size={24} />
                  <span className="text-sm">Cart</span>
                </NavLink>
                {isLoggedIn ? (
                  <button
                    className="flex flex-col items-center gap-2 p-4 text-white hover:text-gray-400 transition-colors"
                    onClick={() => {
                      handleLogout();
                      if (isMenuOpen) setIsMenuOpen(false);
                    }}
                  >
                    <LogIn size={24} className="rotate-180" />
                    <span className="text-sm">Logout</span>
                  </button>
                ) : (
                  <NavLink
                    className="flex flex-col items-center gap-2 p-4 text-white hover:text-gray-400 transition-colors"
                    to="/login"
                    onClick={toggleMenu}
                  >
                    <LogIn size={24} />
                    <span className="text-sm">Login</span>
                  </NavLink>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
