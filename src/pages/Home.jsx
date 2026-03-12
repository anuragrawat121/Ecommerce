import React from "react";
import VideoBackground from "../components/VideoBackground";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Collection from "./Collection";

const Home = () => {
  return (
    <div className="bg-black">
      <VideoBackground>
        <Navbar />
        <Hero />
      </VideoBackground>
      {/* Product page seamlessly scrolls in with its own content */}
      <Collection hideNavbar={true} />
    </div>
  );
};

export default Home;
