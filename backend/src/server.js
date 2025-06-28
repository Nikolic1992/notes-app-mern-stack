import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

// Install dotenv to manage environment variables ( .env file )
dotenv.config();

// Create an Express application
const app = express();

// Use the PORT environment variable or default to 5001 if not set
const PORT = process.env.PORT || 5001;

// Connect to the database
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());
// Use the notes routes for all requests to /api/notes
app.use("/api/notes", notesRoutes);

// Listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
