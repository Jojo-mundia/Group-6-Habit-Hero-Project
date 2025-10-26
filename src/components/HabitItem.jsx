// Component for displaying individual habits in the list with options to view week, share, or delete
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { deleteHabit as deleteHabitApi, addShare } from "../api";

const HabitItem = ({ habit, onDelete }) => {
  // Navigation hook for routing
  const navigate = useNavigate();
  // Get current user from Clerk
  const { user } = useUser();
  // State for controlling the share modal visibility
  const [showShareModal, setShowShareModal] = useState(false);
  // State for the share comment input
  const [shareComment, setShareComment] = useState("");

  // Calculate the number of completed days
  const completedDays = habit.week.filter(
    (day) => day.status === "done"
  ).length;

  // Handle deleting the habit
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      deleteHabitApi(habit.id)
        .then(() => {
          onDelete(habit.id); // Update parent state
        })
        .catch((error) => {
          console.error("Error deleting habit:", error);
          alert("Failed to delete.");
        });
    }
  };

  // Navigate to the week view for this habit
  const handleWeekView = () => {
    navigate(`/week-view/${habit.id}`);
  };

  // Navigate to the shared progress view for this habit
  const handleShareView = () => {
    navigate(`/shared-progress/${habit.id}`);
  };

  // Handle sharing the habit progress publicly
  const handleShare = () => {
    if (!shareComment.trim()) return; // Don't share without a comment
    const completion = Math.round((completedDays / habit.week.length) * 100);
    const shareData = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.firstName || "Anonymous",
      habitId: habit.id,
      habitName: habit.name,
      completion,
      comment: shareComment,
      createdAt: new Date().toISOString(),
    };
    // Send share data to API
    addShare(shareData)
      .then(() => {
        alert("Habit progress shared publicly!");
        setShareComment(""); // Clear comment
        setShowShareModal(false); // Close modal
      })
      .catch((error) => console.error("Error sharing:", error));
  };

  return (
    <div className="habitItem">
      {/* Display habit name and completion */}
      <div>
        {habit.name} - {completedDays}/{habit.week.length} days
      </div>
      {/* Action buttons */}
      <div>
        <button className="weekViewBtn" onClick={handleWeekView}>
          Week View
        </button>
        <button className="viewSharesBtn" onClick={handleShareView}>
          View Shares
        </button>
        <button className="shareBtn" onClick={() => setShowShareModal(true)}>
          Share
        </button>
        <button className="deleteBtn" onClick={handleDelete}>
          Delete
        </button>
      </div>
      {/* Share modal */}
      {showShareModal && (
        <div className="shareModal">
          <div className="modalDialog">
            <div className="modalContent">
              <div className="modalHeader">
                <h5 className="modalTitle">Share Progress for {habit.name}</h5>
                <button
                  type="button"
                  className="closeBtn"
                  onClick={() => setShowShareModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="modalBody">
                <p>
                  Current completion:{" "}
                  {Math.round((completedDays / habit.week.length) * 100)}%
                </p>
                <textarea
                  className="commentInput"
                  placeholder="Add a comment about your progress..."
                  value={shareComment}
                  onChange={(e) => setShareComment(e.target.value)}
                />
              </div>
              <div className="modalFooter">
                <button
                  type="button"
                  className="cancelBtn"
                  onClick={() => setShowShareModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="submitBtn"
                  onClick={handleShare}
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitItem;
