import React, { useState } from "react";
import { User, Mail, Phone, Code } from "lucide-react";
import axios from "axios";
import { useToast } from "../Contexts/ToastContext";

export default function AddStudentForm({ setOpenHandleForm, fetchData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    codeforcesHandle: "",
  });

  const { showSuccess, showError, showInfo } = useToast();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.name || !formData.phone || !formData.codeforcesHandle) {
    showInfo("Please fill all fields");
    return;
  }

  try {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/addStudent`, formData);

    if (res.status === 201) {
      showSuccess("Student added successfully!");
      setOpenHandleForm(false);
      fetchData();

      setFormData({
        name: '',
        email: '',
        phone: '',
        codeforcesHandle: '',
      });
    } else {
      showInfo("Unexpected response. Please check your input.");
    }
  } catch (error) {

    if (error.response) {
      const { status, data } = error.response;

      if (status === 400 && data.error === "Codeforces handle already exists") {
        showError("Codeforces handle already exists!");
      } else if (status === 404 && data.error === "Codeforces handle not found") {
        showError("Codeforces handle not found!");
      } else if (status === 500 && data.error === "Internal server error") {
        showError("Server error, please try again later.");
      } else {
        showError(data.error || "Something went wrong.");
      }
    }
  }
};


  const handleCancel = () => setOpenHandleForm(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-[95%] sm:w-[400px] p-6 rounded-2xl shadow-2xl border border-white/10 bg-white/90 dark:bg-zinc-900/80 text-black dark:text-white space-y-5 backdrop-blur-md"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            Add New Student
          </h2>
          <button
            type="button"
            onClick={handleCancel}
            className="text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-white text-xl"
          >
            &times;
          </button>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-800 dark:text-zinc-300 flex items-center gap-2">
            <User className="h-4 w-4" /> Full Name
          </label>
          <input
            type="text"
            placeholder="Enter student's full name"
            className="w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-800 dark:text-zinc-300 flex items-center gap-2">
            <Mail className="h-4 w-4" /> Email Address
          </label>
          <input
            type="email"
            placeholder="student@example.com"
            className="w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-800 dark:text-zinc-300 flex items-center gap-2">
            <Phone className="h-4 w-4" /> Phone Number
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-800 dark:text-zinc-300 flex items-center gap-2">
            <Code className="h-4 w-4" /> Codeforces Handle
          </label>
          <input
            type="text"
            placeholder="username"
            className="w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={formData.codeforcesHandle}
            onChange={(e) =>
              setFormData({ ...formData, codeforcesHandle: e.target.value })
            }
            required
          />
        </div>

        
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg bg-zinc-300 text-black hover:bg-zinc-400 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
}
