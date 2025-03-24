import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   
  const navigate = useNavigate(); 
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      body: JSON.stringify({  email, password }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      const token = data.token;
      console.log(token)
       localStorage.setItem("token",token);

      navigate("/");
       
      
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <div className="register">
      <h1 className="header">Login</h1>

      

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

      <button id="btn" onClick={handleSubmit}>Login</button>
       
    </div>
  );
}
