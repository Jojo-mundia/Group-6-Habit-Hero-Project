// Import React and the API function used to update habit data
import React from "react";
import { updateHabit } from "../api";

// Define the DayContainer component
// It receives props: habit (the full habit object), day (a single day's data),
// dayIndex (index of the day in the week), and onUpdateHabit (callback to refresh UI after update)
const DayContainer = ({ habit, day, dayIndex, onUpdateHabit }) => {
  // Get today’s date in ISO format ("YYYY-MM-DD")
  const today = new Date().toISOString().split("T")[0];

  // Check if the given day is in the future
  const isFuture = day.date > today;

  // Check if the given day is in the past (can be used for styling or logic)
  const isPast = day.date < today;

  // Function that handles marking a day's status (done / not done)
  const handleStatusChange = (status) => {
    // Prevent marking days in the future
    if (isFuture) {
      alert("You cannot mark future days!");
      return;
    }

    // Copy the current habit's week array to avoid mutating state directly
    const updatedWeek = [...habit.week];

    // Update the status for this specific day in the copied array
    updatedWeek[dayIndex].status = status;

    // Create a new habit object with the updated week data
    const updatedHabit = { ...habit, week: updatedWeek };

    // Call the API function to save the changes to the backend
    updateHabit(habit.id, updatedHabit)
      .then((response) => {
        // Once successful, call the parent’s onUpdateHabit to refresh the UI
        onUpdateHabit(response.data);
      })
      .catch((error) => {
        // Handle any errors during the update
        console.error("Error updating habit:", error);
        alert("Failed to update.");
      });
  };

  // Return the visual layout of the day container
  return (
    <div
      className="day-container p-3 border rounded text-center mb-2"
      style={{
        backgroundColor: "black", // Dark theme background
        color: "white", // White text for contrast
        opacity: isFuture ? 0.5 : 1, // Dim future dates to indicate they're disabled
      }}
    >
      {/* Display the weekday name (e.g., Monday, Tuesday, etc.) */}
      <h5>
        {new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })}
      </h5>

      {/* Display the actual date (e.g., 2025-10-23) */}
      <p>{day.date}</p>

      {/* Buttons to mark the day as Done or Not Done */}
      <div className="d-flex justify-content-around">
        {/* Mark as Done button */}
        <button
          className="btn btn-success me-2"
          onClick={() => handleStatusChange("done")}
          disabled={isFuture} // Disable if the date is in the future
        >
          Mark Done
        </button>

        {/* Mark as Not Done button */}
        <button
          className="btn btn-danger"
          onClick={() => handleStatusChange("notDone")}
          disabled={isFuture} // Disable if the date is in the future
        >
          Mark Not Done
        </button>
      </div>

      {/* Display the current status of this day */}
      <p>Status: {day.status === "done" ? "Done" : "Not Done"}</p>
    </div>
  );
};

// Export the component so it can be imported elsewhere
export default DayContainer;
