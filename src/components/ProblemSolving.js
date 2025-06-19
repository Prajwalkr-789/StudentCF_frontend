import React, { useEffect, useRef, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Brain } from "lucide-react";
import { useToast } from "../Contexts/ToastContext";
import axios from "axios";

function ProblemSolving({ studentId }) {
  const [problemRange, setProblemRange] = useState(7);
  const [problemSolvingData, setProblemSolvingData] = useState(null);
  const { showError } = useToast();

  const cacheRef = useRef({}); 
  const processBuckets = (ratingBuckets) => {
    return Object.entries(ratingBuckets || {}).map(([bucket, count]) => ({
      bucket,
      count,
    }));
  };

  useEffect(() => {
    const fetchProblemStats = async () => {
       const cacheKey = `${studentId}_${problemRange}`;
      if (cacheRef.current[cacheKey]) {
        setProblemSolvingData(cacheRef.current[cacheKey]);
        return;
      }
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/getSolvingStats`,
          {
            studentId,
            days: problemRange,
          }
        );

        const data = res.data;
        data.barData = processBuckets(data.ratingBuckets);
        cacheRef.current[cacheKey] = data;
        setProblemSolvingData(data);
      } catch (err) {
        showError("Failed to load problem stats. Try again later.");
      }
    };

    if (studentId) fetchProblemStats();
  }, [studentId, problemRange]);

  if (!problemSolvingData) return null;

  const {
    mostDifficult,
    problemsSolved,
    avgProblemRating,
    avgPerDay,
    barData,
  } = problemSolvingData;

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-black p-1 md:p-12">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-6 bg-green-500 rounded-full"></div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Problem Solving
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-xl shadow-lg bg-white dark:bg-zinc-950 dark:border border-zinc-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                <Brain className="h-6 w-6" />
                Problem Statistics
              </h2>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Your problem solving insights
              </p>
            </div>
            <div className="flex gap-2">
              {[7, 30, 90].map((range) => (
                <button
                  key={range}
                  onClick={() => setProblemRange(range)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
    ${
      problemRange === range
        ? `
          bg-blue-500 text-white 
          dark:bg-zinc-200 dark:text-black
        `
        : `
          bg-gray-100 text-gray-700 hover:bg-gray-200 
          dark:bg-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-600
        `
    }
  `}
  > {range}d </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2  ">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hardest Problem
              </p>
              <p className="text-3xl font-bold text-orange-500">
                {mostDifficult?.rating || "0"}
              </p>
            </div>
            <div className="space-y-2 ">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Solved
              </p>
              <p className="text-3xl font-bold text-blue-500">
                {problemsSolved}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Average Rating
              </p>
              <p className="text-3xl font-bold text-green-500">
                {avgProblemRating}
              </p>
            </div>
            <div className="space-y-2 ">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Daily Average
              </p>
              <p className="text-3xl font-bold text-purple-500">{avgPerDay}</p>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-xl shadow-lg bg-white dark:bg-zinc-950 dark:border border-zinc-700">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Rating Distribution
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Problems solved by difficulty
            </p>
          </div>

          <div className="h-64 flex items-center justify-center">
            {barData && barData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="bucket" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "none",
                      borderRadius: "8px",
                      color: "#000000",
                    }}
                  />
                  <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-400 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.75 9.75h.008v.008H9.75V9.75zm4.5 0h.008v.008h-.008V9.75zm-4.5 4.5h.008v.008H9.75v-.008zm4.5 0h.008v.008h-.008v-.008z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">
                  No data available
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  Try changing the date range.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemSolving;
