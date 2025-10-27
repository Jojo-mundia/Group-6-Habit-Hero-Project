import React from "react";
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="signinContainer">
      <h1
        style={{
          color: "#f8f8f2",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
          marginBottom: "10px",
        }}
      >
        Welcome to Habit Tracker
      </h1>
      <p
        style={{
          color: "#ffb86c",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
          marginTop: "0",
        }}
      >
        Please sign in to access your dashboard.
      </p>
      <SignIn
        appearance={{
          elements: {
            root: {
              margin: "0",
            },
            card: {
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              color: "#fff",
              borderRadius: "10px",
              padding: "20px",
            },
            headerTitle: {
              color: "#fff",
            },
            headerSubtitle: {
              color: "#fff",
            },
            formButtonPrimary: {
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "5px",
            },
            formFieldLabel: {
              color: "#fff",
            },
            formFieldInput: {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.7)",
              color: "#000",
              borderRadius: "5px",
            },
            footerActionText: {
              display: "none",
            },
            footerActionLink: {
              display: "none",
            },
            footer: {
              display: "none",
            },
            dividerText: {
              color: "#fff",
            },
            socialButtonsBlockButton: {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#fff",
              borderRadius: "5px",
            },
            socialButtonsBlockButtonText: {
              color: "#fff",
            },
          },
        }}
      />
      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          color: "#ffb86c",
          fontSize: "16px",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
          backgroundColor: "transparent",
        }}
      >
        Don’t have an account?{" "}
        <a
          href="#"
          style={{
            color: "#50fa7b",
            textDecoration: "underline",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            backgroundColor: "transparent",
          }}
        >
          Sign up
        </a>
      </div>
      <div
        style={{
          marginTop: "10px",
          textAlign: "center",
          color: "#fff",
          fontSize: "14px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
          backgroundColor: "transparent",
        }}
      >
        Secured by Development mode
      </div>
    </div>
  );
};

export default SignInPage;
