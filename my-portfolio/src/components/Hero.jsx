import React from "react";
import { motion } from "framer-motion";
import '../css/Hero.css'
import devVector from "../assets/dev-vector.png";

const Hero = () => {
  return (
    <section className="hero">
      {/* Floating Blobs */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1>
            Hello, I’m <span className="highlight">Rohit Panchal</span> 👋
          </h1>
          <p>Frontend Developer | React | JavaScript | CSS | WordPress</p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, staggerChildren: 0.2 }}
          >
            <a href="#projects" className="btn primary">View Projects</a>
            <a href="/resume.pdf" className="btn secondary" download>Download CV</a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img src={devVector} alt="Developer Illustration" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
