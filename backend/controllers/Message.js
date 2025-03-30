const User = require('../models/User');
const Message = require('../models/Message');
const dotenv = require('dotenv');
const cloudinary =  require('../lib/cloudi');
const { getReceiverSocketId,io } = require('../lib/socket');

dotenv.config();

exports.getUsersForSidebar = async (req,res)=>{
    // console.log("Heloo jee hello jee");
    try{
        
        const { userId } = req.query;
        // console.log("Id: ",userId);

        const filteredUsers = await User.find({ _id: { $ne: userId } });
        // console.log("user filtered",filteredUsers);

        res.status(200).json(filteredUsers);
    }catch(error){
        console.error("error in getting users for sidebar",error.message);
        return res.status(500).json({ error: "Internal Server Error for getUsersForSidebar" });
    }
};

exports.getMessages = async (req,res) => { 
    try{
        const { id : userToChatId} = req.params;
        const { userId :myId } = req.query;

        const messages = await Message.find({
            $or: [
              { senderId: myId, receiverId: userToChatId },
              { senderId: userToChatId, receiverId: myId },
            ],
          });

        res.status(200).json(messages);

    }catch(error){
        console.error("error in getting messages",error.message);
        return res.status(500).json({ error: "Internal Server Error for getMessages" });
    }
};

exports.sendMessage = async (req,res) => {

    try{

        const {text,image,senderId} = req.body;
        const { id : receiverId } = req.params;

        let imageUrl;
        if(image){
            const response = await cloudinary.uploader.upload(image);
            imageUrl = response.secure_url;
        }

        const newMessage = new Message({
            text : text,
            image : imageUrl,
            senderId : senderId,
            receiverId : receiverId,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        res.status(201).json(newMessage);

    }catch(error){
        console.error("error in sending message",error.message);
        return res.status(500).json({ error: "Internal Server Error for sendMessage" });
    }
};