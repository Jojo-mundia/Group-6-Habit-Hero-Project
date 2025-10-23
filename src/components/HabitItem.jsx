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
          alert("Failed to delete.Check console for details.");
        });
    }
  };

  const handleWeekView = () => {
    navigate(`/week-view/${habit.id}`);
  };

  return (
    <div
      className="habit-item d-flex justify-content-between align-items-center p-3 border rounded mb-2"
      style={{ backgroundColor: "#1c1e29", color: "#fff" }}
    >
      <div>
        <i className="fas fa-hashtag"></i> {habit.name} - {completedDays}/
        {habit.week.length} days
      </div>
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