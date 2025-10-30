// Navigation bar component with collapsible menu for mobile and desktop
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import Clock from "./Clock";

const Navbar = () => {
  // Get the current authenticated user from Clerk
  const { user } = useUser();

  // State for scroll-based navbar visibility
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to generate time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    if (hour < 21) return "Evening";
    return "Night";
  };

  // Effect to handle scroll-based navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide navbar when scrolling down past 100px
        setIsVisible(false);
        setIsMenuOpen(false); // Close menu when hiding navbar
      } else {
        // Show navbar when scrolling up or at top
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isVisible ? "navbar-visible" : "navbar-hidden"}`}>
      <div className="navbarContainer">
        {/* Greeting on the left */}
        <div className="navbarLeft">
          <h1>
            Good {getGreeting()}, {user?.firstName}!
          </h1>
        </div>

        {/* Navigation links - hidden on mobile, shown when menu is open */}
        <div className="navbarCenter">
          <div className={`navbarLinks ${isMenuOpen ? "navbarLinksOpen" : ""}`}>
            <Link className="navBtn" to="/home" onClick={closeMenu}>
              Home
            </Link>
            <Link className="navBtn" to="/habits" onClick={closeMenu}>
              Habits
            </Link>
            <Link className="navBtn" to="/add-habit" onClick={closeMenu}>
              Add Habit
            </Link>
            <Link className="navBtn" to="/report" onClick={closeMenu}>
              Report
            </Link>
            <Link
              className="navBtn"
              to="/shared-progress/all"
              onClick={closeMenu}
            >
              All Shared Progress
            </Link>
          </div>
        </div>

        {/* Clock, hamburger button, and user button on the right */}
        <div className="navbarRight">
          <Clock />
          <button className="hamburgerBtn" onClick={toggleMenu}>
            <span className="hamburgerLine"></span>
            <span className="hamburgerLine"></span>
            <span className="hamburgerLine"></span>
          </button>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
