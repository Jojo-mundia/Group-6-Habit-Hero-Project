// Main App component handling routing, authentication, and state management for the habit tracker
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUser, SignIn } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import HabitList from "./components/HabitList";
import WeekView from "./components/WeekView";
import AddHabitForm from "./components/AddHabitForm";
import Report from "./components/Report"; // Import Report component
import Clock from "./components/Clock";
import { fetchHabits } from "./api";
import SharedProgress from "./components/SharedProgress";

function App() {
  // Get user authentication status and user data from Clerk
  const { isSignedIn, user } = useUser();
  // State to store the user's habits
  const [habits, setHabits] = useState([]);
  // State to force re-fetching habits periodically
  const [forceUpdate, setForceUpdate] = useState(0);

  // Fetch habits when user signs in or when forceUpdate changes
  useEffect(() => {
    if (isSignedIn && user) {
      fetchHabits()
        .then((response) => {
          // Filter habits to only show the current user's habits
          const userHabits = response.data.filter(
            (habit) => habit.userId === user.id
          );
          setHabits(userHabits);
        })
        .catch((error) => console.error("Error fetching habits:", error));
    } else {
      // Clear habits if user is not signed in
      setHabits([]);
    }
  }, [isSignedIn, user, forceUpdate]);

  // Set up an interval to auto-refresh habits every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setForceUpdate((prev) => prev + 1);
    }, 60000); // Auto-update every 60 seconds
    return () => clearInterval(interval);
  }, []);

  // Handler to add a new habit to the state
  const handleAddHabit = (newHabit) => {
    setHabits([...habits, newHabit]);
  };

  // Handler to update an existing habit in the state
  const handleUpdateHabit = (updatedHabit) => {
    setHabits(habits.map((h) => (h.id === updatedHabit.id ? updatedHabit : h)));
  };

  // Handler to delete a habit from the state
  const handleDeleteHabit = (id) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  // If user is not signed in, show the sign-in page
  if (!isSignedIn) {
    return (
      <div className="signinContainer">
        <h1>Welcome to Habit Tracker</h1>
        <p>Please sign in to access your dashboard.</p>
        <SignIn />
      </div>
    );
  }

  // Main app layout with routing
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Home page route */}
        <Route
          path="/"
          element={
            <div className="welcomeContainer">
              <h2>Welcome, {user.firstName}!</h2>
            </div>
          }
        />
        {/* Another home route for consistency */}
        <Route
          path="/home"
          element={
            <div className="welcomeContainer">
              <h2>Welcome, {user.firstName}!</h2>
            </div>
          }
        />
        {/* Habits list page */}
        <Route
          path="/habits"
          element={<HabitList habits={habits} onDelete={handleDeleteHabit} />}
        />
        {/* Add new habit page */}
        <Route
          path="/add-habit"
          element={
            <AddHabitForm onAddHabit={handleAddHabit} userId={user.id} />
          }
        />
        {/* Week view for a specific habit */}
        <Route
          path="/week-view/:id"
          element={
            <WeekView habits={habits} onUpdateHabit={handleUpdateHabit} />
          }
        />
        {/* Report page */}
        <Route path="/report" element={<Report />} />
        {/* Shared progress page */}
        <Route path="/shared-progress/:id" element={<SharedProgress />} />
      </Routes>
      <Clock />
    </BrowserRouter>
  );
}

export default App;
