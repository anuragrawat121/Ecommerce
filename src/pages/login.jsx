import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import VideoBackground from "../components/VideoBackground";
import { LogIn, UserPlus, Mail, Lock, User, ArrowRight, CheckCircle2, AlertCircle, Eye, EyeOff, Github, Facebook } from "lucide-react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (currentState === "Sign Up") {
      // Signup Logic
      if (!formData.name || !formData.email || !formData.password) {
        setError("All fields are required");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = users.find((user) => user.email === formData.email);

      if (userExists) {
        setError("User already exists with this email");
        return;
      }

      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      setSuccess("Account created successfully! Please login.");
      
      // Auto switch to login after 1.5s
      setTimeout(() => {
        setCurrentState("Login");
        setSuccess("");
      }, 1500);

    } else {
      // Login Logic
      if (!formData.email || !formData.password) {
        setError("Email and password are required");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        localStorage.setItem("token", "dummy-premium-token");
        localStorage.setItem("currentUser", JSON.stringify({ name: user.name, email: user.email }));
        setSuccess("Welcome back!");
        
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setError("Invalid email or password");
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      <Navbar />

      <VideoBackground>
        <main className="flex items-center justify-center px-4 pt-32 pb-20">
        <div className="w-full max-w-sm relative">
          
          {/* Background Glows */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentState}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 sm:p-8 rounded-[32px] shadow-2xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-4"
                >
                  {currentState === "Login" ? (
                    <LogIn className="text-black" size={32} />
                  ) : (
                    <UserPlus className="text-black" size={32} />
                  )}
                </motion.div>
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none">
                  {currentState === "Login" ? "Sign In" : "Join Now"}
                </h1>
                <p className="text-gray-400 mt-2 text-sm font-medium tracking-wide">
                  {currentState === "Login" 
                    ? "Welcome back to world of luxury" 
                    : "Create an account for premium access"}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {currentState === "Sign Up" && (
                  <motion.div variants={itemVariants} className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-white transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/5 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all text-sm font-medium placeholder:text-gray-600"
                    />
                  </motion.div>
                )}

                <motion.div variants={itemVariants} className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-white transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/5 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all text-sm font-medium placeholder:text-gray-600"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-white transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/5 rounded-2xl py-3 pl-12 pr-12 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all text-sm font-medium placeholder:text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </motion.div>

                {/* Status Messages */}
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase italic tracking-wider px-2"
                    >
                      <AlertCircle size={14} /> {error}
                    </motion.div>
                  )}
                  {success && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase italic tracking-wider px-2"
                    >
                      <CheckCircle2 size={14} /> {success}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-white text-black py-3 rounded-2xl text-xs font-black uppercase italic tracking-[0.2em] flex items-center justify-center gap-2 mt-4 hover:bg-gray-200 transition-colors shadow-lg"
                >
                  {currentState === "Login" ? "Sign In" : "Register"}
                  <ArrowRight size={16} />
                </motion.button>
              </form>

              {/* Social Login Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase italic tracking-tighter">
                  <span className="bg-black/20 backdrop-blur-md px-4 text-gray-500 font-bold">Or continue with</span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => console.log("Google login")}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-[10px] font-black uppercase tracking-[0.1em]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  onClick={() => console.log("Facebook login")}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-[10px] font-black uppercase tracking-[0.1em]"
                >
                  <Facebook size={16} fill="currentColor" />
                  Facebook
                </button>
              </div>

              {/* Footer Toggle */}
              <motion.div 
                variants={itemVariants} 
                className="mt-6 text-center"
              >
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-loose">
                  {currentState === "Login" ? (
                    <>
                      Don't have an account? <br/>
                      <span 
                        onClick={() => setCurrentState("Sign Up")}
                        className="text-white hover:text-gray-300 cursor-pointer underline underline-offset-4 decoration-white/20 transition-colors italic"
                      >
                        Create Account
                      </span>
                    </>
                  ) : (
                    <>
                      Already a member? <br/>
                      <span 
                        onClick={() => setCurrentState("Login")}
                        className="text-white hover:text-gray-300 cursor-pointer underline underline-offset-4 decoration-white/20 transition-colors italic"
                      >
                        Sign In Instead
                      </span>
                    </>
                  )}
                </p>
              </motion.div>

            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      </VideoBackground>
    </div>
  );
};

export default Login;