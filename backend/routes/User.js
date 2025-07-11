const express = require("express")
const router = express.Router()

const {
  login,
  googlelogin,
  signup,
  sendotp,
  changePassword,
} = require("../controllers/Auth")

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword")

const { auth } = require("../middlewares/auth")

// Route for user login
router.post("/login", login)

router.post("/googleLogin", googlelogin)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)


// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)


module.exports = router 