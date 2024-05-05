import { Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../schema/user.model";
import { RequestHandlerParams } from 'express-serve-static-core';

const verify:RequestHandlerParams = asyncHandler (async (req:Request, res:Response)=>{
    const {email,otp} = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');
    if (otp === otp){
        user.isVerified = true;
        await user.save();
        console.log ("verified");
        res.send ('User Verified')
    }
    else {
        return res.send ("User is not Verified");
    }
})

export {verify}