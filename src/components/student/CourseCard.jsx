import React from 'react'
import { assets } from '../../assets/assets/assets'

const CourseCard = ({ course, currency }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm w-72">

      <img src={course.courseThumbnail} alt="" className="w-full h-40 object-cover" />

      <div className="p-4">

        <h3 className="text-lg font-semibold">{course.courseTitle}</h3>

        <p className="text-gray-500 text-sm">{course.educator.name}</p>

        <div className="flex items-center gap-2 mt-2">

          <p>4.5</p>

          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={assets.star}
                alt=""
                className="w-4"
              />
            ))}
          </div>

          <p className="text-gray-500 text-sm">22</p>

        </div>

        <p className="mt-2 font-semibold text-lg">
          {currency}
          {(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}
        </p>

      </div>

    </div>
  )
}

export default CourseCard