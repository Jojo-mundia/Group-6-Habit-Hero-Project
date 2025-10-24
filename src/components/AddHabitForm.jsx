import React, { useState } from "react";
import { addHabit } from "../api";

// Component for adding a new habit
// Receives two props:
// - onAddHabit: a callback function to update the list of habits in the parent component
// - userId: the ID of the currently logged-in user
const AddHabitForm = ({ onAddHabit, userId }) => {
  // Local state to store the name of the new habit
  const [name, setName] = useState("");

  // Function to generate a 7-day "week" starting from today
  // Each day includes a date and a default status of "notDone"
  const generateWeek = () => {
    const week = [];
    const today = new Date();

    // For debugging purposes, log today's date
    console.log("Today's date:", today.toISOString().split("T")[0]);

    // Create 7 days starting from today
    for (let i = 0; i < 7; i++) {
      // Clone today's date to avoid mutating it
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Push the formatted date and status into the array
      week.push({
        date: date.toISOString().split("T")[0],
        status: "notDone",
      });
    }
    return week;
  };

  // Handle form submission when the user clicks "Add Habit"
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page

    // Only proceed if the input is not empty
    if (name.trim()) {
      // Create a new habit object with a unique ID and 7-day week data
      const newHabitData = {
        id: Date.now().toString(), // Use timestamp as a simple unique ID
        name, // Habit name entered by the user
        week: generateWeek(), // Automatically generate the week's data
        userId, // Associate this habit with the current user
      };

      // Send the new habit to the backend API
      addHabit(newHabitData)
        .then((response) => {
          // Notify parent component of the new habit
          onAddHabit(response.data);

          // Clear the input field after successful submission
          setName("");
        })
        .catch((error) => {
          // Handle any errors that occur during the API request
          console.error("Error adding habit:", error);
          alert("Failed to add habit. Please try again.");
        });
    }
  };

  // Render the form for adding a new habit
  return (
    <div className="container mt-4">
      <h2>Add New Habit</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Habit Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required // Makes the input field mandatory
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Habit
        </button>
      </form>
    </div>
  );
};

export default AddHabitForm;
