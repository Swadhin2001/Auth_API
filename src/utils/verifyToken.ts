import { NextFunction, Request, Response } from "express";
import jwt,{Secret} from 'jsonwebtoken'

interface CustomRequest extends Request {
    user?: any;
}

export function verifyToken(req:CustomRequest, res:Response, next:NextFunction) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access denied. No token provided');
    jwt.verify(token, process.env.JWT_SECRET as Secret, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        req.user = decoded;
        next();
    });
}