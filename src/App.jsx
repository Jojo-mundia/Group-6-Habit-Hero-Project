import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUser, SignIn } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";

function App() {
  const { isSignedIn, user } = useUser();

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
          element={
            <div className="container mt-4">
              <h2>Welcome, {user.firstName}!</h2>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
