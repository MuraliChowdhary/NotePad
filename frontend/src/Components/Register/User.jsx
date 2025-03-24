import { useState } from "react";
import "./user.css";

export function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setisRegistered] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ "username":name, "email":email, "password":password }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      setisRegistered("User Registered Successfully");
    } catch (error) {
      console.error(error);
      setisRegistered("Registration failed");
    }
  };

  return (
    <div className="register">
      <h1 className="header">User Registration</h1>

      <div className="input-container">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div className="input-container">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="input-container">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <button id="btn" onClick={handleSubmit}>Register</button>
      {isRegistered && <h3 style={{ textAlign: "center",fontFamily:"sans-serif" }}>{isRegistered}</h3>}
    </div>
  );
}
