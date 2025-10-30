// Real-time chat component for sharing progress, allowing users to send and delete messages
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { ref, onValue, push, remove } from "firebase/database";
import { database } from "../firebase";

const Chat = ({ shareId }) => {
  // Get the current authenticated user from Clerk
  const { user } = useUser();
  // State to store the list of chat messages
  const [messages, setMessages] = useState([]);
  // State for the new message being typed
  const [newMessage, setNewMessage] = useState("");

  // Effect to listen for real-time updates to the chat for this specific share
  useEffect(() => {
    const chatRef = ref(database, `chats/${shareId}`);
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(data); // Set messages if data exists
      } else {
        setMessages({}); // Initialize empty object if no messages
      }
    });
  }, [shareId]); // Re-run when shareId changes

  // Function to send a new message to Firebase database
  const sendMessage = () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages
    const chatRef = ref(database, `chats/${shareId}`);
    push(chatRef, {
      userId: user.id,
      userName: user.firstName,
      message: newMessage,
      timestamp: Date.now(),
    });
    setNewMessage(""); // Clear the input field after sending
  };

  // Function to delete a message (only allowed for the message sender)
  const deleteMessage = (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      const messageRef = ref(database, `chats/${shareId}/${messageId}`);
      remove(messageRef);
    }
  };

  return (
    <div className="chatContainer">
      {/* Chat section title */}
      <h6>Chat</h6>
      {/* Scrollable area for displaying messages */}
      <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
        {Object.entries(messages).map(([key, msg]) => (
          <p key={key}>
            {/* Display username and message */}
            <strong>{msg.userName}:</strong> {msg.message}
            {/* Delete button only visible for the message author */}
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
      {/* Input field for typing new messages */}
      <input
        type="text"
        className="messageInput"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()} // Allow sending with Enter key
      />
      {/* Button to send the message */}
      <button className="sendBtn" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default Chat;
