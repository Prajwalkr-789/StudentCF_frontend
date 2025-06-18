"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Sun,
  Moon,
  Users,
  Trophy,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import AddStudentForm from "./AddStudentForm";
import EditStudentForm from "./EditStudentForm";
import axios from "axios";
import { useToast } from "../Contexts/ToastContext";


export default function StudentTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setstudents] = useState([]);

  const {showError , showSuccess , showInfo} = useToast()

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/getAllStudentsShortInfo`
      );
      if (res.status == 200) {
        setstudents(res.data);
        console.log(res);
      }
    } catch {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

const deleteStudent = async (studentId) => {
  console.log(studentId);
  if (!studentId) {
    showError("Something went wrong, try again.");
    return;
  }

  const confirmDelete = window.confirm("Are you sure you want to delete this student?");
  if (!confirmDelete) return;

  try {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/deleteStudent`, {
      studentId,
    });

    if (res.status === 200) {
      showSuccess("Student deleted successfully!");
      if (fetchData) fetchData(); 
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400) showError(data.error || "Student ID is missing");
      else if (status === 404) showError("Student not found");
      else if (status === 500) showError("Server error, try again later");
      else showError(data.error || "Unexpected error");
    } else {
      showError("Network error, please check your connection.");
    }
  }
};

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setOpenEditForm(true);
  };

  const getRatingColor = (rating) => {
    if (rating >= 2400) return "text-red-500";
    if (rating >= 2100) return "text-orange-500";
    if (rating >= 1900) return "text-purple-500";
    if (rating >= 1600) return "text-blue-500";
    if (rating >= 1400) return "text-cyan-500";
    if (rating >= 1200) return "text-green-500";
    return "text-gray-500";
  };

  const getRatingTitle = (rating) => {
    if (rating >= 2400) return "International Grandmaster";
    if (rating >= 2100) return "Grandmaster";
    if (rating >= 1900) return "International Master";
    if (rating >= 1600) return "Candidate Master";
    if (rating >= 1400) return "Expert";
    if (rating >= 1200) return "Specialist";
    return "Newbie";
  };

  const { Rating, totalProblems, totalContests } = students.reduce(
    (acc, stud) => {
      acc.Rating += stud.currentRating;
      acc.totalProblems += stud.totalProblemsSolved;
      acc.totalContests += stud.totalContests;
      return acc;
    },
    { Rating: 0, totalProblems: 0, totalContests: 0 }
  );

  const totalStudents = students.length;
  const avgRating = (Rating / totalStudents).toFixed(2) || 0;

  return (
    <div className={`dark:bg-black p-2 md:p-12`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Student Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and track competitive programming students
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl shadow-lg dark:shadow-none dark:border border-zinc-800 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalStudents}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl shadow-lg dark:shadow-none dark:border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Average Rating
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {avgRating}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl shadow-lg dark:shadow-none dark:border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Problems
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalProblems}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl shadow-lg dark:shadow-none dark:border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Contests
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalContests}
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Add Button */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setOpenAddForm(true);
            }}
            className="flex items-center gap-2 px-6 py-3 dark:bg-zinc-950 hover:from-zinc-200  dark:text-zinc-100 border border-zinc-600 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
            Add Student
          </button>
        </div>

        {/* Table */}
        <div className="p-4 md:p-10">
          <div className="bg-white dark:bg-zinc-950 shadow-lg rounded-xl  border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto p-4 ">
              <table className="w-full ">
                <thead className="bg-gray-50 dark:bg-gray-800/50 ">
                  <tr className="">
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Handle
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors text-center"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {student.name}
                            </div>
                            <div
                              className={`text-xs ${getRatingColor(
                                student.currentRating
                              )}`}
                            >
                              {getRatingTitle(student.currentRating)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {student.email}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {student.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          {student.codeforcesHandle}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-sm font-semibold ${getRatingColor(
                            student.currentRating
                          )}`}
                        >
                          {student.currentRating}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Max: {student.maxRating}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {student.totalProblemsSolved} problems
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {student.totalContests} contests
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Link to={`/profile/${student.studentId}`}>
                            <button
                              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                              title="View Profile"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleEditStudent(student)}
                            className="p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                            title="Edit Student"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteStudent(student.studentId)}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            title="Delete Student"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  No students found
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {searchTerm
                    ? "Try adjusting your search terms."
                    : "Get started by adding a new student."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {openAddForm && (
        <AddStudentForm
          fetchdata={fetchData}
          setOpenHandleForm={setOpenAddForm}
        />
      )}
      {openEditForm && (
        <EditStudentForm
          fetchdata={fetchData}
          setOpenEditForm={setOpenEditForm}
          student={selectedStudent}
        />
      )}
    </div>
  );
}
