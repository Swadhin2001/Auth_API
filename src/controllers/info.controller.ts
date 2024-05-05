import { RequestHandlerParams } from 'express-serve-static-core';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';
import { User } from '../schema/user.model';

const info: RequestHandlerParams = asyncHandler (async (req:Request, res:Response)=>{
    try {
        const {email,location,work_details } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User not found');

        if (!user.isVerified){
            return res.send ("User is not verified");
        }
        user.location = location;
        user.work_details = work_details;
        await user.save();
        res.status(200).send('User details added successfully');
    } 
    catch (error) {
        res.status(400).send('User details adding failed');
    }
})

export {info}