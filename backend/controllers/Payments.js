const { instance } = require("../config/razorpay")

const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")
// const { Currency } = require("lucide-react")

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async( req , res ) => {
    try {
      console.log("amount -> " ,req.body.amount ) ;
        const options = {
            amount : Number( req.body.amount *100) ,
            currency: "INR"
        }
        
        const order = await instance.orders.create(options) ;
        return res.status(200).json({
          success:true ,
          order ,
        }) 

    } catch (e) {
       console.log(e) ;
    }
}

// exports.capturePayment = async (req, res) => {
//   const { courses } = req.body
//   const userId = req.user.id
//   if (courses.length === 0) {
//     return res.json({ success: false, message: "Please Provide Course ID" })
//   }

//   let total_amount = 0

//   for (const course_id of courses) {
//     let course
//     try {
//       // Find the course by its ID
//       course = await Course.findById(course_id)

//       // If the course is not found, return an error
//       if (!course) {
//         return res
//           .status(200)
//           .json({ success: false, message: "Could not find the Course" })
//       }

//       // Check if the user is already enrolled in the course
//       const uid = new mongoose.Types.ObjectId(userId)
//       if (course.studentsEnroled.includes(uid)) {
//         return res
//           .status(200)
//           .json({ success: false, message: "Student is already Enrolled" })
//       }

//       // Add the price of the course to the total amount
//       total_amount += course.price
//     } catch (error) {
//       console.log(error)
//       return res.status(500).json({ success: false, message: error.message })
//     }
//   }

//   const options = {
//     amount: total_amount * 100,
//     currency: "INR",
//     receipt: Math.random(Date.now()).toString(),
//   }

//   try {
//     // Initiate the payment using Razorpay
//     const paymentResponse = await instance.orders.create(options)
//     console.log(paymentResponse)
//     res.json({
//       success: true,
//       data: paymentResponse,
//     })
//   } catch (error) {
//     console.log(error)
//     res
//       .status(500)
//       .json({ success: false, message: "Could not initiate order." })
//   }
// }

// verify the payment


exports.verifyPayment = async (req, res) => {
  console.log(req.body) ;
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const courseid = req.query?.courseid

  const userId = req.query?.userid
  console.log(req.query) ;
  const courseIds = courseid.split(',');
  console.log(courseIds); 


  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courseid ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET )
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    for (const courseid of courseIds) {
    await enrollStudents(courseid, userId ) ;
  }
    // return res.redirect ( `http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`) ;
    // enrollStudents( )

    if ( courseIds.length > 1 ) {
      return res.redirect ( `http://localhost:5173/courses/${courseIds[0]}?paymentSuccess=true&reference=${razorpay_payment_id}&multipleCourses=true`) ;
    }

    return res.redirect ( `http://localhost:5173/courses/${courseIds[0]}?paymentSuccess=true&reference=${razorpay_payment_id}`) ;
    // return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(404).json({ success: false, message: "Payment Failed" })
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the courses
const enrollStudents = async (courseid, userId) => {
  if (!courseid || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  console.log( userId ) ;
  console.log( courseid ) ;
  // for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseid },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res.status(500).json({ success: false, error: "Course not found" })
      }
      console.log("Updated course: ", enrolledCourse)

      const courseProgress = await CourseProgress.create({
        courseID: courseid,
        userId: userId,
        completedVideos: [],
      })
      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseid,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent)
      // Send an email notification to the enrolled student
      // const emailResponse = await mailSender(
      //   enrolledStudent.email,
      //   `Successfully Enrolled into ${enrolledCourse.courseName}`,
      //   courseEnrollmentEmail(
      //     enrolledCourse.courseName,
      //     `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
      //   )
      // )

      // return res.status(200).json({
      //   success:true 
      // })

      // console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      // return res.status(400).json({ success: false, error: error.message })
    }
  }


exports.getapikey = ( req,res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY 
    })
}