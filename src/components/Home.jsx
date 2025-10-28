import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// Main home page component with parallax scrolling effects
const Home = () => {
  // Track vertical scroll position for parallax animations
  const [scrollY, setScrollY] = useState(0);
  // Store requestAnimationFrame ID for performance optimization
  const rafId = useRef(null);

  useEffect(() => {
    // Optimized scroll handler using requestAnimationFrame for smooth performance
    const handleScroll = () => {
      if (rafId.current) return; // Prevent multiple RAF calls
      rafId.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY); // Update scroll position state
        rafId.current = null; // Reset RAF ID after execution
      });
    };

    // Add scroll event listener with passive flag for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup: remove event listener and cancel any pending RAF
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div className="full-screen-wrapper">
      <div className="home-container">
        {/* Section 1: Hero - Main introduction with holographic background effect */}
        <section className="hero-section">
          {/* Animated holographic overlay for sci-fi effect */}
          <div className="holographic-overlay"></div>
          <div className="hero-content">
            <h1>Transform Your Life with Habit Tracker</h1>
            <p>
              Build lasting habits, track your progress, and achieve your goals
              effortlessly.
            </p>
          </div>
        </section>

        {/* Section 2: Benefits - App features with background image */}
        <section className="benefits-section">
          <div className="benefits-content">
            <h2>Why Choose Habit Tracker?</h2>
            <p>
              Experience improved productivity, mental clarity, and long-term
              success through consistent habit formation.
            </p>
            <ul>
              <li>Daily progress tracking</li>
              <li>Visual habit streaks</li>
              <li>Community sharing</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Features - Full-screen image with Ken Burns effect */}
        <section className="features-section">
          {/* Container for cinematic Ken Burns animation */}
          <div className="ken-burns-container">
            <div className="ken-burns-image">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                alt="Mountain landscape with habit formation theme"
              />
            </div>
          </div>
          {/* Text overlay on top of animated background */}
          <div className="features-overlay">
            <div className="features-text">
              <h2>Why Habit Tracker is Amazing</h2>
              <p>
                Transform your daily routines into powerful habits that shape
                your future. Our intuitive app makes habit building effortless,
                rewarding, and sustainable.
              </p>
              <p>
                Join thousands of users who have revolutionized their lives
                through consistent, meaningful habits. Start your journey today
                and unlock your full potential.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Call to Action - Final section with floating quotes and button */}
        <section className="call-to-action-section">
          {/* Floating inspirational quotes */}
          <div className="floating-elements">
            <div className="floating-quote">
              "Success is not final, failure is not fatal: It is the courage to
              continue that counts." - Winston Churchill
            </div>
            <div className="floating-quote">
              "The only way to do great work is to love what you do." - Steve
              Jobs
            </div>
            <div className="floating-quote">
              "Believe you can and you're halfway there." - Theodore Roosevelt
            </div>
            <div className="floating-quote">
              "The future belongs to those who believe in the beauty of their
              dreams." - Eleanor Roosevelt
            </div>
          </div>
          <div className="cta-content">
            <h2>Ready to Transform Your Life?</h2>
            <p>
              Imagine waking up every day with unstoppable momentum, achieving
              goals you once thought impossible, and building habits that last a
              lifetime. Your journey to extraordinary success starts with one
              simple step.
            </p>
            <p>
              Join thousands who've already revolutionized their lives. Don't
              wait for tomorrow—your future self is counting on you to start
              today.
            </p>
            <Link to="/add-habit" className="cta-button">
              Start Building Your Future
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
