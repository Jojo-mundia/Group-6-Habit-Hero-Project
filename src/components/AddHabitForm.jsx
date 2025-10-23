import React, { useState } from "react";

const AddHabitForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Habit added:", name);
  };

  return (
    <div className="container mt-4">
      <h2>Add Habit</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Habit Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Habit
        </button>
      </form>
    </div>
  );
};

export default AddHabitForm;
