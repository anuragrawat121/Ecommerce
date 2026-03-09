import React from "react";
import VideoBackground from "../components/VideoBackground";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Product from "./Product";

const Home = () => {
  return (
    <div className="bg-black">
      <VideoBackground>
        <Navbar />
        <Hero />
      </VideoBackground>
      {/* Product page seamlessly scrolls in with its own content */}
      <Product hideNavbar={true} />
    </div>
  );
};

export default Home;

