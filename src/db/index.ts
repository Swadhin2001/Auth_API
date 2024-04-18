import mongoose from 'mongoose'
import 'dotenv/config'
import { log } from 'console'


async function connectDB (){
    try {
        await mongoose.connect (`${process.env.MONGODB_URI}`);
        log ("DB connected successfully");
    } 
    catch (error) {
        log ("MongoDB connection failure: ", error);    
    }
}

export default connectDB();