import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["student", "recruiter"],
        required: true
    },
    profile:{
        bio:{type: String},
        skills:[{type: String}],
        resume:{type: String}, // url of my remume
        resumeOriginalName: {type: String},
        company:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company"},
        profilePhoto:{
            type: String,
            default: "default_profile_photo.png"
        }
    },
},{
    timestamps: true
});

export const User = mongoose.model("User", userSchema);

