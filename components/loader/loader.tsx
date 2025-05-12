"use client";

import { VideoContext } from "@/context/video";
import { useContext } from "react";

const Loader = () => {
  const ctx = useContext(VideoContext);
  const { loadingMessage } = ctx!;
  return (
    <div className="loader">
      <div className="loading-text">
        {loadingMessage}
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </div>
      <div className="loading-bar-background">
        <div className="loading-bar">
          <div className="white-bars-container">
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
