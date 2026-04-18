import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'

const CoursesSection = () => {

  const { allCourses, currency } = useContext(AppContext)

  return (
    <div className='py-10 px-40'>

      <div className='text-center max-w-2xl mx-auto'>
        <h2 className='text-3xl font-medium text-gray-800'>
          Popular Courses
        </h2>

        <p className='text-base text-gray-500 mt-3'>
          Explore courses created by instructors using curated YouTube content.
        </p>
      </div>

      <div className='grid grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-6'>
        {allCourses.slice(0,4).map((course, index)=> (
          <CourseCard key={index} course={course} currency={currency}/>
        ))}
      </div>

      {/* Center Button */}
      <div className="flex justify-center">
        <Link
          to='/course-list'
          onClick={() => scrollTo(0,0)}
          className='inline-block mt-6 text-gray-700 border border-gray-400 px-10 py-3 rounded-lg 
          hover:bg-gray-800 hover:text-white hover:border-gray-800 
          transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg'
        >
          Show all courses
        </Link>
      </div>

    </div>
  )
}

export default CoursesSection