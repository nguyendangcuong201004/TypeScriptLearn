import { Request, Response } from "express";
import md5 from "md5"  

import User from "../models/user.model"
import ForgotPassword from "../models/forgot-password.model";
import * as generateHelper from "../../helpers/generate.helper"
import * as sendEmailHelper from "../../helpers/sendmail.helper"

// [POST] /v1/users/register
export const register = async (req: Request, res: Response): Promise<void> => {

    const exitEmail = await User.findOne({
        email: req.body.email,
        deleted: false,
    })

    if (exitEmail){
        res.json ({
            "code": 400,
            message: "Email đã tồn tại!"
        })
        return;
    }

    const dataUser = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        token: generateHelper.generateRandomString(20)
    }

    const user = new User(dataUser);
    await user.save();

    const token = user.token;

    res.json ({
        "code": 200,
        token: token,
        message: "Đăng ký tài khoản thành công!"
    })
}


// [POST] /v1/users/login
export const login = async (req: Request, res: Response): Promise<void> => {
    const email = req.body.email;
    const password = req.body.password;

    const exitUser = await User.findOne({
        email: email,
        deleted: false,
    })

    if (!exitUser){
        res.json ({
            "code": 400,
            message: "Email không tồn tại!"
        })
        return;
    }

    if(md5(password) != exitUser.password){
        res.json ({
            "code": 400,
            message: "Sai mật khẩu!"
        })
        return;
    }

    const token = exitUser.token;

    res.json ({
        "code": 200,
        token: token,
        message: "Đăng nhập thành công!"
    })
}

// [POST] /v1/users/password/forgot
export const passwordForgot = async (req: Request, res: Response): Promise<void> => {

    const email = req.body.email;
    
    const exitUser = await User.findOne({
        email: email,
        deleted: false,
    })

    if (!exitUser){
        res.json ({
            "code": 400,
            message: "Email không tồn tại!"
        })
        return;
    }

    const otp = generateHelper.generateRandomNumber(6);

    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now() + 3*60*1000,
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();


    const subject = "Lấy lại mật khẩu";
    const text = `Mã OTP xác thực tài khoản của bạn là: ${otp}. \nMã OTP có hiệu lực trong vòng 3 phút. Vui lòng không cung cấp mã OTP này cho bất kỳ ai.`;

    sendEmailHelper.sendEmail(email, subject, text)
    
    
    res.json({
        code: 200,
        message: "OTP đã được gửi qua email!"
    })
}

// [POST] /v1/users/password/otp
export const passwordOtp = async (req: Request, res: Response): Promise<void> => {

    const email = req.body.email;
    const otp = req.body.otp;

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp,
    })

    if (!result){
        res.json({
            code: 400,
            message: "OTP không hợp lệ!"
        });
        return;
    }

    const user = await User.findOne({
        email: email,
    })

    let token = "";

    if (user){
        token = `${user.token}`;
    }

    res.json({
        code: 200,
        token: token,
        message: "Xác thực thành công!"
    })
}

// [POST] /v1/users/password/otp
export const passwordReset = async (req: Request, res: Response): Promise<void> => {

    const token = req.body.token;
    const password = req.body.password;

    const user = await User.findOne({
        token: token,
        deleted: false,
    })

    if (user) {
        await User.updateOne({
            token: token,
            deleted: false,
        }, {
            password: md5(password)
        })
    
        res.json({
            code: 200,
            message: "Đổi mật khẩu thành công!"
        })
    }
    else{
        res.json({
            code: 400,
            message: "Đã xảy ra lỗi!"
        })
    }

}

// [GET] /v1/users/detail
export const detail = async (req: Request, res: Response): Promise<void> => {
    res.json({
        code: 200,
        message: "Thông tin người dùng:",
        user: res.locals.user
    })
}

// [GET] /v1/users/list
export const listUser = async (req: Request, res: Response): Promise<void> => {
    
    const users = await User.find({
        deleted: false,
    }).select("fullName email")

    res.json({
        code: 200,
        message: "Danh sách người dùng do frontend show ra^^",
        users: users
    })
}