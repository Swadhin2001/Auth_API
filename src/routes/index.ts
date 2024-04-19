import express, { Request, Response} from 'express';
import { User } from '../schema/user.model';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser';
const router = express.Router();

// router.use (bodyParser.urlencoded({ extended: true }));
router.use (bodyParser.json());


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

                console.log (hash);
                const user = new User({ email, password: hash });
                await user.save();
                res.status(201).send('User registered successfully!');
            });
        });
    } 
    catch (error) {
        console.log (error);
        res.status(400).send('Registration failed. Please try again');
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
        else {
            return res.status(201).send('Login Successfull');            
        }

        // const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        // res.json({ token });
    } 
    catch (error) {
        res.status(400).send('Login failed! Please try again.');
    }
});


// Validate User

router.post('/validate', async (req, res) => {
    try {
        const { email, password, otp, location, age, work_details } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User not found');
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(400).send('Invalid password');
        // Verify OTP logic
        user.location = location;
        user.age = age;
        user.work_details = work_details;
        user.isVerified = true;
        await user.save();
        res.status(200).send('User validated successfully');
    } 
    catch (error) {
        res.status(400).send('Validation failed');
    }
});

export {router}
// module.export = routes