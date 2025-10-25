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

  // Function to send a new message to Firebase
  const sendMessage = () => {
    if (!newMessage.trim()) return; // Don't send empty messages
    const chatRef = ref(database, `chats/${shareId}`);
    push(chatRef, {
      userId: user.id,
      userName: user.firstName,
      message: newMessage,
      timestamp: Date.now(),
    });
    setNewMessage(""); // Clear input after sending
  };

  // Function to delete a message (only by the sender)
  const deleteMessage = (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      const messageRef = ref(database, `chats/${shareId}/${messageId}`);
      remove(messageRef);
    }
  };

  return (
    <div className="chatContainer">
      <h6>Chat</h6>
      {/* Scrollable chat messages area */}
      <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
        {Object.entries(messages).map(([key, msg]) => (
          <p key={key}>
            <strong>{msg.userName}:</strong> {msg.message}
            {/* Show delete button only for own messages */}
            {msg.userId === user?.id && (
              <button
                className="deleteMsgBtn"
                onClick={() => deleteMessage(key)}
              >
                Delete
              </button>
            )}
          </p>
        ))}
      </div>
      {/* Input field for new message */}
      <input
        type="text"
        className="messageInput"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      {/* Send button */}
      <button className="sendBtn" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default Chat;
