import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs"

// signup user controller
export const signUp = async (req, res) => {
    try {
        const { fullName, email, password, bio } = req.body;
        if (!fullName || !email || !password || !bio)
            return res.status(400).json({ success: false, message: "Incomplete details" })

        const existingUser = await User.findOne({ email })

        if (existingUser)
            return res.status(409).json({ success: false, message: "User already exists" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            fullName, email, password: hashedPassword, bio
        })

        const token = generateToken(newUser._id)

        return res.status(201).json({
            success: true,
            userData: newUser,
            token,
            message: "Account created successfully"
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// login user controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userData = await User.findOne({ email })

        if (!userData)
            return res.status(404).json({ success: false, message: "User not found" })

        const isPasswordCorrect = await bcrypt.compare(password, userData.password)
        if (!isPasswordCorrect)
            return res.status(401).json({ success: false, message: "Incorrect password" })

        const token = generateToken(userData._id)

        return res.status(200).json({
            success: true,
            userData,
            token,
            message: "Account login successfully"
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// auth check controller
export const checkAuth = (req, res) => {
    return res.status(200).json({ success: true, user: req.user })
}

// controller to update user details
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body
        const userId = req.user._id

        let updatedUser

        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { bio, fullName },
                { new: true }
            )
        } else {
            const upload = await cloudinary.uploader.upload(profilePic)
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { profilePic: upload.secure_url, bio, fullName },
                { new: true }
            )
        }

        return res.status(200).json({ success: true, user: updatedUser })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
