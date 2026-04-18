import React from 'react'
import heroImg from "../../assets/main/hero_bg.png"
import { Link } from "react-router-dom"


const Hero = () => {
  return (
    <div className='relative flex flex-col items-center justify-center w-full pt-36 px-7 space-y-7 text-center overflow-hidden border-b-2 border-gray-500'>

      {/* Background image */}
      <img
        src={heroImg}
        className='absolute inset-0 w-full h-full object-cover opacity-40'
      />

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center space-y-6'>
        <h1 className='text-5xl font-bold text-black leading-tight max-w-3xl mx-auto drop-shadow-xl'>
          Learn Anything Through Curated Video Courses
        </h1>

        <p className='text-black max-w-2xl mx-auto drop-shadow-lg'>
          Explore courses built from high-quality YouTube lectures.
          Learn faster with structured playlists, notes, and progress tracking.
        </p>

        {/* Browse Courses Button */}
        <Link to="/course-list">
        <button className='cursor-pointer mt-4 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition'>
          Browse Courses
        </button>
        </Link>
        <div className='p-2'></div>
      </div>

    </div>
  )
}

export default Hero