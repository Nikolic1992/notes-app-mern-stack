import Note from "../models/Note.js";

// Function to get all notes from the database
// This function retrieves all notes from the database and returns them as a JSON response.
// If we do not use REQ as a parameter, we can remove it from the function signature and put underscore _
export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Sort notes by creation date, newest first
    // If no notes are found, return an empty array
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    return;
  }
}

// Function to get a single note by ID
// This function retrieves a note by its ID and returns it as a JSON response.
export async function getNoteById(req, res) {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);
    // If the note is not found, return a 404 error
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    return;
  }
}

// Function to create a new note
// This function creates a new note with the provided title and content, saves it to the database
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
    });
    const savedNote = await note.save();

    res.status(201).json({ message: "Note created successfuly!", savedNote });
  } catch (error) {
    console.error("Error in createNote controller:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    return;
  }
}

// Function to get a single note by ID and update it
// This function retrieves a note by its ID, updates it with the provided title and content,
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true } // Return the updated note
    );
    // If the note is not found, return a 404 error
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note updated successfully", updatedNote });
  } catch (error) {
    console.error("Error in updateNote controller:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    return;
  }
}

// Function to delete a note by ID
// This function deletes a note by its ID and returns a success message or an error if the note is not found.
export async function deleteNote(req, res) {
  try {
    const noteId = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(noteId);
    // If the note is not found, return a 404 error
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully", deletedNote });
  } catch (error) {
    console.error("Error in deleteNote controller:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    return;
  }
}
