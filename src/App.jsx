import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container mt-4">
              <h2>Welcome to Habit Tracker!</h2>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
