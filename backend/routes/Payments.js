// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, getapikey, verifyPayment} = require("../controllers/Payments.js")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
// verifyPayment, sendPaymentSuccessEmail 

router.post("/razorpay/process", auth , capturePayment )
// router.post("/verifyPayment",auth, isStudent, verifyPayment)
// router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);
router.get("/getkey" , getapikey ) ;
router.post("/verifypayment", verifyPayment ) ;
module.exports = router ;
