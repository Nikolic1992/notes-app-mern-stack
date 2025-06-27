import express from "express";

const app = express();

// Endpoints
app.get("/app/notes", (req, res) => {
  res.status(200).json({ message: "You have 5 notes!" });
});
app.post("/app/notes", (req, res) => {
  res.status(200).json({ message: "Note created successfully" });
});
app.put("/app/notes/:id", (req, res) => {
  res.status(200).json({ message: "Note updated successfully" });
});
app.delete("/app/notes/:id", (req, res) => {
  res.status(200).json({ message: "Note deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
