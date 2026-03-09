import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, LogIn, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItemClass = () =>
    "text-white px-3 py-2 inline-flex items-center gap-2 hover:text-gray-400 transition-colors cursor-pointer";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleProductClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const productSection = document.getElementById("product");
      if (productSection) {
        productSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/product");
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/10 backdrop-blur-md border-b border-white/10"
          : "bg-transparent border-b-transparent"
      }`}
    >
      <div className="flex justify-between items-center w-full h-16 px-6 md:px-12">
        <div className="font-bold text-white text-xl">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Logo
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4">
          <NavLink className={navItemClass} to="/">
            Home
          </NavLink>
          <a className={navItemClass()} onClick={handleProductClick}>
            Product
          </a>
          <NavLink className={navItemClass} to="/about">
            About
          </NavLink>
          <NavLink className={navItemClass} to="/contact">
            Contact
          </NavLink>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink className={navItemClass} to="/cart">
            <ShoppingCart size={18} />
            Cart
          </NavLink>
          <NavLink className={navItemClass} to="/login">
            <LogIn size={18} />
            Login
          </NavLink>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white hover:text-gray-400 transition-colors focus:outline-none p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <NavLink className={navItemClass} to="/" onClick={toggleMenu}>
            Home
          </NavLink>
          <a className={navItemClass()} onClick={handleProductClick}>
            Product
          </a>
          <NavLink className={navItemClass} to="/about" onClick={toggleMenu}>
            About
          </NavLink>
          <NavLink className={navItemClass} to="/contact" onClick={toggleMenu}>
            Contact
          </NavLink>
          <div className="w-1/2 h-px bg-white/20 my-2"></div>
          <NavLink className={navItemClass} to="/cart" onClick={toggleMenu}>
            <ShoppingCart size={18} />
            Cart
          </NavLink>
          <NavLink className={navItemClass} to="/login" onClick={toggleMenu}>
            <LogIn size={18} />
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
