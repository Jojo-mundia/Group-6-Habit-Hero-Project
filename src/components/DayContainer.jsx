import React from "react";
import { updateHabit } from "../api";

const DayContainer = ({ habit, day, dayIndex, onUpdateHabit }) => {
  const today = new Date().toISOString().split("T")[0]; // Current date
  const isFuture = day.date > today; // Disable if future
  const isPast = day.date < today; // Allow editing past days

  return (
    <div className="day-container p-3 border rounded text-center mb-2">
      <h5>
        {new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })}
      </h5>
      <p>{day.date}</p>
    </div>
  );
};

const handleStatusChange = (status) => {
  if (isFuture) {
    alert("You cannot mark future days!");
    return;
  }
  const updatedWeek = [...habit.week];
  updatedWeek[dayIndex].status = status;
  const updatedHabit = { ...habit, week: updatedWeek };

  updateHabit(habit.id, updatedHabit)
    .then((response) => {
      onUpdateHabit(response.data);
    })
    .catch((error) => {
      console.error("Error updating habit:", error);
      alert("Failed to update.");
    });
};

export default DayContainer;
