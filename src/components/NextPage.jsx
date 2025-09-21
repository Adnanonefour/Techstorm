import React from "react";
import "../NextPage.css";
import bgImage from "../assets/nextpage-bg.jpg"; // replace with your image path

function NextPage() {
  return (
    <section
      className="next-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Barcode */}
      <div className="barcode">
        |||||||||||||||||||||||||||||||||||||||||||||
      </div>
      <h2 className="barcode-title">THE GLITCH IN JUMP CITY</h2>

      {/* Subtitle */}
      <p className="subtitle">
        A five-part series where each Titan takes the spotlight battling the AI
        villain – Glitch
      </p>

      {/* Cards */}
      <div className="cards">
        <div className="card">
          <div className="card-icon">🔍</div>
          <h3>Find collabs</h3>
          <p>Hero Participants</p>
        </div>
        <div className="card">
          <div className="card-icon">💰</div>
          <h3>Earn Rewards</h3>
          <p>Epic Battle Days</p>
        </div>
        <div className="card">
          <div className="card-icon">📍</div>
          <h3>Smart Events</h3>
          <p>Titans world</p>
        </div>
        <div className="card">
          <div className="card-icon">⚡</div>
          <h3>Join Events</h3>
          <p>Power Challenges</p>
        </div>
      </div>

      {/* Button */}
      <button className="story-btn">View All Events</button>

      {/* Footer text */}
      <div className="footer-text">
        We created a suite of products rolled into one
      </div>
    </section>
  );
}

export default NextPage;
