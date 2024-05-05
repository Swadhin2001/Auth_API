import { RequestHandlerParams } from 'express-serve-static-core';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';
import { User } from '../schema/user.model';

interface CustomRequest extends Request {
    user?: any;
}

const user: RequestHandlerParams = asyncHandler (async (req: CustomRequest, res:Response)=>{
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) return res.status(404).send('User not found');
        res.status(201).json({
            email: user.email,
            location: user.location,
            work_details: user.work_details
        });
        console.log ("User data fetched")
    } catch (error) {
        res.status(400).send('Failed to get user information');
    }
})

export {user}