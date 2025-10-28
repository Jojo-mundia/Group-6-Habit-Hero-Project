// Component to display shared habit progress from other users, including chat and upvoting features
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { fetchShares, addUpvote, updateShare, deleteShare } from "../api";
import Chat from "./Chat";

const SharedProgress = () => {
  // Get the current authenticated user
  const { user } = useUser();
  // Extract habit ID from the URL parameters
  const { id } = useParams();
  // State to store the list of shared progress items
  const [shares, setShares] = useState([]);
  // State for the name of the habit being displayed
  const [habitName, setHabitName] = useState("");

  // Effect to load shares when the component mounts or ID changes
  useEffect(() => {
    console.log("ID from params:", id);
    fetchShares()
      .then((response) => {
        console.log("Fetched shares:", response.data);
        // If viewing all habits, show all shares
        if (id === "all") {
          setShares(response.data);
          setHabitName("All Habits");
        } else {
          // Filter shares for the specific habit
          const filteredShares = response.data.filter(
            (share) => share.habitId === id
          );
          setShares(filteredShares);
          // Set habit name from the first share if available
          if (filteredShares.length > 0) {
            setHabitName(filteredShares[0].habitName);
          }
        }
        console.log("Shares set to:", shares);
      })
      .catch((error) => {
        console.error("Error fetching shares:", error);
      });
  }, [id]); // Dependency on id to refetch when it changes

  // Function to handle upvoting a share
  const handleUpvote = (shareId) => {
    if (!user) return; // Ensure user is logged in
    const upvoteData = { id: Date.now().toString(), shareId, userId: user.id };
    addUpvote(upvoteData).then(() => {
      // Find the share and increment upvotes
      const share = shares.find((s) => s.id === shareId);
      if (share) {
        const newUpvotes = (share.upvotes || 0) + 1;
        updateShare(shareId, { ...share, upvotes: newUpvotes }).then(() => {
          // Update local state with new upvote count
          setShares(
            shares.map((s) =>
              s.id === shareId ? { ...s, upvotes: newUpvotes } : s
            )
          );
        });
      }
    });
  };

  // Function to handle deleting a share
  const handleDeleteShare = (shareId) => {
    if (window.confirm("Are you sure you want to delete this share?")) {
      deleteShare(shareId).then(() => {
        // Remove the share from local state
        setShares(shares.filter((share) => share.id !== shareId));
      });
    }
  };

  return (
    // Full-screen wrapper to cover entire viewport
    <div className="fullScreenWrapper">
      {/* Container with background image and overlay */}
      <div className="sharedProgressContainer">
        {/* Content area with glassmorphism effect */}
        <div className="sharedProgressContent">
          {/* Page title */}
          <h2>Shared Progress for {habitName}</h2>
          {/* Grid layout for shared items */}
          <div className="sharesGrid">
            {shares.map((share) => (
              <div key={share.id} className="shareItem">
                {/* Header with user name and completion badge */}
                <div className="shareHeader">
                  <h5>
                    {share.userName}'s Progress on {share.habitName}
                  </h5>
                  <div className="completionBadge">
                    {share.completion}% Complete
                  </div>
                </div>
                {/* User's comment */}
                <p className="shareComment">{share.comment}</p>
                {/* Actions: upvote and delete buttons */}
                <div className="shareActions">
                  <div className="upvoteSection">
                    <span>Upvotes: {share.upvotes || 0}</span>
                    <button
                      className="upvoteBtn"
                      onClick={() => handleUpvote(share.id)}
                    >
                      👍
                    </button>
                  </div>
                  {/* Show delete button only for the share owner */}
                  {share.userId === user?.id && (
                    <button
                      className="deleteShareBtn"
                      onClick={() => handleDeleteShare(share.id)}
                    >
                      Delete Share
                    </button>
                  )}
                </div>
                {/* Chat component for this share */}
                <Chat shareId={share.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedProgress;
