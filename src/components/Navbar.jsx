import React from "react";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react"; // Clerk for user management
import Clock from "./Clock"; // Custom clock component

/**
 * Navbar Component
 
 * Displays a greeting, navigation links, live clock, and user button.
 */
const Navbar = () => {
  const { user } = useUser(); // Get current user info from Clerk

  // Determine greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    if (hour < 21) return "Evening";
    return "Night";
  };

  return (
    <nav className="navbar navbar-dark bg-dark p-3" style={{ height: "100px" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Personalized greeting */}
        <h1>
          Good {getGreeting()}, {user?.firstName}!
        </h1>

        {/* Right section: clock + navigation links + user profile button */}
        <div className="d-flex align-items-center">
          <Clock /> {/* Displays current time */}
          <div className="ms-3">
            {/* Navigation links */}
            <Link className="btn btn-outline-light me-2" to="/home">
              Home
            </Link>
            <Link className="btn btn-outline-light me-2" to="/habits">
              Habits
            </Link>
            <Link className="btn btn-outline-light me-2" to="/add-habit">
              Add Habit
            </Link>
            <Link className="btn btn-outline-light me-2" to="/report">
              Report
            </Link>
            {/* User profile / sign-out button */}
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
