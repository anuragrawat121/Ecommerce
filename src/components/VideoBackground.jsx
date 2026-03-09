import React from 'react'
import HomeBg from '../assets/images/HomeBg.mp4'
import { motion, useScroll, useTransform } from 'framer-motion'

const VideoBackground = ({ children }) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <div className="relative min-h-screen w-full bg-black">
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
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>
      
      {/* Scrollable content on top of video */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default VideoBackground
