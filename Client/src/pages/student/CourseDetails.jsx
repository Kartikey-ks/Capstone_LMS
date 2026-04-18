
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
      <div className="min-h-screen md:pt-20 pt-10 bg-gradient-to-b from-white via-sky-50 to-white">

        <div className="container mx-auto md:px-24 px-6">

          <div className="grid md:grid-cols-3 gap-10 items-start">

            {/* LEFT: Main content */}
            <div className="md:col-span-2">

              <header className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-100 mb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {courseData.courseTitle}
                </h1>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-3xl">
                  {courseData.courseDescription.slice(0, 260)}{courseData.courseDescription.length > 260 ? '...' : ''}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-white px-3 py-1 rounded-full border border-yellow-100">
                    <img src={assets.star} alt="" className="w-4 h-4" />
                    <span className="font-medium text-slate-800">{calculateRating(courseData)}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-sky-600">{courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'}</span>
                  </div>

                  <div className="text-sm text-slate-500">
                    {courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}
                  </div>

                  <div className="ml-auto text-sm text-slate-500">
                    Course by <span className="text-sky-600 font-semibold underline ml-1">{courseData.educator.name}</span>
                  </div>
                </div>

              </header>

              {/* Course Structure */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">Course Structure</h2>

                <div className="space-y-4">
                  {courseData.courseContent.map((chapter, index) => (

                    <article key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                      <button
                        onClick={() => toggleSection(index)}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition group"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-sky-50 to-white border ${openSections[index] ? 'ring-2 ring-sky-200' : 'border-gray-100'}`}>
                            <img src={assets.down_arrow_icon} alt="" className={`w-4 h-4 transition-transform ${openSections[index] ? 'rotate-180' : ''}`} />
                          </div>

                          <div>
                            <p className="font-medium text-slate-900">{chapter.chapterTitle}</p>
                            <p className="text-xs text-slate-500 mt-1">{chapter.chapterContent.length} lectures · {calculateChapterTime(chapter)}</p>
                          </div>
                        </div>

                        <div className="text-sm text-slate-400 group-hover:text-slate-500">{openSections[index] ? 'Hide' : 'View'} lectures</div>
                      </button>

                      <div className={`px-4 pb-4 transition-all duration-300 ${openSections[index] ? 'max-h-[1200px] pt-2' : 'max-h-0'}`}>

                        <ul className="space-y-2 mt-2">
                          {chapter.chapterContent.map((lecture, i) => (
                            <li key={i} className="flex items-center justify-between bg-white rounded-md hover:shadow-sm transition p-3 border border-gray-50">

                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-sky-50 border border-sky-100">
                                  <img src={assets.play_icon} alt="" className="w-4 h-4" />
                                </div>

                                <div>
                                  <p className="text-sm font-medium text-slate-800">{lecture.lectureTitle}</p>
                                  <p className="text-xs text-slate-500 mt-0.5">{lecture.isPreviewFree ? 'Preview available' : ''}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-xs text-slate-500">
                                {lecture.isPreviewFree && (
                                  <button
                                    onClick={() => setPlayerData({ videoId: lecture.lectureUrl.split('/').pop() })}
                                    className="px-3 py-1 rounded-full border border-sky-100 text-sky-600 hover:bg-sky-50 transition"
                                  >
                                    Preview
                                  </button>
                                )}

                                <div className="whitespace-nowrap">
                                  {humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}
                                </div>

                              </div>

                            </li>
                          ))}
                        </ul>

                      </div>

                    </article>

                  ))}
                </div>

              </section>

              {/* Description */}
              <section className="mt-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-slate-900">Course Description</h3>
                <div className="mt-4 text-sm leading-7 text-slate-600"> 
                  {courseData.courseDescription}
                </div>
              </section>

            </div>

            {/* RIGHT: Sticky card */}
            <aside className="md:col-span-1">
              <div className="sticky top-24">
                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-white">

                  {playerData ? (
                    <YouTube videoId={playerData.videoId} opts={{ playerVars: { autoplay: 1 } }} iframeClassName="w-full aspect-video" />
                  ) : (
                    <div className="relative">
                      <img src={courseData.courseThumbnail} alt="" className="w-full object-cover h-56" />
                      <div className="absolute left-4 bottom-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-100 text-xs font-medium">Limited offer • 5 days left</div>
                    </div>
                  )}

                  <div className="p-6">

                    <div className="flex items-baseline gap-3">
                      <p className="text-3xl font-extrabold text-slate-900">
                        {currency}{(courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100).toFixed(2)}
                      </p>

                      <p className="text-sm text-slate-500 line-through">{currency}{courseData.coursePrice}</p>

                      <span className="ml-auto text-sm font-medium text-emerald-600">{courseData.discount}% off</span>
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <img src={assets.star} alt="" className="w-4 h-4" />
                        <p className="text-sm">{calculateRating(courseData)}</p>
                      </div>

                      <div className="h-4 w-px bg-gray-200" />

                      <div className="flex items-center gap-2">
                        <img src={assets.time_clock_icon} alt="" className="w-4 h-4" />
                        <p className="text-sm">{calculateCourseDuration(courseData)}</p>
                      </div>

                      <div className="h-4 w-px bg-gray-200" />

                      <div className="flex items-center gap-2">
                        <img src={assets.lesson_icon} alt="" className="w-4 h-4" />
                        <p className="text-sm">{calculateNoOfLectures(courseData)} lessons</p>
                      </div>
                    </div>

                    <button
                      onClick={enrollCourse}
                      className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${isAlreadyEnrolled ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white shadow-md'}`}
                    >
                      {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
                    </button>

                    <div className="mt-6">
                      <p className="text-lg font-semibold text-slate-900">What's included</p>
                      <ul className="mt-3 ml-5 list-disc text-sm text-slate-600 space-y-1">
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
            </aside>

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