// Form component for adding new habits to the user's list
import React, { useState } from "react";
import { addHabit } from "../api";

const AddHabitForm = ({ onAddHabit, userId }) => {
  // State to hold the habit name input
  const [name, setName] = useState("");

  // Function to generate a week array with dates starting from today
  const generateWeek = () => {
    const week = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      week.push({
        date: date.toISOString().split("T")[0], // Format as YYYY-MM-DD
        status: "notDone", // Default status for each day
      });
    }
    return week;
  };

  // Handle form submission to add a new habit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      // Create new habit data object
      const newHabitData = {
        id: Date.now().toString(), // Simple ID generation
        name,
        week: generateWeek(), // Generate the week data
        userId, // Associate with the current user
      };
      // Send to API and update local state on success
      addHabit(newHabitData)
        .then((response) => {
          onAddHabit(response.data);
          setName(""); // Clear the input
        })
        .catch((error) => {
          console.error("Error adding habit:", error);
          alert("Failed to add habit.");
        });
    }
  };

  return (
    <div className="addHabitContainer">
      <h2>Add New Habit</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label className="formLabel">Habit Name</label>
          <input
            type="text"
            className="formInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="addBtn">
          Add Habit
        </button>
      </form>
    </div>
  );
};

export default AddHabitForm;
