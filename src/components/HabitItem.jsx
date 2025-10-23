import React from "react";

const HabitItem = ({ habit, onDelete }) => {
  const navigate = useNavigate();

  const completedDays = habit.week.filter(
    (day) => completedDays.status === "done"
  ).length;
  const totalDays = habit.week.length;

  const handleDelete =() => {
    if (window.confirm("Are you sure you want to delete this habit?")){
      
    }
  }
};
