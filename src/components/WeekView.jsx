import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DayContainer from "./DayContainer";

const WeekView = ({ habits, onUpdateHabit }) => {
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
        <p>No week data available for this habit. Try refreshing.</p>
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
      <div className="row">
        {habit.week.map((day, index) => (
          <div key={`${habit.id}-${index}`} className="col-md-4">
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

