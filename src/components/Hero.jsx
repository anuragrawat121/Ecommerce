/* eslint-disable no-unused-vars */
import BlurText from "@/components/UI/BlurText";
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const handleAnimationComplete = () => {};

  return (
    <div className="lg:flex flex-col items-center mt-16 lg:p-12 px-12 py-4 text-white lg:w-1/2 h-screen text-center w-screen ">
      <BlurText
        text="Discover the Future of Fashion"
        delay={250}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="md:text-7xl lg:text-8xl text-6xl lg:mb-2 mb-8 font-bold text-center "
        textStyles={[
          "", // Discover
          "", // the
          "bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500", // Future
          "bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500", // of
          "bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500", // Fashion
        ]}
      />
      <div className="lg:w-full w-full flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 text-2xl text-gray-300  leading-relaxed"
        >
          Immerse yourself in a world where luxury meets innovation. Handcrafted
          pieces that define your unique style.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-12 flex flex-wrap justify-center gap-12 lg:gap-24"
      >
        <div className="text-center">
          <p className="text-4xl font-bold bg-clip-text text-transparent bg-white">
            500+
          </p>
          <p className="text-sm uppercase tracking-widest text-gray-400 mt-2">
            Premium Items
          </p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold bg-clip-text text-transparent  bg-white">
            10K+
          </p>
          <p className="text-sm uppercase tracking-widest text-gray-400 mt-2">
            Happy Clients
          </p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold bg-clip-text text-transparent bg-white">
            50+
          </p>
          <p className="text-sm uppercase tracking-widest text-gray-400 mt-2">
            Countries
          </p>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          delay: 2,
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={() =>
          window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <span className="text-xs tracking-[0.3em] uppercase mb-2 text-gray-400 hidden lg:block">
          Explore More
        </span>
        <ChevronDown size={20} className="text-gray-400" />
      </motion.div>
    </div>
  );
};

export default Hero;
