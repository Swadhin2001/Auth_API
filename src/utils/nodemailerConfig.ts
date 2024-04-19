import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport ({
    host: 'smtp.gmail.com',
    auth:{
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_EMAIL_PASS,
    }
})

transporter.verify ((err, success)=>{
    if (err){
        console.log (err);
    }
    else{
        console.log ("Ready for message")
        console.log (success);
    }
})

export function sendOTP(email:string, otp:string) {
    const mailOptions = {
        from: 'swadhinpaul248@gmail.com', 
        to: email,
        subject: 'OTP for Verification',
        text: `Your OTP for sign up is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
