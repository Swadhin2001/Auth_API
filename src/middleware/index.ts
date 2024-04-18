import {Request, Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export function verifyToken(req: Request, res: Response, next:NextFunction) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access denied. No token provided');
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        req.user = decoded;
        next();
    });
}