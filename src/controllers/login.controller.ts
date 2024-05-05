import { Request, Response} from 'express';
import { asyncHandler } from "../utils/asyncHandler";
import { User } from '../schema/user.model';
import bcrypt from 'bcrypt'
import jwt,{Secret} from 'jsonwebtoken'
import { RequestHandlerParams } from 'express-serve-static-core';


const login:RequestHandlerParams = asyncHandler (async (req:Request,res: Response)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).send('Invalid Password');
        }
        if (!user.isVerified){
            return res.send ("User is not Verified");
        }
        const token = jwt.sign ({email: user.email}, process.env.JWT_SECRET as Secret);
        return res.status(201).json({token});
    } 
    catch (error) {
        res.status(400).send('Login failed! Please try again.');
    }
})

export {login}