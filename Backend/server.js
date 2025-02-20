// server.js
require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const rateLimit = require("express-rate-limit");

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: "*", // Replace the existing origin line with this
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "10kb" }));
app.use("/login", limiter);
app.use("/signup", limiter);

// MongoDB connection
let db;
const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5001,
    });

    db = client.db(process.env.DB_NAME);
    console.log("Connected to MongoDB");

    // Create unique index on email field
    await db
      .collection("Login_Data")
      .createIndex({ email: 1 }, { unique: true });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

// Input validation middleware
const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters" });
  }

  next();
};

// Sign-up endpoint
app.post("/signup", validateLoginInput, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await db.collection("Login_Data").findOne({
      email: validator.normalizeEmail(email),
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      email: validator.normalizeEmail(email),
      password: hashedPassword,
      createdAt: new Date(),
      lastLogin: new Date(),
    };

    await db.collection("Login_Data").insertOne(newUser);

    res.status(201).json({
      message: "User created successfully",
      user: {
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login endpoint (existing code remains the same)
app.post("/login", validateLoginInput, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.collection("Login_Data").findOne({
      email: validator.normalizeEmail(email),
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Update last login time
    await db
      .collection("Login_Data")
      .updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } });

    res.status(200).json({
      message: "Login successful",
      user: {
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
