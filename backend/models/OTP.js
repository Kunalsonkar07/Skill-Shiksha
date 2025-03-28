const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require('../mail/templates/emailVerificationTemplates');

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

async function sendVerificationEmail(email, otp) {
	try {
		const template = emailTemplate(otp); // Assuming the template function returns the email body
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			template // Use the templated email content
		);
		console.log("Email sent successfully: ", mailResponse );
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

module.exports = mongoose.model("OTP", OTPSchema);
