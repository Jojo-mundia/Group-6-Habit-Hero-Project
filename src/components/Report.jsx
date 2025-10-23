import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react"; // Hook to get the currently logged-in user
import { fetchHabits } from "../api"; // API function to fetch all habits

const Report = () => {
  const { user } = useUser(); // Get the logged-in user's info
  const [habits, setHabits] = useState([]); // Store habits that belong to this user

  // Fetch habits when the component loads or when user changes
  useEffect(() => {
    if (user) {
      fetchHabits()
        .then((response) => {
          // Only keep habits that belong to the current user
          const userHabits = response.data.filter(
            (habit) => habit.userId === user.id
          );
          setHabits(userHabits);
        })
        .catch((error) =>
          console.error("Error fetching habits for report:", error)
        );
    }
  }, [user]);

  /**
   * Function: getHabitStats
   * Purpose: Calculate habit statistics for reporting
   * - Count how many days were marked "done"
   * - Calculate completion percentage
   * - List dates when habit was completed
   */
  