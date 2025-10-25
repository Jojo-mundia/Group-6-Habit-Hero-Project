// Real-time chat component for sharing progress, allowing users to send and delete messages
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { ref, onValue, push, remove } from "firebase/database";
import { database } from "../firebase";

const Chat = ({ shareId }) => {
  // Get current user from Clerk
  const { user } = useUser();
  // State for storing chat messages
  const [messages, setMessages] = useState([]);
  // State for the new message input
  const [newMessage, setNewMessage] = useState("");

  // Listen for real-time updates to the chat for this share
  useEffect(() => {
    const chatRef = ref(database, `chats/${shareId}`);
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setMessages(data);
      else setMessages({}); // No messages yet
    });
  }, [shareId]);
};
