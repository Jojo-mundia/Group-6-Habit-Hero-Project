// Component for displaying a report of user's habit completion statistics
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react"; // For user ID
import { fetchHabits } from "../api";

const Report = () => {
  // Get current user from Clerk
  const { user } = useUser();
  // State to store user's habits
  const [habits, setHabits] = useState([]);

  // Fetch habits when user is available
  useEffect(() => {
    if (user) {
      fetchHabits()
        .then((response) => {
          // Filter to only show current user's habits
          const userHabits = response.data.filter((h) => h.userId === user.id);
          setHabits(userHabits);
        })
        .catch((error) =>
          console.error("Error fetching habits for report:", error)
        );
    } else {
      setHabits([]);
    }
  }, [user]);

  // Calculate overall completion percentage across all habits
  const getOverallStats = () => {
    const totalCompleted = habits.reduce(
      (sum, h) => sum + h.week.filter((d) => d.status === "done").length,
      0
    );
    const totalDays = habits.reduce((sum, h) => sum + h.week.length, 0);
    return totalDays > 0 ? Math.round((totalCompleted / totalDays) * 100) : 0;
  };

  return (
    <div className="reportContainer">
      <h2>This Week's Habit Report</h2>
      {/* Display overall completion */}
      <p>Overall Completion This Week: {getOverallStats()}%</p>
      {/* Table showing detailed stats for each habit */}
      <table className="reportTable">
        <thead>
          <tr>
            <th>Habit Name</th>
            <th>Completed / Total (This Week)</th>
            <th>Completion %</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => {
            // Calculate stats for each habit
            const completedDays = habit.week.filter(
              (day) => day.status === "done"
            ).length;
            const totalDays = habit.week.length;
            const completion =
              totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
            return (
              <tr key={habit.id}>
                <td>{habit.name}</td>
                <td>
                  {completedDays} / {totalDays}
                </td>
                <td>{completion}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
