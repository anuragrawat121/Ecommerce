/* eslint-disable no-unused-vars */
import React from "react";
import HomeBg from "../assets/HomeBg.mp4";
import { motion, useScroll, useTransform } from "framer-motion";

const VideoBackground = ({ children }) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 250], [1, 0]);

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden">
      {/* Fixed video background that fades to black on scroll */}
      <motion.div
        style={{ opacity }}
        className="fixed inset-0 z-0 w-full h-full pointer-events-none"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={HomeBg}
        />
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>

      {/* Scrollable content on top of video */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default VideoBackground;
