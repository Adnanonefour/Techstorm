import React, { useState } from "react";
import "./LoginPage.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase"; // instead of "../../firebase"

import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        // Sign Up
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Sign Up successful!");
      } else {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }
      navigate("/"); // redirect to homepage after login/signup
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Logged in with Google!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>

        <button
          type="button"
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: "#4285F4",
            color: "#fff",
            fontWeight: "bold",
          }}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        <p style={{ marginTop: "15px" }}>
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            style={{ cursor: "pointer", color: "#fff825", fontWeight: "bold" }}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
