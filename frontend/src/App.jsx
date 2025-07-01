import { useState } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CreateNotePage from "./pages/CreateNotePage";
import NoteDetailsPage from "./pages/NoteDetailsPage";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <div
      data-theme={theme}
      className={`min-h-screen ${
        theme === "light" ? "bg-gray-300" : "bg-black"
      }`}
    >
      <Routes>
        <Route
          path="/"
          element={<HomePage theme={theme} setTheme={setTheme} />}
        />
        <Route path="/create" element={<CreateNotePage />} />
        <Route path="/note/:id" element={<NoteDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
