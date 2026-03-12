import React from 'react'
import Hero from '../../components/student/Hero'
import Features from '../../components/student/Features'
import CoursesSection from '../../components/student/CourseSection'
import LearningPath from '../../components/student/LearningPath'
import CallToAction from '../../components/student/CallToAction'

const Home = () => {
  return (
    <div className='flex flex-col items-center '>
      <Hero />
      <Features />
      <CoursesSection />
      <LearningPath />
      <CallToAction />
    </div>
  )
}

export default Home
