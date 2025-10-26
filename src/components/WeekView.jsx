// Component for displaying a detailed week view of a specific habit with day-by-day status
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DayContainer from "./DayContainer";

const WeekView = ({ habits, onUpdateHabit }) => {
  // Get the habit ID from URL params
  const { id } = useParams();
  // Navigation hook for routing
  const navigate = useNavigate();
  // Find the specific habit by ID
  const habit = habits.find((h) => h.id === id);

  // If habit not found, show error message
  if (!habit) {
    return (
      <div className="errorContainer">
        <p>Habit not found. Go back to habits.</p>
      </div>
    );
  }

  // If no week data, show message
  if (!habit.week || habit.week.length === 0) {
    return (
      <div className="noDataContainer">
        <p>No week data available for this habit. Try refreshing.</p>
      </div>
    );
  }

  return (
    <div className="weekViewContainer">
      {/* Back button to habits list */}
      <button className="backButton" onClick={() => navigate("/habits")}>
        Back to Habits
      </button>
      <h2>Week View: {habit.name}</h2>
      <div className="weekGrid">
        {/* Render each day in the week */}
        {habit.week.map((day, index) => (
          <div key={`${habit.id}-${index}`} className="weekColumn">
            <DayContainer
              habit={habit}
              day={day}
              dayIndex={index}
              onUpdateHabit={onUpdateHabit}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
