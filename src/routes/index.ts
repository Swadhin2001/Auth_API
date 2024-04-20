import express, { NextFunction, Request, Response} from 'express';
import { User } from '../schema/user.model';
import bcrypt from 'bcrypt'
import jwt,{Secret} from 'jsonwebtoken'
import { sendOTP } from '../utils/nodemailerConfig';
import randomstring from 'randomstring'
import 'dotenv/config'
const router = express.Router();

router.use (express.urlencoded({ extended: true }));
router.use (express.json());


const otp = randomstring.generate({
    length: 6,
    charset: ['numeric']
});

interface CustomRequest extends Request {
    user?: any;
}


function verifyToken(req:CustomRequest, res:Response, next:NextFunction) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access denied. No token provided');
    jwt.verify(token, process.env.JWT_SECRET as Secret, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        req.user = decoded;
        next();
    });
}

router.get('/user', verifyToken, async (req:CustomRequest, res) => {
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
});


// Sign Up User Route
router.post('/signup',async (req, res) => {
    try {
        const saltRounds = 10;
        const {email,pass} = req.body
        // console.log (email, pass);
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
});


// Login User Route

router.post('/login', async (req: Request, res: Response) => {
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
});

router.post ('/verify',async (req,res)=>{
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



//User Extra Info adding 
router.post('/info', async (req, res) => {
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
});

export {router}
