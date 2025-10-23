import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DayContainer from "./DayContainer";

/**
 * WeekView Component
 * Displays the details of a single habit for the week.
 * Each "day" of the week is represented using the DayContainer component.
 * 
 * Props:
 * - habits: Array of habit objects passed from the parent component.
 * - onUpdateHabit: Function to update habit data when a change occurs in a day.
 */
const WeekView = ({ habits, onUpdateHabit }) => {
  // Extract the habit ID from the route parameters (e.g., /habits/:id)
  const { id } = useParams();

  // Hook for navigating programmatically (e.g., back to habits list)
  const navigate = useNavigate();

  // Find the habit that matches the ID from the URL
  // Convert both values to strings to avoid type mismatches
  const habit = habits.find((h) => h.id.toString() === id);

  // If the habit cannot be found (invalid ID), show an error message
  if (!habit) {
    return (
      <div className="container mt-4">
        <p>Habit not found. Go back to habits.</p>
      </div>
    );
  }

  // If the habit exists but doesn't have weekly data, show a different message
  if (!habit.week || habit.week.length === 0) {
    return (
      <div className="container mt-4">
        <p>No week data available for this habit. Try refreshing.</p>
      </div>
    );
  }

  // Main UI rendering for the habit's weekly view
  return (
    <div className="container mt-4">
      {/* Button to navigate back to the main habits list */}
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/habits")}
      >
        Back to Habits
      </button>

      {/* Display the name of the current habit */}
      <h2>Week View: {habit.name}</h2>

      {/* Render each day of the habit's week using the DayContainer component */}
      <div className="row">
        {habit.week.map((day, index) => (
          <div key={`${habit.id}-${index}`} className="col-md-4">
            <DayContainer
              habit={habit}           // Pass down the full habit object
              day={day}               // Data for the current day (e.g., completed or not)
              dayIndex={index}        // The day’s index in the week array
              onUpdateHabit={onUpdateHabit}  // Callback to update parent state
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;


