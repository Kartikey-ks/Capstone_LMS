import React from 'react'
import Hero from '../../components/student/Hero'
import Features from '../../components/student/Features'
import CoursesSection from '../../components/student/CourseSection'

const Home = () => {
  return (
    <div className='flex flex-col items-center '>
      <Hero />
      <Features />
      <CoursesSection></CoursesSection>
    </div>
  )
}

export default Home
