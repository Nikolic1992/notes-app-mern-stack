// React Router for routing
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CreateNotePage from "./pages/CreateNotePage";
import NoteDetailsPage from "./pages/NoteDetailsPage";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }
  return (
    <div data-theme={theme} className="min-h-screen">
      <button className="btn btn-neutral" onClick={toggleTheme}>
        TOGGLE THEME
      </button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNotePage />} />
        <Route path="/notes/:id" element={<NoteDetailsPage />} />
      </Routes>
    </div>
  );
}
export default App;
