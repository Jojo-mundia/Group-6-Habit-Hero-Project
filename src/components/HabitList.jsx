// Component for displaying a list of user's habits
import React from "react";
import HabitItem from "./HabitItem";

const HabitList = ({ habits, onDelete }) => {
  return (
    <div className="habitListContainer">
      <h2>Your Habits</h2>
      {/* Check if there are any habits */}
      {habits.length === 0 ? (
        <p>No habits yet. Add one!</p>
      ) : (
        // Render each habit using HabitItem component
        habits.map((habit) => (
          <HabitItem key={habit.id} habit={habit} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};

export default HabitList;
