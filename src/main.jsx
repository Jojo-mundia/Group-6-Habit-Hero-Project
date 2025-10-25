// Main entry point for the React application, setting up Clerk authentication and rendering the App component
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS for styling
import "font-awesome/css/font-awesome.min.css"; // Import Font Awesome icons
import "./custom-styles.css"; // Import custom styles

// Get the Clerk publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Make sure the key is available, otherwise throw an error
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Create the root element and render the app with Clerk provider for authentication
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
