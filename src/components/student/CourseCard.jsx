import React, { useContext } from 'react'
import { assets } from '../../assets/assets/assets'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

const CourseCard = ({ course }) => {

  const {currency, calculateRating} = useContext(AppContext)
  return (
    <Link
      to={'/course/' + course._id}
      onClick={() => scrollTo(0,0)}
      className="border rounded-lg overflow-hidden shadow-sm w-72 bg-white
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >

      {/* Course Image */}
      <div className="overflow-hidden">
        <img
          src={course.courseThumbnail}
          alt=""
          className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4 text-left">

        <h3 className="text-lg font-semibold text-gray-800">
          {course.courseTitle}
        </h3>

        <p className="text-gray-500 text-sm">
          {course.educator.name}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2 mt-2">

          <p className="text-sm">{calculateRating(course)}</p>

          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.floor (calculateRating(course)) ? assets.star : assets.star_blank}
                alt=""
                className="w-4"
              />
            ))}
          </div>

          <p className="text-gray-500 text-sm">
            {course.courseRatings.length}
          </p>

        </div>

        {/* Price */}
        <p className="mt-2 font-semibold text-lg text-gray-800">
          {currency}
          {(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}
        </p>

      </div>

    </Link>
  )
}

export default CourseCard