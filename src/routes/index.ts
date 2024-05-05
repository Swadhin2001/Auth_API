import express from 'express';
import 'dotenv/config'
import { login } from '../controllers/login.controller';
import { signup } from '../controllers/signup.controller';
import { verify } from '../controllers/verify.controller';
import { info } from '../controllers/info.controller';
import { user } from '../controllers/user.controller';
import { verifyToken } from '../utils/verifyToken';
const router = express.Router();

router.use (express.urlencoded({ extended: true }));
router.use (express.json());



// Get user details route
router.route('/user').get(verifyToken, user);

// Sign Up User Route
router.route ('/signup').post (signup);

// Login User Route
router.route ('/login').post(login);

// User Verification Route
router.route ('/verify').post (verify);

// User Extra Info adding route
router.route('/info').post(info);

export {router}
