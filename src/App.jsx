import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="container mt-4">
              <h2>Welcome to Habit Tracker!</h2>
            </div>
          }
        />
        <Route
          path="/habits"
          element={<div className="container mt-4">Habits Page</div>}
        />
        <Route
          path="/report"
          element={<div className="container mt-4">Reports Page</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
