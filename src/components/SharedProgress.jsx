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
        // Show all shares except the current user's own shares
        const otherShares = response.data.filter(
          (share) => share.userId !== user?.id
        );
        setShares(otherShares);
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
  }, [id, user?.id]);

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
    <div className="fullScreenWrapper">
      <div className="sharedProgressContainer">
        <div className="sharedProgressContent">
          <h2>Shared Progress for {habitName}</h2>
          <div className="sharesGrid">
            {shares.length > 0 ? (
              shares.map((share) => (
                <div key={share.id} className="shareItem">
                  <div className="shareHeader">
                    <h5>
                      {share.userName}'s Progress on {share.habitName}
                    </h5>
                    <div className="completionBadge">
                      {share.completion}% Complete
                    </div>
                  </div>
                  <p className="shareComment">
                    {share.comment || "No comment provided."}
                  </p>
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
                    {share.userId === user?.id && (
                      <button
                        className="deleteShareBtn"
                        onClick={() => handleDeleteShare(share.id)}
                      >
                        Delete Share
                      </button>
                    )}
                  </div>
                  <Chat shareId={share.id} />
                </div>
              ))
            ) : (
              <p>
                No shares available for this habit yet. Be the first to share
                your progress!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedProgress;
