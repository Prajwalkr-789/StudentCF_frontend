import "./App.css";
import Student_table from "./components/Student_table";
import StudentProfile from "./components/StudentProfile";
import {MoonIcon, SunIcon } from "lucide-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ToastProvider } from "./Contexts/ToastContext";
import Home from "./components/Home";

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
               <header className="absolute top-0 right-0 p-6 z-10">
            <button
            onClick={handledarkmode}
              className="w-12 h-12 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 flex items-center justify-center text-2xl hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Toggle theme"
            >
              {darkMode ? <SunIcon className="text-zinc-200"/>  :<MoonIcon/>}
            </button>
          </header>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/table" element={<Student_table />} />
          <Route path="/profile/:studentId" element={<StudentProfile />} />
        </Routes>
      </Router>
    </div>
    </ToastProvider>
  );
}

export default App;
