import React from "react";
import Navbar from "../components/Navbar";
import { Mail, MapPin, Phone, Clock, MessageSquare, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const Contact = ({ hideNavbar }) => {
  return (
    <div
      id="contact-section"
      className="min-h-screen w-full bg-black text-white selection:bg-white/20"
    >
      {!hideNavbar && <Navbar />}

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Left Side: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none mb-6">
                Connect <br/> <span className="text-gray-500">With Us</span>
              </h1>
              <p className="text-gray-400 max-w-md leading-relaxed">
                Our concierge team is available to assist with private appointments, product inquiries, and order support. 
                Experience the world of LUXURY firsthand.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10 text-gray-400 group hover:bg-white hover:text-black transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-white mb-1">Inquiries</h3>
                  <p className="text-gray-500 text-sm">concierge@luxury.com</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10 text-gray-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-white mb-1">Flagship Store</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    123 Fashion Avenue, Soho <br/>
                    New York, NY 10012
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10 text-gray-400">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-white mb-1">Hours</h3>
                  <p className="text-gray-500 text-sm">Mon - Sat: 10AM - 8PM <br/> Sun: 12PM - 6PM</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all">
                <Instagram size={20} />
              </button>
              <button className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all">
                <Twitter size={20} />
              </button>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.02] border border-white/10 rounded-[40px] p-8 sm:p-12 shadow-2xl backdrop-blur-3xl"
          >
            <div className="flex items-center gap-3 mb-10">
              <MessageSquare className="text-gray-500" size={24} />
              <h2 className="text-xl font-black uppercase italic tracking-tight">Direct Message</h2>
            </div>

            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                 <input type="text" placeholder="Full Name" className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-white transition-all text-sm font-medium" />
                 <input type="email" placeholder="Email Address" className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-white transition-all text-sm font-medium" />
              </div>
              <input type="text" placeholder="Subject" className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-white transition-all text-sm font-medium" />
              <textarea placeholder="Message" rows="5" className="w-full bg-black/50 border border-white/10 rounded-3xl py-4 px-6 focus:outline-none focus:border-white transition-all text-sm font-medium resize-none"></textarea>
              
              <button className="w-full py-5 bg-white text-black text-xs font-black uppercase italic tracking-[0.3em] rounded-2xl hover:bg-gray-200 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)]">
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default Contact;
