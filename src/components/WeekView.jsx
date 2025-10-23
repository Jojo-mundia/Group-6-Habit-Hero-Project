import React from "react";
import { useParams } from "react-router-dom";

const WeekView = ({ habits }) => {
  const { id } = useParams();
  const habit = habits.find((h) => h.id.toString() === id);

  if (!habit) {
    return (
      <div className="container mt-4">
        <p>Habit not found. Go back to habits.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Week View: {habit.name}</h2>
    </div>
  );
};

export default WeekView;
