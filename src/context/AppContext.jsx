import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets/assets.js";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY

    const [allCourses, setAllCourses] = useState([])
    const [isEducator, setisEducator] = useState(false)
    const [enrolledCourses, setEnrolledCourses] = useState([])

    const navigate = useNavigate()

    // Fetch All Courses
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }

    // Calculate average rating of a course
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) return 0;

        let totalRating = 0;
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating;
        });

        return totalRating / course.courseRatings.length;
    }

    // Calculate total duration of a single chapter
    const calculateChapterTime = (chapter) => {
        const totalMinutes = chapter.chapterContent.reduce(
            (total, lecture) => total + lecture.lectureDuration, 0
        );
        return humanizeDuration(totalMinutes * 60 * 1000, { units: ['h', 'm'] });
    }

    // Calculate total duration of an entire course
    const calculateCourseDuration = (course) => {
        const totalMinutes = course.courseContent.reduce(
            (total, chapter) =>
                total + chapter.chapterContent.reduce(
                    (chTotal, lecture) => chTotal + lecture.lectureDuration, 0
                ),
            0
        );
        return humanizeDuration(totalMinutes * 60 * 1000, { units: ['h', 'm'] });
    }

    // Calculate total number of lectures in a course
    const calculateNoOfLectures = (course) => {
        return course.courseContent.reduce(
            (total, chapter) => total + chapter.chapterContent.length, 0
        );
    }


    //Fetch User Enrolled Courses
    const fetchUserEnrolledCourses = async () => {
        setEnrolledCourses(dummyCourses)
    }


    useEffect(() => {
        fetchAllCourses()
        fetchUserEnrolledCourses()
    }, [])

    const value = {
        currency, allCourses, navigate,
        calculateRating, calculateChapterTime,
        calculateCourseDuration, calculateNoOfLectures,
        isEducator, enrolledCourses, fetchUserEnrolledCourses
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}