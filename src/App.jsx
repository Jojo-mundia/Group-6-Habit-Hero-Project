import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUser, SignIn } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import HabitList from "./components/HabitList";
import WeekView from "./components/WeekView";
import AddHabitForm from "./components/AddHabitForm";
import Report from "./components/Report";
import Clock from "./components/Clock";
import { fetchHabits } from "./api";

function App() {
  const { isSignedIn, user } = useUser();
  const [habits, setHabits] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    if (isSignedIn && user) {
      fetchHabits()
        .then((response) => {
          const userHabits = response.data.filter(
            (habit) => habit.userId === user.id
          );
          setHabits(userHabits);
        })
        .catch((error) => console.error("Error fetching habits:", error));
    }
  }, [isSignedIn, user, forceUpdate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setForceUpdate((prev) => prev + 1);
    }, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  const handleAddHabit = (newHabit) => setHabits([...habits, newHabit]);
  const handleUpdateHabit = (updatedHabit) =>
    setHabits(habits.map((h) => (h.id === updatedHabit.id ? updatedHabit : h)));
  const handleDeleteHabit = (id) => setHabits(habits.filter((h) => h.id !== id));

  if (!isSignedIn) {
    return (
      <div
        className="container mt-4 text-center"
        style={{
          backgroundColor: "#1c1e29",
          color: "#fff",
          minHeight: "100vh",
        }}
      >
        <h1>Welcome to Habit Tracker</h1>
        <p>Please sign in to access your dashboard.</p>
        <SignIn />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<div className="container mt-4"><h2>Welcome, {user.firstName}!</h2></div>}
        />
        <Route
          path="/habits"
          element={<HabitList habits={habits} onDelete={handleDeleteHabit} />}
        />
        <Route
          path="/add-habit"
          element={<AddHabitForm onAddHabit={handleAddHabit} userId={user.id} />}
        />
        <Route
          path="/week-view/:id"
          element={<WeekView habits={habits} onUpdateHabit={handleUpdateHabit} />}
        />
        <Route path="/report" element={<Report />} />
      </Routes>
      <Clock />
    </BrowserRouter>
  );
}

export default App;

