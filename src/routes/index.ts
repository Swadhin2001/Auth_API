import express, { Request, Response } from 'express';
import { User } from '../schema/user.model';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const app = express();

app.post('/login', async (req: Request, res: Response) => {
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

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        res.json({ token });
    } 
    catch (error) {
        res.status(400).send('Login failed! Please try again.');
    }
});