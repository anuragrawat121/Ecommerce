import React from "react";
import Navbar from "../components/Navbar";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = ({ hideNavbar }) => {
  return (
    <div id="contact-section" className="min-h-screen w-full bg-black text-white pt-24 pb-24">
      {!hideNavbar && <Navbar />}
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-center mb-16">Get in Touch</h1>
        
        <div className="grid md:grid-cols-3 gap-8 text-center bg-gray-900/50 p-12 rounded-3xl border border-white/5">
           <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                 <Mail className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email Us</h3>
                <p className="text-sm text-gray-400">concierge@luxury.com</p>
              </div>
           </div>
           
           <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                 <Phone className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Call Us</h3>
                <p className="text-sm text-gray-400">+1 (800) 123-4567</p>
              </div>
           </div>

           <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                 <MapPin className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                <p className="text-sm text-gray-400 line-clamp-2">123 Fashion Ave<br/>New York, NY 10012</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;

