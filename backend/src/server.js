import express from "express";
import dotenv from "dotenv";
import cors from "cors";
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

// Enable CORS for all routes
app.use(cors());
// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to limit the rate of incoming requests
// This helps prevent abuse and ensures fair usage of the API
// It should always be placed before the routes that it applies to
app.use(rateLimiter);

// Use the notes routes for all requests to /api/notes
app.use("/api/notes", notesRoutes);

// Connect to the database first before starting the server
// This ensures that the server only starts if the database connection is successful
connectDB().then(() => {
  // Listen for incoming requests on the specified port
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
