// Simple clock component displaying the current time
import React, { useState, useEffect } from "react";

const Clock = () => {
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
  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString();

  return (
    <div className="clockContainer" style={{ fontSize: "14px", color: "#fff" }}>
      <p>{formattedTime}</p>
      <p>{formattedDate}</p>
    </div>
  );
};

export default Clock;
