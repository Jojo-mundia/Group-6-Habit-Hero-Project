import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const WeekView = ({ habits }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const habit = habits.find((h) => h.id.toString() === id);

  if (!habit) {
    return (
      <div className="container mt-4">
        <p>Habit not found. Go back to habits.</p>
      </div>
    );
  }

  if (!habit.week || habit.week.length === 0) {
    return (
      <div className="container mt-4">
        <button
          className="btn btn-secondary mb-3"
          onClick={() => navigate("/habits")}
        >
          Back to Habits
        </button>
        <p>No week data available for this habit.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/habits")}
      >
        Back to Habits
      </button>
      <h2>Week View: {habit.name}</h2>
    </div>
  );
};

export default WeekView;
