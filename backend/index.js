const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

// Route files
const authRoutes = require("./routes/authRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
const traineeRoutes = require("./routes/traineeRoutes");
const instructorRoutes = require("./routes/instructorRoutes");

const app = express();

// DB Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/trainee", traineeRoutes);
 app.use("/api/instruct", instructorRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
