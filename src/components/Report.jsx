import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react"; // For user ID
import { fetchHabits } from "../api";

const Report = () => {
  // Add class to body for full-page background
  useEffect(() => {
    document.body.classList.add("report-page");
    return () => {
      document.body.classList.remove("report-page");
    };
  }, []);
  // Get current user from Clerk authentication
  const { user } = useUser();

  // State to store the list of habits fetched for the current user
  const [habits, setHabits] = useState([]);

  // Fetch habits when the user is available (runs on component mount or when user changes)
  useEffect(() => {
    if (user) {
      // Call the API to fetch all habits, then filter to only include those belonging to the current user
      fetchHabits()
        .then((response) => {
          const userHabits = response.data.filter((h) => h.userId === user.id);
          setHabits(userHabits);
        })
        .catch((error) =>
          console.error("Error fetching habits for report:", error)
        );
    } else {
      // If no user is logged in, clear the habits list
      setHabits([]);
    }
  }, [user]); // Dependency array: re-run when user changes

  // Helper function to calculate the overall completion percentage across all habits for the week
  const getOverallStats = () => {
    // Sum up completed days across all habits
    const totalCompleted = habits.reduce(
      (sum, h) => sum + h.week.filter((d) => d.status === "done").length,
      0
    );
    // Sum up total days across all habits
    const totalDays = habits.reduce((sum, h) => sum + h.week.length, 0);
    // Calculate percentage, rounding to nearest whole number; avoid division by zero
    return totalDays > 0 ? Math.round((totalCompleted / totalDays) * 100) : 0;
  };

  // Helper function to get an emoji icon based on habit name (for visual appeal in cards)
  // You can expand this object with more habit types and icons as needed
  const getHabitIcon = (habitName) => {
    const icons = {
      Exercise: "🏃",
      Reading: "📖",
      Meditation: "🧘",
      default: "📅", // Fallback icon for unknown habits
    };
    return icons[habitName] || icons.default;
  };

  // Calculate overall percentage once for use in rendering
  const overallPercentage = getOverallStats();

  // Get the current date and format it as a readable string (e.g., "October 10, 2023")
  // This will display the date when the component renders, without affecting other logic
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="reportContainer">
      {/* Header section displaying the report title, current date with calendar icon, and overall stats */}
      <div className="reportHeader">
        <h2>This Week's Habit Report</h2>
        {/* Display current date with a calendar icon for context */}
        <p className="currentDate">
          <span className="calendarIcon">📅</span> {currentDate}
        </p>
        <div className="overallStats">
          {/* Circular progress indicator for overall completion */}
          <div
            className="circularProgress"
            style={{ "--percentage": overallPercentage }}
          >
            <div className="circularProgressInner">
              <span className="percentageText">{overallPercentage}%</span>
            </div>
          </div>
          <p>Overall Completion This Week</p>
        </div>
      </div>

      {/* List of habit cards; shows a message if no habits exist */}
      <div className="habitsList">
        {habits.length === 0 ? (
          <p className="noHabits">
            No habits to report yet. Start building some!
          </p>
        ) : (
          habits.map((habit) => {
            // For each habit, calculate completion stats
            const completedDays = habit.week.filter(
              (day) => day.status === "done"
            ).length;
            const totalDays = habit.week.length;
            const completion =
              totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

            return (
              <div
                key={habit.id}
                className="habitCard"
                role="article"
                aria-labelledby={`habit-${habit.id}`}
              >
                {/* Habit card header with icon and name */}
                <div className="habitHeader">
                  <span className="habitIcon">{getHabitIcon(habit.name)}</span>
                  <h3 id={`habit-${habit.id}`}>{habit.name}</h3>
                </div>
                {/* Progress bar showing completion visually */}
                <div className="progressBar">
                  <div
                    className="progressFill"
                    style={{ width: `${completion}%` }}
                    aria-valuenow={completion}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                {/* Stats showing completed days and percentage */}
                <div className="habitStats">
                  <span>
                    {completedDays} / {totalDays} days completed
                  </span>
                  <span>{completion}%</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Report;
