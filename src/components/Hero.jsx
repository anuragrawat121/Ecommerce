/* eslint-disable no-unused-vars */
import BlurText from "./UI/Blurtext";
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const handleAnimationComplete = () => {};

  return (
    <div className="lg:flex flex-col items-center mt-12 p-12 text-white w-1/2 h-screen text-center  ">
      <BlurText
        text="Discover the Future of Fashion"
        delay={250}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="text-8xl mb-2 font-bold "
        textStyles={[
          "", // Discover
          "", // the
          "bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500", // Future
          "bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500", // of
          "bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500", // Fashion
        ]}
      />
      <div className="w-full flex  items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 text-2xl text-gray-300 max-w-xl leading-snug"
        >
          Immerse yourself in a world where luxury meets innovation. Handcrafted
          pieces that define your unique style.
        </motion.p>
      </div>

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
        <span className="text-xs tracking-[0.3em] uppercase mb-2 text-gray-400">
          Scroll Down
        </span>
        <ChevronDown size={20} className="text-gray-400" />
      </motion.div>
    </div>
  );
};

export default Hero;
