import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteHabit as deleteHabitApi } from "../api"; // API call to delete habit

/**
 * HabitItem Component
 * Displays a single habit with its progress and action buttons
 */
const HabitItem = ({ habit, onDelete }) => {
  const navigate = useNavigate();

  // Calculate completed vs total days
  const completedDays = habit.week.filter(
    (day) => day.status === "done"
  ).length;
  const totalDays = habit.week.length;

  // Delete habit with confirmation
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      deleteHabitApi(habit.id)
        .then(() => onDelete(habit.id))
        .catch((error) => {
          console.error("Error deleting habit:", error);
          alert("Failed to delete habit. Check console for details.");
        });
    }
  };

  // Navigate to weekly habit view
  const handleWeekView = () => {
    navigate(`/week-view/${habit.id}`);
  };

  return (
    <div
      className="habit-item d-flex justify-content-between align-items-center p-3 border rounded mb-2"
      style={{ backgroundColor: "#1c1e29", color: "#fff" }}
    >
      {/* Habit name and progress */}
      <div>
        <i className="fas fa-hashtag"></i> {habit.name} - {completedDays}/
        {totalDays} days
      </div>

      {/* Action buttons */}
      <div>
        <button className="btn btn-outline-light me-2" onClick={handleWeekView}>
          <i className="fas fa-calendar"></i> Week View
        </button>
        <button className="btn btn-outline-danger" onClick={handleDelete}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default HabitItem;
