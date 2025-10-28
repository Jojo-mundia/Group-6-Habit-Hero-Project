// Navigation bar component with links to different sections of the app
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import Clock from "./Clock";

const Navbar = () => {
  // Get current user from Clerk
  const { user } = useUser();

  // State for scroll-based navbar visibility
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Function to get a time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    if (hour < 21) return "Evening";
    return "Night";
  };

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up or at top - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${isVisible ? "navbar-visible" : "navbar-hidden"}`}>
      <div className="navbarContainer">
        {/* Greeting on the left */}
        <div className="navbarLeft">
          <h1>
            Good {getGreeting()}, {user?.firstName}!
          </h1>
        </div>

        {/* Navigation links in the center */}
        <div className="navbarCenter">
          <div className="navbarLinks">
            <Link className="navBtn" to="/home">
              Home
            </Link>
            <Link className="navBtn" to="/habits">
              Habits
            </Link>
            <Link className="navBtn" to="/add-habit">
              Add Habit
            </Link>
            <Link className="navBtn" to="/report">
              Report
            </Link>
            <Link className="navBtn" to="/shared-progress/all">
              All Shared Progress
            </Link>
          </div>
        </div>

        {/* Clock and user button on the right */}
        <div className="navbarRight">
          <Clock />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
