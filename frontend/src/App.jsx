import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Todos } from "./Components/Todos";
import { CreateTodo } from "./Components/CreateTodo";
import { User } from "./Components/Register/User";
import { Home } from "./Components/Home/Home";
import {Login} from "./Components/Login/Login"
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (window.location.pathname === "/todos") {
      handleChange();
    }
  }, []);

  const handleChange = async () => {
    try {
      const response = await fetch("http://localhost:3000/todo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization":"Bearer" + " "+localStorage.getItem("token")
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched todos:", data.todos); // Debugging line
      setTodos(data.todos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createTodo" element={<CreateTodo setTodos={setTodos} />} />
        <Route path="/register" element={<User />} />
        <Route path="/todos" element={<Todos todos={todos} />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
