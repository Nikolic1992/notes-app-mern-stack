import mongoose from "mongoose";

// Create a schema for the Note model

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create model based on the schema

const Note = mongoose.model("Note", noteSchema);

export default Note;
