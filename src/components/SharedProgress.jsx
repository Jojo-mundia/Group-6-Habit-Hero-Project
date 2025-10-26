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
};
