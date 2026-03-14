import React from 'react'
import { assets } from '../../assets/assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-gray-900 md:px-36 text-left w-full mt-10 text-white'>

      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>

        {/* Logo + Description */}
        <div>
          <img src={assets.logo_dark} className='w-60' alt="logo" />
          <p className='mt-6 text-sm text-gray-300'>
            LearnSphere helps students transform scattered YouTube videos into
            structured learning paths. Discover curated courses, track your
            progress, and master new skills with an organized learning experience.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h2 className='font-semibold mb-4'>Platform</h2>

          <ul className='w-30 flex flex-col gap-2 text-sm text-gray-300'>

            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/courses" className="hover:text-white transition">
                Browse Courses
              </Link>
            </li>

            <li>
              <Link to="/learning-paths" className="hover:text-white transition">
                Learning Paths
              </Link>
            </li>

            <li>
              <Link to="/my-enrollments" className="hover:text-white transition">
                My Enrollments
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className='font-semibold mb-4'>Contact</h2>

          <ul className='flex flex-col gap-2 text-sm text-gray-300'>
            <li>support@learnsphere.com</li>
            <li>+91 XXXXX XXXXX</li>
            <li>Dehradun, India</li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <p className='py-4 text-center text-sm text-gray-400'>
        © 2026 LearnSphere. All rights reserved.
      </p>

    </footer>
  )
}

export default Footer