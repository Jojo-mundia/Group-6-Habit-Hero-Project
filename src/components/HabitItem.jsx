import React from "react";

const HabitItem = ({ habit, onDelete }) => {
  const navigate = useNavigate();

  const completedDays = habit.week.filter(
    (day) => completedDays.status === "done"
  ).length;
  const totalDays = habit.week.length;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      deleteHabitApi(habit.id)
        .then(() => {
          onDelete(habit.id);
        })
        .catch((error) => {
          console.error("Error deleting habit:", error);
          alert("Failed to delete.Check console for details.")
        });
    }
  };
};
