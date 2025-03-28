const mongoose = require("mongoose");

// Define the Profile schema
const SubSectionSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	timeDuration: {
		type: String,
	},
	videoUrl: {
        type:String,
	},
});

// Export the Profile model
module.exports = mongoose.model("SubSection", SubSectionSchema);