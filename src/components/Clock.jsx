import React, { useState, useEffect } from "react";

const Clock = () => {
<<<<<<< HEAD
  // useState hook: stores the current date/time
=======
>>>>>>> origin/main
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

<<<<<<< HEAD
    // Cleanup function to stop the interval when unmounted
    return () => clearInterval(interval);
  }, []);

  // Format the time and date for display
=======
    return () => clearInterval(interval);
  }, []);

>>>>>>> origin/main
  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString();

  return (
<<<<<<< HEAD
    <div
      className="clockContainer text-center mt-4"
      style={{ fontSize: "14px", color: "#fff" }}
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

export default Clock;