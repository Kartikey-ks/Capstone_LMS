import React from 'react'
import { assets } from '../../assets/assets/assets'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-0'>
      <h1 className='text-4xl text-gray-800 font-semibold'>
        Start Learning Today
      </h1>
      <p className='text-gray-500'>
        Browse curated courses or create your own using YouTube lectures.
      </p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        <Link to="/course-list">
        <button className='px-10 py-3 rounded-md text-white bg-blue-600 cursor-pointer hover:shadow-xl duration-200'>
          Browse Courses
        </button>
        </Link>
        <Link to="/educator">
        <button className='flex items-center gap-2 cursor-pointer border-1 rounded-md p-3 px-10 hover:shadow-xl duration-200'>
          Create a Course
        </button>
        </Link>
    </div>
    </div>
  )
}

export default CallToAction