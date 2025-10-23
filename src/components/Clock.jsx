import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString();

  return (
    <div
      className="text-center mt-4"
      style={{ fontSize: "14px", color: "#fff" }}
    >
      <p>{formattedTime}</p>
      <p>{formattedDate}</p>
    </div>
  );
};

export default Clock;
