import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useToast} from '../Contexts/ToastContext'

function Home() {

  const fetch = async () =>{
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/`)
    } catch (error) {
      
    }
  }

  useEffect(() =>{
    fetch()
  },[])

  return (
    <div>
       <div className="min-h-screen dark:bg-black transition-all duration-500">

      <main className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative">

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-6 leading-tight">
            Student Progress Management System
          </h1>

          <p className="text-md sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Track Codeforces performance, contests, problems, and growth all in one place.
          </p>
         <Link to="/table">
          <button className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-12 sm:py-5 text-lg sm:text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20">
            <span  className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          </button>
</Link>
          <div className="mt-16 flex justify-center space-x-8 opacity-60">
            <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base font-medium">
          Made with ❤️ using MERN stack
        </p>
      </footer>
    </div>
    </div>
  )
}

export default Home
