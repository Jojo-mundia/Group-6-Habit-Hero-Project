// Import React and necessary hooks
import React, { useState, useEffect } from "react";

// Clock component: displays the current time and date, updating every second
const Clock = () => {
  // State to hold the current date and time
  const [time, setTime] = useState(new Date());

  // useEffect runs after the component mounts
  useEffect(() => {
    // Create an interval that updates the 'time' state every 1 second
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup function: clears the interval when the component unmounts
    // This prevents unnecessary background processes (memory leaks)
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs only once when mounted

  // Format the time and date for display using the system’s locale
  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString();

  // JSX structure for displaying the formatted time and date
  return (
    <div className="clockContainer" style={{ fontSize: "14px", color: "#fff" }}>
      {/* Display the current time */}
      <p>{formattedTime}</p>

      {/* Display the current date */}
      <p>{formattedDate}</p>
    </div>
  );
};

// Export the component so it can be imported and used elsewhere
export default Clock;
