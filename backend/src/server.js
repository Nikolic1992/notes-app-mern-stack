import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
// Import the database connection function
import { connectDB } from "./config/db.js";

// Import the routes for handling notes
import notesRoutes from "./routes/notesRoutes.js";
// Import the rate limiter middleware to control request rates
import rateLimiter from "./middleware/rateLimiter.js";

// Install dotenv to manage environment variables ( .env file )
dotenv.config();

// Create an Express application
const app = express();

// Use the PORT environment variable or default to 5001 if not set
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

// Enable CORS for all routes if not in production mode
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "https://localhost:5173" }));
}

// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to limit the rate of incoming requests
// This helps prevent abuse and ensures fair usage of the API
// It should always be placed before the routes that it applies to
app.use(rateLimiter);

// Use the notes routes for all requests to /api/notes
app.use("/api/notes", notesRoutes);

// If in production mode, serve the React app which is located on index.html
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Connect to the database first before starting the server
// This ensures that the server only starts if the database connection is successful
connectDB().then(() => {
  // Listen for incoming requests on the specified port
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
