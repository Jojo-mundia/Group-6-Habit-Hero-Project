import React from "react";
import { useParams } from "react-router-dom";

const WeekView = () => {
  const { id } = useParams();

  return (
    <div className="container mt-4">
      <h2>Week View for Habit ID: {id}</h2>
    </div>
  );
};

export default WeekView;
