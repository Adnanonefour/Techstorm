import React from "react";
import "../HomePage.css";
import sticker from "../assets/sticker.png";
import bgImage from "../assets/bg.png";

function HomePage() {
  return (
    <div className="homepage" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="overlay">
        <h1 className="hero-heading">
          TECH
          <span className="color-s">S</span>
          <span className="color-t">T</span>
            <span className="color-o">O</span>
            <span className="color-r">R</span>
             <span className="color-m">M</span>
            
        </h1>

        <div className="details-row">
          <img
            src={sticker}
            alt="Sticker"
            className="sticker"
            style={{
              width: "300px",
              height: "auto",
              objectFit: "contain",
            }}
          />
          <div className="date-wrapper">
            <p className="date">26 Aug 2025</p>
            <p className="barcode-text">UNLEASH THE HERO WITHIN</p>
          </div>
        </div>

        <div className="barcode-wrapper">
          <div className="barcode-effect"></div>
        </div>

        <footer className="footer">
          <p>
            The city hides its secrets in shadows, but the Titans are always
            watching. Every clue, every trace, every unsolved mystery leaves a
            mark waiting to be uncovered.
            <br /> Step inside our case files and join the hunt .
          </p>
          <p>Welcome to the investigation...</p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
