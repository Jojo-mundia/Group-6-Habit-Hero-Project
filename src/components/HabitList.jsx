// Component for displaying a list of user's habits as cards
import React from "react";
import HabitItem from "./HabitItem";
import "./HabitList.css";

const HabitList = ({ habits, onDelete }) => {
  return (
    <div className="habitListContainer">
      <h2>Your Habits</h2>
      {/* Check if there are any habits */}
      {habits.length === 0 ? (
        <p className="noHabits">No habits yet. Add one!</p>
      ) : (
        // Render habits in a grid layout
        <div className="habitGrid">
          {habits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitList;
