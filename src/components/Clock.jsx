// Simple clock component displaying the current time
import React, { useState, useEffect } from "react";

// Clock component: displays the current time and date, updating every second
const Clock = () => {
<<<<<<< HEAD
  // useState hook: stores the current date/time
  const [time, setTime] = useState(new Date());

  // useEffect hook: sets up a timer that updates the time every second
  useEffect(() => {
    // Start an interval that updates the time state once every 1000ms (1 second)
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup function: clears the interval when the component unmounts
    // This prevents memory leaks and ensures no background timers keep running
    return () => clearInterval(interval);
  }, []); // Empty dependency array → runs once when the component mounts

  // Format the time and date for display (uses system locale by default)
=======
  // State to hold the current time, updated every second
  const [time, setTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  // Format the time and date for display
>>>>>>> origin/main
  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString();

  // JSX returned for rendering
  return (
<<<<<<< HEAD
    <div
      className="text-center mt-4" // Tailwind CSS classes for layout
      style={{ fontSize: "14px", color: "#fff" }} // Inline styling for text size and color
    >
      {/* Display the current time */}
      <p>{formattedTime}</p>

      {/* Display the current date */}
=======
    <div className="clockContainer" style={{ fontSize: "14px", color: "#fff" }}>
      <p>{formattedTime}</p>
>>>>>>> origin/main
      <p>{formattedDate}</p>
    </div>
  );
};

// Export the component so it can be imported and used in other files
export default Clock;
