import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setfullName] = useState("");
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/customers/public/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullName, email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Error occurred during signup");
      } 

      const data = await response.json();
      // Handle successful signup (e.g., redirect to login)
      console.log("Signup successful:", data);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            required
          />
        </div>
       
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
