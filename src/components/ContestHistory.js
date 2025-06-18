import React from 'react'

function ContestHistory() {
  return (
    <div className='flex items-center justify-center'>
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
            className="border-b transition-colors border-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-zinc-900"
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
    </div>
  )
}

export default ContestHistory
