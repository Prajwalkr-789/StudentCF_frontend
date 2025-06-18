import "./App.css";
import Student_table from "./components/Student_table";
import StudentProfile from "./components/StudentProfile";
import { Moon, Sun } from "lucide-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ToastProvider } from "./Contexts/ToastContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handledarkmode = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <ToastProvider>
    <div className="App">
      <Toaster position="top-center" />
      <Router>
        {/* Top-right dark mode toggle */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handledarkmode}
            className="p-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Student_table />} />
          <Route path="/profile/:studentId" element={<StudentProfile />} />
        </Routes>
      </Router>
    </div>
    </ToastProvider>
  );
}

export default App;
