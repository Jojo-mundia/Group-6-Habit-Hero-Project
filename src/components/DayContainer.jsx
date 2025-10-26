// Component for displaying and updating individual days in a habit's week view
import React from "react";
import { updateHabit } from "../api";

const DayContainer = ({ habit, day, dayIndex, onUpdateHabit }) => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  // Check if the day is in the future
  const isFuture = day.date > today;

  // Handle changing the status of a day (done/notDone)
  const handleStatusChange = (status) => {
    if (isFuture) {
      alert("You cannot mark future days!");
      return;
    }
    // Create a copy of the week and update the specific day's status
    const updatedWeek = [...habit.week];
    updatedWeek[dayIndex].status = status;
    const updatedHabit = { ...habit, week: updatedWeek };
    // Send update to API
    updateHabit(habit.id, updatedHabit)
      .then((response) => {
        onUpdateHabit(response.data); // Update parent state
      })
      .catch((error) => {
        console.error("Error updating habit:", error);
        alert("Failed to update.");
      });
  };

  return (
    <div
      className="dayContainer"
      style={{
        backgroundColor: "#1c1e29",
        color: "#fff",
        opacity: isFuture ? 0.5 : 1, // Dim future days
      }}
    >
      {/* Display the day of the week */}
      <h5>
        {new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })}
      </h5>
      {/* Display the date */}
      <p>{day.date}</p>
      {/* Buttons to mark as done or not done */}
      <div className="dayButtons">
        <button
          className="markDoneBtn"
          onClick={() => handleStatusChange("done")}
          disabled={isFuture}
        >
          Mark Done
        </button>
        <button
          className="markNotDoneBtn"
          onClick={() => handleStatusChange("notDone")}
          disabled={isFuture}
        >
          Mark Not Done
        </button>
      </div>
      {/* Display current status */}
      <p>Status: {day.status === "done" ? "Done" : "Not Done"}</p>
    </div>
  );
};

export default DayContainer;
