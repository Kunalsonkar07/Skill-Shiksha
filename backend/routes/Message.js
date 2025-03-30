
const express = require('express');
const router = express.Router();
const { auth } = require("../middlewares/auth");

const {getMessages,getUsersForSidebar,sendMessage} = require('../controllers/Message');

router.get('/users',getUsersForSidebar);
router.get('/:id',getMessages);

router.post('/send/:id',sendMessage);

module.exports = router;