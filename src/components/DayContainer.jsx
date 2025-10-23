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

<div
  className="day-container p-3 border rounded text-center mb-2"
  style={{
    backgroundColor: "black",
    color: "white",
    opacity: isFuture ? 0.5 : 1,
  }}
>
  <h5>{new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })}</h5>
  <p>{day.date}</p>
  <div className="d-flex justify-content-around">
    <button
      className="btn btn-success me-2"
      onClick={() => handleStatusChange("done")}
      disabled={isFuture}
    >
      Mark Done
    </button>
    <button
      className="btn btn-danger"
      onClick={() => handleStatusChange("notDone")}
      disabled={isFuture}
    >
      Mark Not Done
    </button>
  </div>
</div>;

export default DayContainer;
