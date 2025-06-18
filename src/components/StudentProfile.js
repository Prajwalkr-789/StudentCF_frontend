"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip } from "recharts"
import { Trophy, Target, TrendingUp, Calendar, Award, Brain, Sun, Moon } from "lucide-react"
import axios from 'axios'
import { useParams } from "react-router-dom"
import ProblemSolving from "./ProblemSolving"


const solvedProblems = [
  { date: "2025-06-01", rating: 800 },
  { date: "2025-06-02", rating: 1000 },
  { date: "2025-06-03", rating: 1200 },
  { date: "2025-06-04", rating: 1600 },
  { date: "2025-06-05", rating: 800 },
  { date: "2025-06-06", rating: 1400 },
  { date: "2025-06-07", rating: 900 },
  { date: "2025-06-08", rating: 1100 },
  { date: "2025-06-09", rating: 1300 },
  { date: "2025-06-10", rating: 1500 },
  { date: "2025-06-11", rating: 1700 },
  { date: "2025-06-12", rating: 1200 },
  { date: "2025-06-13", rating: 1800 },
  { date: "2025-06-14", rating: 1000 },
]


export default function StudentProfile() {
  const [contestRange, setContestRange] = useState(30)
  const [problemRange, setProblemRange] = useState(30)
  const [contestdata , setcontestdata ] = useState(null)
  const [dateselected , setdateselected] = useState(30)

  const {studentId} = useParams()
  console.log(studentId)
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/getStudentStats?days=${contestRange}&studentId=${studentId}`,{
        withCredentials:true
      })
      console.log(res.data);
      if(res.status === 200){
        setcontestdata(res.data)
      } 
    } catch (error) {
      console.log("Something went wrong!!...")
    }
  }

useEffect(() =>{
  fetchData()
},[contestRange])

  const filteredSubs = solvedProblems.filter((sub) => {
    const daysAgo = (Date.now() - new Date(sub.date).getTime()) / 86400000
    return daysAgo <= problemRange
  })

  const buckets= {}
  filteredSubs.forEach((sub) => {
    const rating = sub.rating || 0
    const bucket = Math.floor(rating / 400) * 400
    buckets[bucket] = (buckets[bucket] || 0) + 1
  })

  const barData = Object.entries(buckets).map(([bucket, count]) => ({
    bucket: `${bucket}-${+bucket + 399}`,
    count,
  }))

  const topProblem = filteredSubs.reduce((a, b) => (b.rating > (a?.rating || 0) ? b : a), {})
  const avgRating = Math.round(filteredSubs.reduce((acc, cur) => acc + (cur.rating || 0), 0) / filteredSubs.length || 0)

  
  const getRatingColor = (rating) => {
    if (rating >= 2400) return "text-red-500"
    if (rating >= 2100) return "text-orange-500"
    if (rating >= 1900) return "text-purple-500"
    if (rating >= 1600) return "text-blue-500"
    if (rating >= 1400) return "text-cyan-500"
    if (rating >= 1200) return "text-green-500"
    return "text-gray-500"
  }

  const getRatingTitle = (rating) => {
    if (rating >= 2400) return "International Grandmaster"
    if (rating >= 2100) return "Grandmaster"
    if (rating >= 1900) return "International Master"
    if (rating >= 1600) return "Candidate Master"
    if (rating >= 1400) return "Expert"
    if (rating >= 1200) return "Specialist"
    return "Newbie"
  }

 const {
  avgProblemRating = 0,
  contestHistoryGraph = [],
  currentRating = 0,
  handle = '',
  maxRating = 0,
  problemsSolved = 0,
  unsolvedCount = 0
} = contestdata || {};



  if (!contestdata) return <div className="flex items-center justify-center h-screen  bg-white dark:bg-black ">
    <div className="text-gray-800 dark:text-zinc-200 text-xl font-semibold animate-pulse">
      Loading student stats...
    </div>
  </div>;

  return (
    <div className={`min-h-screen transition-colors duration-300 dark:bg-black  p-1 md:p-12`}>
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
  <div className="py-2 flex items-center flex-col">
  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
    STUDENT PROFILE
  </h2>
  <p className="text-sm text-gray-600 dark:text-gray-300">
    Performance, submissions, and analytics
  </p>
</div>
<div className="flex items-center justify-between">
  <div className="space-y-2">
    <div className="flex items-center gap-4">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        {handle.charAt(0).toUpperCase() + handle.slice(1)}
      </h1>
      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
        {getRatingTitle(currentRating)}
      </span>
    </div>
    <p className={`text-xl font-semibold ${getRatingColor(currentRating)}`}>Rating: {currentRating}</p>
  </div>
</div>

 <div className="flex items-center gap-2">
        <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Contest History</h2>
      </div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  {/* Current Rating */}
  <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-zinc-950 dark:border border-zinc-700">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Rating</h3>
      <Trophy className="h-5 w-5 text-gray-400" />
    </div>
    <div className={`text-3xl font-bold ${getRatingColor(currentRating)}`}>{currentRating}</div>
    <p className="text-xs mt-1 text-gray-500 dark:text-gray-500">
      {getRatingTitle(currentRating)}
    </p>
  </div>

  {/* Problems Solved */}
  <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-zinc-950 dark:border border-zinc-700">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Problems Solved</h3>
      <Target className="h-5 w-5 text-gray-400" />
    </div>
    <div className="text-3xl font-bold text-gray-900 dark:text-white">
      {problemsSolved}
    </div>
    <p className="text-xs mt-1 text-gray-500 dark:text-gray-500">
      Last {contestRange} days
    </p>
  </div>

  {/* Average Rating */}
  <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-zinc-950 dark:border border-zinc-700">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Rating</h3>
      <TrendingUp className="h-5 w-5 text-gray-400" />
    </div>
    <div className="text-3xl font-bold text-gray-900 dark:text-white">{avgProblemRating}</div>
    <p className="text-xs mt-1 text-gray-500 dark:text-gray-500">Problem difficulty</p>
  </div>

  {/* Daily Average */}
  <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-zinc-950 dark:border border-zinc-700">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Daily Average</h3>
      <Calendar className="h-5 w-5 text-gray-400" />
    </div>
    <div className="text-3xl font-bold text-gray-900 dark:text-white">
      {(filteredSubs.length / problemRange).toFixed(1)}
    </div>
    <p className="text-xs mt-1 text-gray-500 dark:text-gray-500">Problems per day</p>
  </div>
</div>

        {/* Contest History Section */}
<div className="p-4 md:p-8 rounded-xl shadow-lg bg-white dark:bg-zinc-950 dark:border border-zinc-700">
  {/* Header */}
  <div className="flex flex-col md:flex-row space-x-2 space-y-5 items-center justify-between mb-6">
    <div>
      <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
        <Award className="h-6 w-6" />
        Contest History
      </h2>
      <p className="mt-1 text-gray-600 dark:text-gray-400">Your rating progression over time</p>
    </div>
    <div className="flex gap-2">
      {[30, 90, 365].map((range) => (
        <button
          key={range}
          onClick={() => setContestRange(range)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            contestRange === range
              ? "bg-zinc-900 text-white border border-zinc-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-600"
          }`}
        >
          {range}d
        </button>
      ))}
    </div>
  </div>

  {/* Chart */}
<div className="h-80 mb-8 flex items-center justify-center">
  {contestHistoryGraph && contestHistoryGraph.length > 0 ? (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart key={contestHistoryGraph.length} data={contestHistoryGraph}>
        <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
        <YAxis stroke="#9CA3AF" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "none",
            borderRadius: "8px",
            color: "black",
          }}
          wrapperStyle={{
            backgroundColor: "inherit",
          }}
        />
        <Line
          type="monotone"
          dataKey="rating"
          stroke="#3B82F6"
          strokeWidth={3}
          dot={{ fill: "#3B82F6", strokeWidth: 2, r: 5 }}
          activeDot={{ r: 7, stroke: "#3B82F6", strokeWidth: 2 }}
        />
      </LineChart>
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H9m3 0h3" />
      </svg>
      <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">No data available</p>
      <p className="text-gray-500 dark:text-gray-400 text-xs">No contest activity in the selected range.</p>
      <p className="text-gray-500 dark:text-gray-400 text-xs">Trying changing the days</p>
    </div>
  )}
</div>


  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-200 dark:border-gray-400 dark:bg-zinc-900">
          {["Contest", "Date", "Rank", "Rating Change", "Rating"].map((header) => (
            <th
              key={header}
              className=" py-3 px-4 font-semibold text-center text-gray-700 dark:text-gray-300"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {contestHistoryGraph.map((contest, i) => (
          <tr
            key={i}
            className="border-b transition-colors text-center border-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-zinc-900"
          >
            <td className="py-4 px-4 text-left font-medium text-gray-900 dark:text-white">
              {contest.name}
            </td>
            <td className="py-4 px-4 text-gray-600 dark:text-gray-300 text-center">{contest.date}</td>
            <td className="py-4 px-4 text-gray-600 dark:text-gray-300 text-center">{contest.rank}</td>
            <td
              className={`py-4 px-4 font-semibold ${
                contest.ratingChange >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {contest.ratingChange >= 0 ? "+" : ""}
              {contest.ratingChange}
            </td>
            <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{contest.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
        <ProblemSolving studentId={studentId} />

      </div>
    </div>
  )
}
