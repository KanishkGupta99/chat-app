import cloudinary from "../lib/cloudinary.js"
import Message from "../models/Message.js"
import User from "../models/User.js"
import { userSocketMap, io } from "../server.js"

export const getUsersForSidebar=async (req,res)=>{
    try {
        const userId=req.user._id
        const remainingUsers=await User.find({_id:{$ne:userId}}).select("-password")

        //count number of messages not seen
        const unseenMessages={}
        const promises=remainingUsers.map(async (user)=>{
            const messages=await Message.find({senderId:user._id,receiverId:userId,seen:false})
            if(messages.length>0){
                unseenMessages[user._id]=messages.length
            }
        })

        await Promise.all(promises)

        return res.status(200).json({success: true, remainingUsers, unseenMessages})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

//get messages for selected user
export const getMessages=async (req,res)=>{
    try {
        const {id:selectedUserId}=req.params
        const myId=req.user._id

        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId: selectedUserId},
                {senderId: selectedUserId,receiverId:myId}
            ]
        })

        //mark the messages sent to me as seen
        await Message.updateMany(
            {senderId: selectedUserId, receiverId:myId, seen:false},
            {seen: true}
        )

        return res.status(200).json({success:true, messages})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

//mark message as seen using message id
export const markMessageAsSeen=async (req,res)=>{
    try {
        const {id}=req.params
        await Message.findByIdAndUpdate(id,{seen:true})
        return res.status(200).json({success:true})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

//send messages to selected user
export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body
        const receiverId=req.params.id
        const senderId=req.user._id

        let imageUrl
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image)
            imageUrl=uploadResponse.secure_url
        }

        const newMessage=await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        //emit the new message to the receiver socket
        const receiverSocketId=userSocketMap[receiverId]
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        return res.status(200).json({success:true,newMessage})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}
