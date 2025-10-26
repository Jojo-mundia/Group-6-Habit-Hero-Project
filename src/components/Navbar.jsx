// Navigation bar component with links to different sections of the app
import React from "react";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import Clock from "./Clock";

const Navbar = () => {
  // Get current user from Clerk
  const { user } = useUser();

  // Function to get a time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    if (hour < 21) return "Evening";
    return "Night";
  };

  return (
    <nav className="navbar">
      <div className="navbarContainer">
        {/* Personalized greeting */}
        <h1>
          Good {getGreeting()}, {user?.firstName}!
        </h1>
        <div className="navbarRight">
          <Clock />
          <div className="navbarLinks">
            {/* Navigation links */}
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
            {/* User account button */}
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
