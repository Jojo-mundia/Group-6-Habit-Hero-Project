import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUser, SignIn } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import HabitList from "./components/HabitList";
import AddHabitForm from "./components/AddHabitForm";
import WeekView from "./components/WeekView";
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
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAddHabit = (newHabit) => setHabits([...habits, newHabit]);
  const handleUpdateHabit = (updatedHabit) =>
    setHabits(habits.map((h) => (h.id === updatedHabit.id ? updatedHabit : h)));
  const handleDeleteHabit = (id) => setHabits(habits.filter((h) => h.id !== id));

  if (!isSignedIn)
    return (
      <div className="container mt-4 text-center">
        <SignIn />
      </div>
    );

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/habits"
          element={<HabitList habits={habits} onDelete={handleDeleteHabit} />}
        />
        <Route
          path="/add-habit"
          element={
            <AddHabitForm onAddHabit={handleAddHabit} userId={user.id} />
          }
        />
        <Route
          path="/week-view/:id"
          element={
            <WeekView habits={habits} onUpdateHabit={handleUpdateHabit} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
