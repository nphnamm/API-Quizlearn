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
import { UserAttributes } from "../models/user";
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
    console.log('user...',User); // Thêm dòng này để kiểm tra đối tượng User

    const userAlready = await User.findOne({ where: { email } });
    if(userAlready){
        return next(new ErrorHandler("Email already exists", 400));
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
        return next(new ErrorHandler(error.message, 500))

    }
});
