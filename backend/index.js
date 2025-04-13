const express = require("express");
const {app,server} = require("./lib/socket");
const database = require("./config/database.js");
const contactUsRoute = require("./routes/Contact");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const userRoutes = require("./routes/User");
const { cloudinaryConnect } = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const messageRoutes = require('./routes/Message');

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Yeh compulsory hai cookie bhejne ke liye
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/messages",messageRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

server.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})