const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/cors");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const connectDB = require("./config/db");

connectDB();

const app = express();

//handling cors
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

//models
require("./models/userModel");
require("./models/postModel");

//registering routes
app.use(require("./routes/authRoutes"));
app.use(require("./routes/postRoutes"));
app.use(require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("hello world");
});

// Test endpoint for CORS verification
app.get("/test-cors", (req, res) => {
  res.json({
    message: "CORS is working!",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`.yellow.bold);
});
