import React from "react";

const Clock = () => {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString();
  const formattedDate = now.toLocaleDateString();

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
