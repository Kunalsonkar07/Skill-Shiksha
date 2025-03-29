const express = require("express")
const router = express.Router()

const {
  login,
  signup,
  sendotp,
  changePassword,
} = require("../controllers/Auth")


const { auth } = require("../middlewares/auth")

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

module.exports = router 