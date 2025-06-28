import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

// Install dotenv to manage environment variables ( .env file )
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to the database
connectDB();

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
