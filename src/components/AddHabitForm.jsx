// Form component for adding new habits to the user's list
import React, { useState, useEffect } from "react";
import { addHabit } from "../api";

// Array of background images for motivational, cycling backgrounds (new addition for dynamic UX)
const backgroundImages = [
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    alt: "Person running on a trail",
  },
  {
    src: "https://images.unsplash.com/photo-1541625602330-2277a1c99ce5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    alt: "Person riding a bicycle",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    alt: "Person doing yoga",
  },
  {
    src: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    alt: "Person swimming",
  },
  {
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    alt: "Person hiking",
  },
];

const AddHabitForm = ({ onAddHabit, userId }) => {
  // State to hold the habit name input
  const [name, setName] = useState("");
  // New states for loading, error, and success feedback to improve UX (prevents confusion during submission)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  // New state for cycling background images (tracks current image index for dynamic backgrounds)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // New effect to cycle background images every 7 seconds for motivational visual transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 7000); // 7 seconds for a relaxed pace
    return () => clearInterval(interval); // Cleanup on unmount to avoid memory leaks
  }, []);

  // Function to generate a week array with dates starting from today
  const generateWeek = () => {
    const week = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      week.push({
        date: date.toISOString().split("T")[0], // Format as YYYY-MM-DD
        status: "notDone", // Default status for each day
      });
    }
    return week;
  };

  // Handle form submission to add a new habit (updated with async handling, validation, and feedback states)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors (new: improves UX by resetting on retry)
    setSuccess(false); // Reset success state (new: ensures clean feedback)

    const trimmedName = name.trim(); // New: Trim whitespace for better input handling
    if (!trimmedName) {
      setError("Habit name cannot be empty."); // New: Immediate validation feedback
      return;
    }

    setIsLoading(true); // New: Show loading state to prevent multiple submissions
    try {
      // Create new habit data object
      const newHabitData = {
        id: Date.now().toString(), // Simple ID generation
        name: trimmedName, // Updated: Use trimmed name
        week: generateWeek(), // Generate the week data
        userId, // Associate with the current user
      };
      // Send to API and update local state on success
      const response = await addHabit(newHabitData); // Updated: Use async/await for cleaner promise handling
      onAddHabit(response.data);
      setName(""); // Clear the input
      setSuccess(true); // New: Show success message briefly
      setTimeout(() => setSuccess(false), 3000); // New: Auto-hide success after 3 seconds
    } catch (error) {
      console.error("Error adding habit:", error);
      setError("Failed to add habit. Please try again."); // New: User-friendly error message
    } finally {
      setIsLoading(false); // New: Reset loading state
    }
  };

  return (
    <div
      className="formOverlay"
      style={{
        backgroundImage: `url(${backgroundImages[currentImageIndex].src})`,
      }} // Dynamic background image for motivational visuals
      aria-label={`Background image: ${backgroundImages[currentImageIndex].alt}`} // Accessibility label for screen readers
    >
      <h2>Add New Habit</h2>
      <form onSubmit={handleSubmit} noValidate>
        {" "}
        {/* Added noValidate for custom validation */}
        <div className="formGroup">
          <label htmlFor="habitName" className="formLabel">
            {" "}
            {/* Added htmlFor for accessibility */}
            Habit Name
          </label>
          <input
            id="habitName" // ID for label association
            type="text"
            className={`formInput ${error ? "formInput--error" : ""}`} // Conditional error class
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError(""); // Clear error on typing for better UX
            }}
            placeholder="e.g., Drink 8 glasses of water" // Placeholder for user guidance
            required
            aria-describedby={error ? "errorMessage" : undefined} // ARIA for error association
            disabled={isLoading} // Disable input during loading
          />
          {error && ( // Conditional error display
            <p id="errorMessage" className="formError" role="alert">
              {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="addBtn"
          disabled={isLoading || !name.trim()}
        >
          {" "}
          {/* Disable if loading or empty */}
          {isLoading ? ( // Loading state with spinner
            <>
              <span className="spinner" aria-hidden="true"></span> Adding...
            </>
          ) : (
            "Add Habit"
          )}
        </button>
        {success && ( // Success feedback
          <p className="formSuccess" role="status">
            Habit added successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default AddHabitForm;
