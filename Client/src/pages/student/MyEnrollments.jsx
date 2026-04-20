import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import axios from "axios";
import { toast } from "react-toastify";

const MyEnrollments = () => {

  const {
    userData,
    enrolledCourses,
    fetchUserEnrolledCourses,
    navigate,
    backendUrl,
    getToken,
    calculateCourseDuration,
    calculateNoOfLectures
  } = useContext(AppContext);

  const [progressArray, setProgressData] = useState([]);

  // ─── Fetch Progress ─────────────────────────────────────────────
  const getCourseProgress = async () => {
    try {
      const token = await getToken();

      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            `${backendUrl}/api/user/get-course-progress`,
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const totalLectures = calculateNoOfLectures(course);
          const lectureCompleted = data.progressData
            ? data.progressData.lectureCompleted.length
            : 0;

          return { totalLectures, lectureCompleted };
        })
      );

      setProgressData(tempProgressArray);

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ─── Fetch Enrollments ──────────────────────────────────────────
  useEffect(() => {
    if (userData) {
      fetchUserEnrolledCourses();
    }
  }, [userData]);

  // ─── Fetch Progress When Courses Load ───────────────────────────
  useEffect(() => {
    if (enrolledCourses?.length > 0) {
      getCourseProgress();
    }
  }, [enrolledCourses]);

  return (
    <div className="px-6 md:px-20 lg:px-36 my-10">
      <h1 className="text-2xl font-semibold">My Enrollments</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border mt-10">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold">Course</th>
              <th className="px-4 py-3 font-semibold">Duration</th>
              <th className="px-4 py-3 font-semibold">Completed</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {enrolledCourses?.map((course, index) => {

              const progress = progressArray[index];
              const percent = progress
                ? (progress.lectureCompleted * 100) / progress.totalLectures
                : 0;

              return (
                <tr key={course._id} className="border-b border-gray-200">

                  {/* Course Info */}
                  <td className="px-4 py-3 flex items-center gap-4">
                    <img
                      src={course.courseThumbnail}
                      alt=""
                      className="w-28 rounded"
                    />

                    <div className="w-full">
                      <p className="font-medium">{course.courseTitle}</p>

                      <Line
                        strokeWidth={3}
                        percent={percent}
                        className="bg-gray-300 rounded-full mt-2"
                      />
                    </div>
                  </td>

                  {/* Duration */}
                  <td className="px-4 py-3">
                    {calculateCourseDuration(course)}
                  </td>

                  {/* Progress */}
                  <td className="px-4 py-3">
                    {progress?.lectureCompleted || 0} / {progress?.totalLectures || 0}
                    <span className="text-sm text-gray-500"> Lectures</span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/player/${course._id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                    >
                      {percent === 100 ? "Completed" : "Continue"}
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEnrollments;