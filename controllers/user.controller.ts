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
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { User } = require('../models');
// register user 
interface IRegistrationBody {
    username: string;
    email: string;
    password: string;
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
    console.log('env:',process.env.ACTIVATION_SECRET)
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
    const { username, email, phoneNumber, password } = req.body;
    if(email === "" && phoneNumber === ""){
        return next(new ErrorHandler("Please provide one of both to activate your account", 400));
    }
    if(email === "" || password === "" || username ===""){
        return next(new ErrorHandler("Please provide all fields", 400));
    }
    // Tạo người dùng với mật khẩu đã mã hóa
    const user: IRegistrationBody = {
        username,
        email,
        password
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
    }catch(err){
        return next(new ErrorHandler(err, 500));
    }

});
