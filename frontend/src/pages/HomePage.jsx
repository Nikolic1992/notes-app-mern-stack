import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import RateLimitedUI from "../components/RateLimitedUI";
import NavBar from "../components/NavBar";
import NoteCard from "../components/NoteCard";

function HomePage({ theme, setTheme, id }) {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");

        setNotes(res.data);
        setIsRateLimited(res.data.isRateLimited);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <NavBar theme={theme} setTheme={setTheme} />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
