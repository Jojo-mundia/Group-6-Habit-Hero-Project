import React, { useState, useEffect } from "react";

// Clock component: displays the current time and date, updating every second
const Clock = () => {
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
  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString();

  // JSX returned for rendering
  return (
    <div
      className="text-center mt-4" // Tailwind CSS classes for layout
      style={{ fontSize: "14px", color: "#fff" }} // Inline styling for text size and color
    >
      {/* Display the current time */}
      <p>{formattedTime}</p>

      {/* Display the current date */}
      <p>{formattedDate}</p>
    </div>
  );
};

// Export the component so it can be imported and used in other files
export default Clock;
