import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"
import toast from "react-hot-toast";
import { addToCart } from "../slices/cartSlice";

function CourseDetails() {
  const location = useLocation();
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const { cart } = useSelector((state) => state.cart)
  console.log("cart: ", cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[ course , setCourse ] = useState(null)

  const queryParams = new URLSearchParams(location.search);

  let paymentSuccess = queryParams.get("paymentSuccess");
  const ref = queryParams.get("reference");

  // Getting courseId from url parameter
  const { courseId } = useParams()
  // console.log(`course id: ${courseId}`)

  // Declear a state to save the course details
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  useEffect(() => {
    // Calling fetchCourseDetails fucntion to fetch the details
    ;(async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        console.log("course details res: ", res)
        setResponse(res)
        setCourse(res.data.courseDetails)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    })()

    if (paymentSuccess) {
      // setConfirmationModal({
      //   text1: "Payment Successful",
      //   text2: "You have been enrolled in the course.",
      //   btn1Text: "Go to Dashboard",
      //   btn2Text: "Continue Browsing",
      //   btn1Handler: () => navigate("/dashboard/enrolled-courses"),
      //   btn2Handler: () => navigate("/"),
      // })
      toast.success("Payment Successful! You have been enrolled in the course.", {
        duration: 2000,
        position: "top-center",
      });
    }

  }, [courseId])

  // console.log("response: ", response)

  // Calculating Avg Review count
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])
  // console.log("avgReviewCount: ", avgReviewCount)

  // // Collapse all
  // const [collapse, setCollapse] = useState("")
  const [isActive, setIsActive] = useState(Array(0))
  const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    )
  }

  // Total number of lectures
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!response.success) {
    return <Error />
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response.data?.courseDetails

  const handleBuyCourse = () => {
    console.log("buy course called")
    console.log("token: ", token)
    console.log(typeof token)
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (paymentLoading) {
    // console.log("payment loading")
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    // if (user ) {
    //   toast.error("You are an Instructor. You can't buy a course.")
    //   return
    // }
    console.log("user: ", user)
    console.log("course: ", course)
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }


  

  

  return (
    <>
      <div className={`relative w-full `}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              {/* <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              /> */}
            </div>
            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-[#F1F2FF]`}
            >
              <div>
                <p className="text-4xl font-bold text-[#F1F2FF] sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              <p className={`text-[#999DAA]`}><div className="text-white">Description :</div>{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>
              <div>
                <p className="">
                  Created By {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            {/* <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-[#F1F2FF]">
                Rs. {price}
              </p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton">Add to Cart</button>
            </div> */}
          </div>
          {/* Courses Card */}
          {/* <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDetailsCard
              course={response?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div> */}

          <div className="lg:absolute rounded-2xl p-4 sm:p-8 -bottom-[350px] right-[2.5rem] min-h-[600px] max-w-[423px] mx-auto lg:translate-y-0 translate-y-10 flex flex-col gap-4 bg-neutral-900 text-white border border-[rgba(255,255,255,0.1)] shadow-md shadow-black backdrop-blur-md z-40">
            <img
              alt="course image"
              loading="lazy"
              width={400}
              height={180}
              decoding="async"
              className="md:max-w-full w-[400px] min-h-[180px] rounded-2xl overflow-hidden object-cover"
              src={thumbnail}
            />
            <div className="flex flex-col gap-y-4 mt-4">
              <div className="flex text-3xl gap-x-3 font-semibold flex-wrap items-center">
                <span className="text-green-400">₹{price}</span>
                <span className="text-gray-500 line-through text-2xl">₹{price*2}</span>
              </div>
              <div>
                <p className="font-semibold text-xl mb-4">This Course Includes :</p>
                <div className="flex flex-col gap-3">
                  {[
                    "No Pre-requisite Required",
                    "10+ hours Video Content",
                    "450+ Curated Questions  (asked to mentors)",
                    "MEGA Problem-Solving lectures",
                    "Interview Preparation",
                    "with Doubt Assistance",
                    "with Course Completion Certificate"
                  ].map((item, idx) => (
                    <p key={idx} className="flex gap-2 items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        className="min-w-5 h-5 mt-1 text-green-400"
                      >
                        <g
                          stroke="#4ade80"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          clipPath="url(#check-icon)"
                        >
                          <path d="M12.75 2.503a7.5 7.5 0 1 0 3.6 4.997" />
                          <path
                            strokeLinejoin="round"
                            d="M6 9.375s1.125 0 2.625 2.625c0 0 4.17-6.875 7.875-8.25"
                          />
                        </g>
                        <defs>
                          <clipPath id="check-icon">
                            <path fill="#fff" d="M0 0h18v18H0z" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex select-none items-center gap-4 self-stretch flex-col-reverse sm:flex-row sm:items-start">
                <div
                  setConfirmationModal={setConfirmationModal}
                  onClick={
                    user && course?.studentsEnrolled.includes(user?._id)
                      ? () => navigate("/dashboard/enrolled-courses")
                      : handleBuyCourse
                  }
                  // target="_blank"
                  className="w-full border-b-2 border-l-2 border-r-2  cursor-pointer ml-3 text-center px-4 py-2.5 rounded-md text-white h-auto border-indigo-600 bg-indigo-600 hover:bg-indigo-700"
                >
                  {user && course?.studentsEnrolled.includes(user?._id)
                ? <div>Go To Course</div>
                : <div>Buy Now</div>}
                </div>
              </div>
              
              {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
              <button onClick={handleAddToCart} className=" w-full blackButton rounded-lg relative inline-flex items-center justify-center px-4 py-2.5 m-1 cursor-pointer border-b-2 border-l-2 border-r-2 
               active:border-orange-700 active:shadow-none shadow-lg bg-gradient-to-tr from-orange-600 to-orange-500
                hover:from-orange-500 hover:to-orange-500  border-orange-700 text-white">
                  {
                cart.some((item) => item._id === course_id)
                ? "Added to Cart"
                : "Add to Cart"
                  }
                {/* Add to Cart */}
              </button>
            )}

            </div>
          </div>

        </div>
      </div>
      <div className="mx-auto box-content px-4 text-start text-[#F1F2FF] lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {courseContent.length} {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                  <span>{response.data?.totalDuration} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-[#F1F2FF]0">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default CourseDetails