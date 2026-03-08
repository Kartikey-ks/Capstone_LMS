import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'

const CoursesSection = () => {

  const {allCourses} = useContext(AppContext)
  return (
    <div className='py-16 px-40'>
      
      <h2 className='text-3xl font-medium text-gray-800'>
        Popular Courses
      </h2>

      <p className='text-base text-gray-500 mt-3'>
        Explore courses created by instructors using curated YouTube content.
      </p>

      <div>
        {allCourses.slice(0,4).map((course, index)=> <CourseCard key={index} course={course}/>)}
      </div>
      <Link
        to='/course-list'
        onClick={() => scrollTo(0,0)}
        className='inline-block mt-6 text-gray-600 border border-gray-400 px-10 py-3 rounded'
      >
        Show all courses
      </Link>

    </div>
  )
}

export default CoursesSection