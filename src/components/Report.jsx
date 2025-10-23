import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react"; // Hook to get the currently logged-in user
import { fetchHabits } from "../api"; // API function to fetch all habits

const Report = () => {
  const { user } = useUser(); // Get the logged-in user's info
  const [habits, setHabits] = useState([]); // Store habits that belong to this user

