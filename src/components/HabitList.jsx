import React from "react"; // Import React library to use JSX
import HabitItem from "./HabitItem"; // Import the HabitItem component to display individual habits

// Functional component that displays a list of habits
const HabitList = ({ habits, onDelete }) => {
  return (
    <div className="container mt-4">
      {/* Section title */}
      <h2>Your Habits</h2>

      {/* Check if there are any habits */}
      {habits.length === 0 ? (
        // If no habits exist, show a message
        <p>No habits yet. Add one!</p>
      ) : (
        // If habits exist, loop through and display each one
        habits.map((habit) => (
          // HabitItem component shows each habit’s details and allows deletion
          <HabitItem key={habit.id} habit={habit} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};

export default HabitList; // Export the component so it can be used in other files
