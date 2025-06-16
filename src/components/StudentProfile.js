"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip } from "recharts"
import { Trophy, Target, TrendingUp, Calendar, Award, Brain, Sun, Moon } from "lucide-react"

// Hardcoded data
const ratingHistory = [
  { contest: "Div 2 A", rating: 1200, date: "2024-12-01" },
  { contest: "Div 2 B", rating: 1300, date: "2025-01-15" },
  { contest: "Div 2 C", rating: 1250, date: "2025-03-03" },
  { contest: "Div 1 A", rating: 1400, date: "2025-04-10" },
  { contest: "Div 1 B", rating: 1350, date: "2025-05-20" },
  { contest: "Global Round", rating: 1450, date: "2025-06-01" },
  { contest: "Educational Round", rating: 1520, date: "2025-06-15" },
]

const contestList = [
  { name: "Educational Round 168", date: "2025-06-15", rank: 67, ratingChange: 70, unsolved: 1 },
  { name: "Global Round 27", date: "2025-06-01", rank: 89, ratingChange: 95, unsolved: 1 },
  { name: "Div 1 Round 892", date: "2025-05-20", rank: 156, ratingChange: -50, unsolved: 2 },
  { name: "Div 1 Round 891", date: "2025-04-10", rank: 124, ratingChange: 50, unsolved: 2 },
  { name: "Div 2 Round 890", date: "2025-03-03", rank: 98, ratingChange: -50, unsolved: 3 },
  { name: "Div 2 Round 889", date: "2025-01-15", rank: 67, ratingChange: 100, unsolved: 1 },
  { name: "Div 2 Round 888", date: "2024-12-01", rank: 234, ratingChange: 100, unsolved: 2 },
]

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


export default function StudentProfile({ handle = "tourist" }) {
  const [contestRange, setContestRange] = useState(90)
  const [problemRange, setProblemRange] = useState(30)

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

  const currentRating = 1520
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

  return (
    <div className={`min-h-screen transition-colors duration-300 dark:bg-black  p-12`}>
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
<div className="flex items-center justify-between">
  <div className="space-y-2">
    <div className="flex items-center gap-4">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        {handle}
      </h1>
      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
        {getRatingTitle(currentRating)}
      </span>
    </div>
    <p className={`text-2xl font-semibold ${getRatingColor(currentRating)}`}>Rating: {currentRating}</p>
  </div>
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
      {filteredSubs.length}
    </div>
    <p className="text-xs mt-1 text-gray-500 dark:text-gray-500">
      Last {problemRange} days
    </p>
  </div>

  {/* Average Rating */}
  <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-zinc-950 dark:border border-zinc-700">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Rating</h3>
      <TrendingUp className="h-5 w-5 text-gray-400" />
    </div>
    <div className="text-3xl font-bold text-gray-900 dark:text-white">{avgRating}</div>
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
<div className="p-8 rounded-xl shadow-lg bg-white dark:bg-zinc-950 dark:border border-zinc-700">
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
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
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {range}d
        </button>
      ))}
    </div>
  </div>

  {/* Chart */}
  <div className="h-80 mb-8">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={ratingHistory}>
        <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
        <YAxis stroke="#9CA3AF" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--tw-bg-opacity)",
            background: "white",
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
  </div>

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-200 dark:border-gray-400 dark:bg-zinc-900">
          {["Contest", "Date", "Rank", "Rating Change", "Unsolved"].map((header) => (
            <th
              key={header}
              className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {contestList.slice(0, 6).map((contest, i) => (
          <tr
            key={i}
            className="border-b transition-colors border-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-750"
          >
            <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
              {contest.name}
            </td>
            <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{contest.date}</td>
            <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{contest.rank}</td>
            <td
              className={`py-4 px-4 font-semibold ${
                contest.ratingChange >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {contest.ratingChange >= 0 ? "+" : ""}
              {contest.ratingChange}
            </td>
            <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{contest.unsolved}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


        {/* Problem Solving Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {/* Problem Statistics */}
  <div className="p-8 rounded-xl shadow-lg bg-white dark:bg-zinc-950 dark:border border-zinc-700">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
          <Brain className="h-6 w-6" />
          Problem Statistics
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">Your problem solving insights</p>
      </div>
      <div className="flex gap-2">
        {[7, 30, 90].map((range) => (
          <button
            key={range}
            onClick={() => setProblemRange(range)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              problemRange === range
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {range}d
          </button>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">Hardest Problem</p>
        <p className="text-3xl font-bold text-orange-500">{topProblem?.rating || "N/A"}</p>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">Total Solved</p>
        <p className="text-3xl font-bold text-blue-500">{filteredSubs.length}</p>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
        <p className="text-3xl font-bold text-green-500">{avgRating}</p>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">Daily Average</p>
        <p className="text-3xl font-bold text-purple-500">{(filteredSubs.length / problemRange).toFixed(1)}</p>
      </div>
    </div>
  </div>

  {/* Rating Distribution */}
  <div className="p-8 rounded-xl shadow-lg bg-white dark:bg-zinc-950 dark:border border-zinc-700">
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Rating Distribution</h2>
      <p className="mt-1 text-gray-600 dark:text-gray-400">Problems solved by difficulty</p>
    </div>

    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData}>
          <XAxis dataKey="bucket" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} />
          <Tooltip
            // contentStyle={{
            //   backgroundColor: darkMode ? "#374151" : "#FFFFFF",
            //   border: "none",
            //   borderRadius: "8px",
            //   color: darkMode ? "#FFFFFF" : "#000000",
            // }} 
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              color:"#000000",
            }}
          />
          <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>

      </div>
    </div>
  )
}
