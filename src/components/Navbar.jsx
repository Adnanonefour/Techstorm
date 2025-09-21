import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase";
import { FaUserCircle } from "react-icons/fa";


function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth(app);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // updates Navbar automatically
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/"); // go back to homepage
  };

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/hackathon">Hackathon</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/team">Our Team</Link>
          </li>
        </ul>

        {/* 👇 Conditional login/profile */}
        {!user ? (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        ) : (
          <div className="profile-dropdown">
            <FaUserCircle
              size={28}
              color="limegreen"
              style={{ cursor: "pointer" }}
            />
            <div className="dropdown-content">
              <Link to="/create-profile">Create Profile</Link>
              <Link to="/add-skills">Add Skills</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
