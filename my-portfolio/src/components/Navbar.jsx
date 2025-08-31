import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../css/Navbar.css";

function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const location = useLocation();

  // Apply theme to <html> and persist
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  const linkClass = ({ isActive }) =>
    `nav-link${isActive ? " active" : ""}`;

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">Rohit.dev</div>

          {/* Desktop menu */}
          <ul className="navbar-menu desktop-menu">
            <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
            <li><NavLink to="/projects" className={linkClass}>Projects</NavLink></li>
            <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
            <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
          </ul>

          {/* Desktop theme toggle */}
          <button
            className="theme-toggle desktop-theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              // Sun icon
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M12 4V2m0 20v-2M4.93 4.93 3.52 3.52m16.96 16.96-1.41-1.41M4 12H2m20 0h-2M4.93 19.07l-1.41 1.41m16.96-16.96-1.41 1.41M12 8a4 4 0 100 8 4 4 0 000-8Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              // Moon icon
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="bar top" />
            <span className="bar middle" />
            <span className="bar bottom" />
          </button>
        </div>
      </nav>

      {/* Backdrop + Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="backdrop"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              id="mobile-menu"
              className="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="mobile-menu-header">
                <div className="navbar-logo">Rohit.dev</div>
                {/* Explicit close (X) button */}
                <button
                  className="close-btn"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <ul className="mobile-links">
                <li><NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>Home</NavLink></li>
                <li><NavLink to="/projects" className={linkClass} onClick={() => setMenuOpen(false)}>Projects</NavLink></li>
                <li><NavLink to="/about" className={linkClass} onClick={() => setMenuOpen(false)}>About</NavLink></li>
                <li><NavLink to="/contact" className={linkClass} onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
              </ul>

              <button
                className="theme-toggle mobile-theme-toggle"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
