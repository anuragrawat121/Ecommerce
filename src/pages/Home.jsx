import React from "react";
import VideoBackground from "../components/VideoBackground";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Collection from "./Collection";
import About from "./About";
import Contact from "./Contact";

const Home = () => {
  return (
    <div id="home-section" className="bg-black scroll-smooth">
      <VideoBackground>
        <Navbar />
        <Hero />
      </VideoBackground>
      
      {/* SPA Sections */}
      <Collection hideNavbar={true} />
      <About hideNavbar={true} />
      <Contact hideNavbar={true} />
    </div>
  );
};

export default Home;
