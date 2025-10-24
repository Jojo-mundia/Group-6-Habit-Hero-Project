import React, { useState } from "react";
import { addHabit } from "../api";

const AddHabitForm = ({ onAddHabit, userId }) => {
  const [name, setName] = useState("");

  const generateWeek = () => {
    const week = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      week.push({
        date: date.toISOString().split("T")[0],
        status: "notDone",
      });
    }
    return week;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newHabitData = {
      id: Date.now().toString(),
      name,
      week: generateWeek(),
      userId,
    };

    addHabit(newHabitData)
      .then((response) => {
        onAddHabit(response.data);
        setName("");
      })
      .catch((error) => {
        console.error("Error adding habit:", error);
        alert("Failed to add habit.");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add Habit</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Habit Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
