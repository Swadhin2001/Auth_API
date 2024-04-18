import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: String,
    age: Number,
    work_details: String,
    isVerified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);