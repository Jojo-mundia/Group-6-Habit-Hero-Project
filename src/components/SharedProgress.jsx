// Shows shared habit progress from other users, with chat and upvoting
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { fetchShares, addUpvote, updateShare, deleteShare } from "../api";
import Chat from "./Chat";

const SharedProgress = () => {
  // Grab current user
  const { user } = useUser();
  // Get habit ID from URL
  const { id } = useParams();
  // Holds the shared progress items
  const [shares, setShares] = useState([]);

  // Name of the habit being shown
  const [habitName, setHabitName] = useState("");

  // Load shares based on the ID - either all or for a specific habit
  useEffect(() => {
    fetchShares().then((response) => {
      if (id === "all") {
        setShares(response.data);
        setHabitName("All Habits");
      } else {
        // Just grab shares for this habit
        const filteredShares = response.data.filter(
          (share) => share.habitId === id
        );
        setShares(filteredShares);
        if (filteredShares.length > 0) {
          setHabitName(filteredShares[0].habitName);
        }
      }
    });
  }, [id]);

  // Upvotes are now part of the share object, no separate fetching needed

  const handleUpvote = (shareId) => {
    if (!user) return;
    const upvoteData = { id: Date.now().toString(), shareId, userId: user.id };
    addUpvote(upvoteData).then(() => {
      // Bump up the upvotes in the database
      const share = shares.find((s) => s.id === shareId);
      if (share) {
        const newUpvotes = (share.upvotes || 0) + 1;
        updateShare(shareId, { ...share, upvotes: newUpvotes }).then(() => {
          // Update our local list
          setShares(
            shares.map((s) =>
              s.id === shareId ? { ...s, upvotes: newUpvotes } : s
            )
          );
        });
      }
    });
  };

  const handleDeleteShare = (shareId) => {
    if (window.confirm("Are you sure you want to delete this share?")) {
      deleteShare(shareId).then(() => {
        setShares(shares.filter((share) => share.id !== shareId));
      });
    }
  };

  return (
    <div className="sharedProgressContainer">
      <h2>Shared Progress for {habitName}</h2>
      {shares.map((share) => (
        <div key={share.id} className="shareItem">
          <h5>
            {share.userName}'s Progress on {share.habitName}
          </h5>
          <p>Completion: {share.completion}%</p>
          <p>Comment: {share.comment}</p>
          <p>
            Upvotes: {share.upvotes || 0}{" "}
            <button
              className="upvoteBtn"
              onClick={() => handleUpvote(share.id)}
            >
              👍
            </button>
            {share.userId === user?.id && (
              <button
                className="deleteShareBtn"
                onClick={() => handleDeleteShare(share.id)}
              >
                Delete Share
              </button>
            )}
          </p>
          <Chat shareId={share.id} />
        </div>
      ))}
    </div>
  );
};

export default SharedProgress;
