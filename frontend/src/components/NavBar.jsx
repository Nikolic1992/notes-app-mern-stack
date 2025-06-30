import { Link } from "react-router";
import { Moon, PlusIcon, Sun } from "lucide-react";

function NavBar({ theme, setTheme }) {
  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            MyNotes
          </h1>
          <button
            className="rounded-full border border-gray-500 p-2 hover:bg-gray-500 transition-colors"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-slate-700" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>
          <div className="flex items-center gap-4">
            <Link to="/create" className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>Add note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
