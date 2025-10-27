// Simple clock component displaying the current time
import React, { useState, useEffect } from "react";

// Clock component: displays the current time and date, updating every second
const Clock = () => {
  // useState hook: stores the current date/time
  const [time, setTime] = useState(new Date());

  // useEffect hook: sets up a timer that updates the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup function to stop the interval when unmounted
    return () => clearInterval(interval);
  }, []);

  // Format the time and date for display
  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString();

  // JSX returned for rendering
  return (
    <div
      className="clockContainer text-center mt-4"
      style={{ fontSize: "14px", color: "#fff" }}
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
