import React from "react";
import Navbar from "../components/Navbar";

const About = ({ hideNavbar }) => {
  return (
    <div id="about-section" className="min-h-screen w-full bg-black text-white pt-24">
      {!hideNavbar && <Navbar />}
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-center mb-12">About Our Brand</h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <p className="text-gray-300 leading-relaxed text-lg">
                Born from a passion for uncompromising quality and avant-garde design, 
                <span className="font-bold text-white italic"> LUXURY</span> represents the pinnacle of modern fashion. 
                We believe that clothing shouldn't just be worn; it should be experienced.
             </p>
             <p className="text-gray-300 leading-relaxed text-lg">
                Every piece in our collection is meticulously crafted using the finest materials sourced globally. 
                Our silhouettes are designed to empower, effortlessly blending timeless elegance with contemporary edge.
             </p>
          </div>
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
              {/* Placeholder for brand imagery */}
              <div className="w-full h-full bg-gradient-to-tr from-gray-900 to-gray-800 flex items-center justify-center">
                 <span className="text-white/20 font-black text-6xl italic tracking-tighter">LXR</span>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;

