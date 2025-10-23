import React from "react";

const AddHabitForm = () => {
  return (
    <div className="container mt-4">
      <h2>Add Habit</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Habit Name</label>
          <input type="text" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Habit
        </button>
      </form>
    </div>
  );
};

export default AddHabitForm;
