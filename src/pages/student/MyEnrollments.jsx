import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";

const MyEnrollments = () => {

  const { enrolledCourses, calculateCourseDuration } = useContext(AppContext);

  return (
    <div className="px-36 my-10">
      <h1 className="text-2xl font-semibold">My Enrollments</h1>

      <table className="table-auto w-full border mt-10">
        <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
          <tr>
            <th className="px-4 py-3 font-semibold truncate">Course</th>
            <th className="px-4 py-3 font-semibold truncate">Duration</th>
            <th className="px-4 py-3 font-semibold truncate">Completed</th>
            <th className="px-4 py-3 font-semibold truncate">Status</th>
          </tr>
        </thead>

        <tbody>
          {enrolledCourses.map((course, index) => (
            <tr key={index} className="border-b border-gray-200">
              
              <td className="px-4 py-3 flex items-center gap-4">
                <img
                  src={course.courseThumbnail}
                  alt=""
                  className="w-28"
                />

                <div className="w-full">
                  <p>{course.courseTitle}</p>
                  <Line strokeWidth={1} percent={70} className='bg-gray-300 rounded-full' />
                </div>
              </td>

              <td className="px-4 py-3">
                {calculateCourseDuration(course)}
              </td>

              <td className="px-4 py-3">
                7 / 10 <span>Lectures</span>
              </td>

              <td className="px-4 py-3">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  On Going
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyEnrollments;