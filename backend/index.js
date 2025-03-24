const express = require("express");
const mongoose = require("mongoose");
const { createTodo, updateTodo } = require("./types");
const { TodoSchema } = require("./db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "MURALI"; // Store in environment variables in production
const cors = require("cors");
const { registration, signin } = require("../backend/userZod");
const { User } = require("./userdb");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
app.use(cors());

// Token verification middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  });
};

// Create Todo
let count=1;
app.post("/todo", async function (req, res) {
   
  const createPayload = req.body;
  console.log(req.body);
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    console.log("Error in parsing the payload");
    return res.status(400).json(parsedPayload.error.issues);
  }

  try {
    await TodoSchema.create({
      title: createPayload.title,
      description: createPayload.description,
      completed: false,
      id:count.toString(),
    });
    count++;  
    res.json({
      msg: "Todo created",
    });
    console.log("Todo created");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating todo" });
  }
});

// Get Todos
app.get("/todo", async function (req, res) {
  try {
    const todos = await TodoSchema.find({});
    if (todos.length === 0) {
      return res.status(404).json({ error: "No todos found" });
    }

    // Get a random todo from the list
    const randomTodo = todos[Math.floor(Math.random() * todos.length)];

    res.json({
      todos: [randomTodo], // Return it as an array for consistency
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while fetching todos" });
  }
});

app.get("/todo/:id", async function (req, res) {
  try {
    const id = req.params.id; // Capture 'id' from the URL
    console.log(id);
    
    // Find the todo with the specific 'id'
    const todo = await TodoSchema.findOne({ id });
    
    if (!todo) {
      return res.status(404).json({ error: "No todo found with the given id" });
    }
    
    res.json({ todos:todo }); // Return the todo item found
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while fetching the todo" });
  }
});



// Mark Todo as Completed
app.put("/completed", authenticateToken, async function (req, res) {
  const updatePayload = req.body;
  console.log(req.body);
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    console.log("Error in parsing update payload");
    return res.status(400).json(parsedPayload.error.issues);
  }

  try {
    await TodoSchema.updateOne({ _id: req.body.id }, { completed: true });
    res.json({
      msg: "Todo marked as completed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating todo" });
  }
});

// Register User
app.post("/register", async function (req, res) {
  const registerPayload = req.body;
  console.log(registerPayload);
  const validateRegisterPayload = registration.safeParse(registerPayload);

  if (!validateRegisterPayload.success) {
    console.log("Error in parsing register payload");
    return res
      .status(400)
      .json({
        message: "Error in validating payload",
        issues: validateRegisterPayload.error.issues,
      });
  }

  try {
    const hashedPassword = await bcrypt.hash(registerPayload.password, 10);
    await User.create({
      username: registerPayload.username,
      email: registerPayload.email,
      password: hashedPassword,
    });
    res.json({
      msg: "User registered successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error in registering user" });
  }
});

// Sign-In User
app.post("/signin", async function (req, res) {
  const signPayload = req.body;
  console.log(signPayload);
  const validateSignPayload = signin.safeParse(signPayload);
  if (!validateSignPayload.success) {
    console.log("Error in parsing sign payload");
    return res
      .status(400)
      .json({
        message: "Error in validating sign-in payload",
        issues: validateSignPayload.error.issues,
      });
  }

  try {
    const { email, password } = signPayload;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error in signing in" });
  }
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
