import { RequestHandlerParams } from 'express-serve-static-core';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { sendOTP } from '../utils/nodemailerConfig';
import { User } from '../schema/user.model';
import randomstring from 'randomstring'


const otp = randomstring.generate({
    length: 6,
    charset: ['numeric']
});

const signup: RequestHandlerParams = asyncHandler ((req: Request, res: Response)=>{
    try {
        const saltRounds = 10;
        const {email,pass} = req.body
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) 
                console.log ("gensalt Error: ", err);

            bcrypt.hash(pass, salt,async function(err, hash) {
                if (err) {
                    console.log ("hash Error: ", err);
                    return;
                }
                
                sendOTP(email, otp);
                const user = new User({ email, password: hash });
                await user.save();
                res.status(201).send('User registered successfully!');
            });
        });
    } 
    catch (error) {
        console.log (error);
        return res.status(400).send('Registration failed. Please try again');
    }
})

export {signup}