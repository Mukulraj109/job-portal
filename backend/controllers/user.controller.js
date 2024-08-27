import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const register = async (req,res) =>{
    
    try {
        const {fullName,email,password,phoneNumber,role} = req.body;
        if(!fullName || !email || !password || !phoneNumber || !role){
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        };
        
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "Email already exists.",
                success: false
            });
        }
        const hashPassword = await bcrypt.hash(password,10);
        await User.create({
            fullName,
            email,
            password: hashPassword,
            phoneNumber,
            role,
        })
        res.status(201).json({
            message: "User registered successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req,res) => {
    try {
        const {email, password,role} = req.body;
        if(!email ||!password || !role){
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message: "Invalid email or password.",
                success: false
            });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                message: "Invalid email or password.",
                success: false
            });
        };
        //check role is correct or not
        if(user.role!== role){
            return res.status(403).json({
                message: "account dosen't exist with current role",
                success: false
            });
        }
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly: true, sameSite: 'strict'}).json({
            message: "Logged in successfully.",
            user,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const logOut = (req, res) => {
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req,res) => {
try {
    const {fullName,email,phoneNumber,bio,skills} = req.body;
    const file = req.file;

    //cloudinary codes
    let skillsArray;
    if(skills){
        skillsArray = skills.split(",");
    }

    const userId = req.id;
    let user = await User.findById(userId);
    if(!user){
        return res.status(404).json({
            message: "User not found.",
            success: false
        });
    }
    if(fullName) user.fullName = fullName;
    if(email) user.email = email;
    if(phoneNumber)user.phoneNumber = phoneNumber;
    if(bio) user.profile.bio = bio;
    if(skills) user.profile.skills = skillsArray;

    //resume comes here
    
    await user.save();
    
    user = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
    }
    return res.status(200).json({
        message: "Profile updated successfully.",
        user,
        success: true
    });
} catch (error) {
    
}
}