import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUser, SignIn } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import HabitList from "./components/HabitList";
import { fetchHabits } from "./api";

function App() {
  const { isSignedIn, user } = useUser();
  const [habits, setHabits] = useState([]);

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
  }, [isSignedIn, user]);

  if (!isSignedIn) {
    return (
      <div className="container mt-4 text-center">
        <SignIn />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/habits"
          element={<HabitList habits={habits} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
