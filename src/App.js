import "./App.css";
import Student_table from "./components/Student_table";
import StudentProfile from "./components/StudentProfile";
import { Moon, Sun } from "lucide-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handledarkmode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="App transition-colors duration-1000">
      <Router>
        {/* Top-right dark mode toggle */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handledarkmode}
            className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Student_table />} />
          <Route path="/profile/:name" element={<StudentProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
