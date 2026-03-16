
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/student/Footer';
import { assets, dummyCourses, dummyEducatorData } from '../../assets/assets/assets';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Loading from '../../components/student/Loading';

const CourseDetails = () => {

  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const {
    currency,
    userData,
    calculateChapterTime,
    calculateCourseDuration,
    calculateRating,
    calculateNoOfLectures
  } = useContext(AppContext);

  const fetchCourseData = () => {
    const course = dummyCourses.find(course => course._id === id);

    if (course) {
      const resolvedCourse = {
        ...course,
        educator: typeof course.educator === 'string'
          ? dummyEducatorData
          : course.educator
      };

      setCourseData(resolvedCourse);
    } else {
      toast.error("Course not found");
    }
  };

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const enrollCourse = () => {
    if (!userData) {
      return toast.warn("Login to enroll");
    }

    if (isAlreadyEnrolled) {
      return toast.warn("Already enrolled");
    }

    setIsAlreadyEnrolled(true);
    toast.success("Enrolled successfully!");
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(
        userData.enrolledCourses.includes(courseData._id)
      );
    }
  }, [userData, courseData]);

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-12 relative items-start justify-between md:px-36 px-6 md:pt-20 pt-10 text-left">

        {/* Background gradient */}
        <div className="absolute top-0 left-0 w-full h-section-height -z-10 bg-gradient-to-b from-cyan-100/60"></div>

        {/* LEFT SIDE */}
        <div className="max-w-xl z-10 text-gray-600">

          {/* Title */}
          <h1 className="md:text-4xl text-2xl font-bold text-gray-900 leading-tight">
            {courseData.courseTitle}
          </h1>

          {/* Description preview */}
          <p
            className="pt-4 text-[15px] leading-relaxed text-gray-600"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200)
            }}
          />

          {/* Rating */}
          <div className="flex items-center space-x-2 pt-4 pb-2 text-sm text-gray-600">

            <p className="font-medium text-gray-800">
              {calculateRating(courseData)}
            </p>

            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt=""
                  className="w-4 h-4"
                />
              ))}
            </div>

            <p className="text-blue-600">
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
            </p>

            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "students" : "student"}
            </p>
          </div>

          {/* Instructor */}
          <p className="text-sm text-gray-600">
            Course by{" "}
            <span className="text-blue-600 underline cursor-pointer">
              {courseData.educator.name}
            </span>
          </p>

          {/* Course Structure */}
          <div className="pt-10 text-gray-800">

            <h2 className="text-xl font-semibold">
              Course Structure
            </h2>

            <div className="pt-5 space-y-3">

              {courseData.courseContent.map((chapter, index) => (

                <div
                  key={index}
                  className="border border-gray-200 bg-white rounded-lg overflow-hidden"
                >

                  {/* Chapter header */}
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => toggleSection(index)}
                  >

                    <div className="flex items-center gap-2">

                      <img
                        src={assets.down_arrow_icon}
                        alt=""
                        className={`transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                      />

                      <p className="font-medium text-gray-800">
                        {chapter.chapterTitle}
                      </p>

                    </div>

                    <p className="text-sm text-gray-500">
                      {chapter.chapterContent.length} lectures •{" "}
                      {calculateChapterTime(chapter)}
                    </p>

                  </div>

                  {/* Lectures */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >

                    <ul className="px-4 py-3 border-t border-gray-200 space-y-2">

                      {chapter.chapterContent.map((lecture, i) => (

                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm"
                        >

                          <img
                            src={assets.play_icon}
                            alt=""
                            className="w-4 h-4"
                          />

                          <div className="flex justify-between w-full items-center">

                            <p className="text-gray-800">
                              {lecture.lectureTitle}
                            </p>

                            <div className="flex items-center gap-3 text-xs text-gray-500">

                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl.split("/").pop()
                                    })
                                  }
                                  className="text-blue-500 cursor-pointer hover:underline"
                                >
                                  Preview
                                </p>
                              )}

                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>

                            </div>

                          </div>

                        </li>

                      ))}

                    </ul>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Course Description */}
          <div className="py-16">

            <h3 className="text-xl font-semibold text-gray-900">
              Course Description
            </h3>

            <div
              className="pt-4 text-[15px] leading-7 text-gray-600"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription
              }}
            />

          </div>

        </div>

        {/* RIGHT CARD */}
        <div className="shadow-lg rounded-xl overflow-hidden bg-white min-w-[320px] sm:min-w-[420px]">

          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img src={courseData.courseThumbnail} alt="" />
          )}

          <div className="p-6">

            {/* Limited time */}
            <div className="flex items-center gap-2 text-sm text-red-500">

              <img
                className="w-4"
                src={assets.time_left_clock_icon}
                alt=""
              />

              <p>
                <span className="font-medium">5 days</span> left at this price
              </p>

            </div>

            {/* Price */}
            <div className="flex gap-3 items-center pt-3">

              <p className="text-3xl font-bold text-gray-900">
                {currency}
                {(courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100).toFixed(2)}
              </p>

              <p className="text-gray-500 line-through">
                {currency}
                {courseData.coursePrice}
              </p>

              <p className="text-green-600 font-medium">
                {courseData.discount}% off
              </p>

            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 pt-4 text-sm text-gray-600">

              <div className="flex items-center gap-1">
                <img src={assets.star} alt="" />
                <p>{calculateRating(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-300"></div>

              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-300"></div>

              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="" />
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>

            </div>

            {/* Enroll */}
            <button
              onClick={enrollCourse}
              className={`mt-6 w-full py-3 rounded-lg font-medium transition
              ${
                isAlreadyEnrolled
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            {/* Includes */}
            <div className="pt-6">

              <p className="text-lg font-semibold text-gray-800">
                What's included
              </p>

              <ul className="ml-5 pt-3 list-disc text-sm text-gray-600 space-y-1">

                <li>Lifetime access with free updates</li>
                <li>Step-by-step project guidance</li>
                <li>Downloadable resources</li>
                <li>Quizzes to test knowledge</li>
                <li>Certificate of completion</li>

              </ul>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;


