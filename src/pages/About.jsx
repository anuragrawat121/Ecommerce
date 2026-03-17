import React from "react";
import Navbar from "../components/Navbar";
import AboutHero from "../assets/about_hero.png";
import { motion } from "framer-motion";

const About = ({ hideNavbar }) => {
  return (
    <div id="about-section" className="min-h-screen w-full bg-black text-white selection:bg-white/20">
      {!hideNavbar && <Navbar />}
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Editorial Header */}
        <div className="flex flex-col items-center text-center mb-24 pt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-500 mb-6"
          >
            Philosophy
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none"
          >
            The <span className="text-gray-500">Archive</span>
          </motion.h1>
        </div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-32">
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="lg:col-span-7 aspect-video lg:aspect-[16/10] rounded-[40px] overflow-hidden bg-gray-900 shadow-2xl relative"
          >
             <img src={AboutHero} alt="Luxury Archive" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="lg:col-span-5 space-y-8"
          >
            <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-tight">
              Crafting <br/> Uncompromising <br/> Excellence
            </h2>
            <div className="h-px w-20 bg-white" />
            <p className="text-gray-400 leading-relaxed font-medium">
              LUXURY was founded on the principle that true fashion is an intersection of art and raw emotion. 
              We don't follow trends; we define the silence between them. Each piece in our archive is 
              a testament to the meticulous labor of global artisans.
            </p>
            <p className="text-gray-400 leading-relaxed font-medium">
              Our designs are stripped of the unnecessary, focusing instead on the architectural beauty of 
              silhouette and the soul of the fabric.
            </p>
          </motion.div>
        </div>

        {/* Mission / Values Staggered */}
        <div className="grid md:grid-cols-3 gap-12 border-t border-white/5 pt-20">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="space-y-4"
           >
              <h3 className="text-white font-black italic uppercase tracking-tight">Curation</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Only the most exceptional textiles are selected for our garments. From Japanese denim to Italian silk, 
                our materials are chosen for their character and longevity.
              </p>
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="space-y-4"
           >
              <h3 className="text-white font-black italic uppercase tracking-tight">Ethos</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We advocate for slow fashion. Our production cycles are deliberate, ensuring that every stitch 
                meets our rigid standards of perfection and ethical responsibility.
              </p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="space-y-4"
           >
              <h3 className="text-white font-black italic uppercase tracking-tight">Legacy</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                A LUXURY piece is intended to be a lifelong companion. Our garments are engineered to age 
                gracefully, becoming a part of your personal history.
              </p>
           </motion.div>
        </div>
      </main>
    </div>
  );
};

export default About;
