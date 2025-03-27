const express = require('express');


const database = require( "./config/database.js") ;
const {cloudinaryConnect } = require("./config/cloudinary");
const cookieParser = require('cookie-parser');
const cors = require("cors");

const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;
//database connect

const app = express() ;
database.connect();
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Yeh compulsory hai cookie bhejne ke liye
  })
);


app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

cloudinaryConnect();

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})