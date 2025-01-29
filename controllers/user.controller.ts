require('dotenv');
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";;
import ErrorHandler from "../utils/errorHandler";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs"
import path from "path"
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";
import { json } from "stream/consumers";
import cloudinary from "cloudinary";
import { v4 as uuidv4 } from 'uuid';
import sendMail from "../utils/sendMail";
import user, { UserAttributes } from "../models/user";
const bcrypt = require('bcrypt');
const saltRounds = 10;
import db from '../models/index';
const User = db.User;
console.log('User:', User); // Thêm dòng này để kiểm tra đối tượng User
// register user 
interface IRegistrationBody {
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    statusId: number;
    avatar?: string;

}

interface IForgotBody {

    email: string;

}

interface IActivationToken {
    token: string;
    activationCode: string;
}


export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    console.log('env:', process.env.ACTIVATION_SECRET)
    const token = jwt.sign({
        user,
        activationCode,
    }, process.env.ACTIVATION_SECRET as Secret
        , {
            expiresIn: "5m"
        });
    return { token, activationCode }
}

export const registrationUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { username, firstName, lastName, email, phoneNumber, password, avatar, statusId } = req.body;
    if (email === "" && phoneNumber === "") {
        return next(new ErrorHandler("Please provide one of both to activate your account", 400));
    }
    if (email === "" || password === "" || username === "") {
        return next(new ErrorHandler("Please provide all fields", 400));
    }
    console.log('email:', email)
    console.log('user...', User); // Thêm dòng này để kiểm tra đối tượng User

    const userAlready = await User.findOne({ where: { email } });
    if (userAlready) {
        return next(new ErrorHandler("Email already exists", 400));
    }
    // Check if the phoneNumber already exists
    if (phoneNumber) {
        const userAlreadyByPhoneNumber = await User.findOne({ where: { phoneNumber } });
        if (userAlreadyByPhoneNumber) {
            return next(new ErrorHandler("Phone number already exists", 400));
        }
    }

    // Check if the userName already exists
    if (username) {
        const userAlreadyByUserName = await User.findOne({ where: { username } });
        if ( userAlreadyByUserName) {
            return next(new ErrorHandler("Username number already exists", 400));
        }
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Tạo người dùng với mật khẩu đã mã hóa
    const user: IRegistrationBody = {
        username,
        firstName,
        lastName,
        phoneNumber,
        avatar,
        statusId,
        email,
        password: hashedPassword
    }

    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;
    const data = {
        user: {
            name: user.username,
        },
        activationCode
    }
    const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data)
    try {
        sendMail({
            email: user.email,
            subject: "Account Activation",
            template: "activation-mail.ejs",
            data
        });
        res.status(201).json({ success: true, message: "Please check your email to activate your account", activationToken: activationToken.token });
    } catch (err) {
        return next(new ErrorHandler(err, 500));
    }

});



// activate   user
interface IActivationRequest {
    activation_token: string;
    activation_code: string
}

export const activateUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { activation_token, activation_code } = req.body as IActivationRequest;
        // using jwt to verify and get activation code 
        const newUser: { user: UserAttributes; activationCode: string } = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET as string
        ) as { user: UserAttributes; activationCode: string };

        if (newUser.activationCode !== activation_code) {
            return next(new ErrorHandler("Invalid activation code", 400));


        }
        const {
            username,
            firstName,
            lastName,
            phoneNumber,
            avatar,
            statusId,
            email,
            password
        } = newUser.user;

        const user = await User.create({
            username,
            firstName,
            lastName,
            phoneNumber,
            avatar,
            statusId,
            email,
            password
        });
        res.status(201).json({
            user,
            success: true
        })



    } catch (error: any) {
        console.log('err', error)
        return next(new ErrorHandler(error.message, 500))

    }
});

// login
export const loginUser = CatchAsyncError(async(req:Request, res:Response,next:NextFunction)=>{
    const {email,password} = req.body;
    if (email === "" && password === "") {
        return next(new ErrorHandler("Please provide your email and password to login your account", 400));
    }
    console.log(email,password);
    const user = await User.findOne({ where: { email } });
    if(!user){
        return next(new ErrorHandler("User doesn't exists", 400));

    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    sendToken(user, 200, res);

});



// logout
// forgot password
// activation forgot password
// update information
// authentication
// update access token 
// socialAuth
// update profile picture
// delete user
// me