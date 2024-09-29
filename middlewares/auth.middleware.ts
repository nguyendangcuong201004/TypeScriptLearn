import User from "../v1/models/user.model"
import { Request, Response, NextFunction } from "express";

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    if (!req.headers.authorization){
        res.json({
            code: 400,
            message: 'Vui lòng lòng gửi lên token!'
        });
        return;
    }

    const token = req.headers.authorization.split(" ")[1];

    const user = await User.findOne({
        token: token,
        deleted: false,
    }).select("fullName email")

    if (!user){
        res.json({
            code: 400,
            message: 'Không có dữ liệu về người dùng!'
        });
        return;
    }

    res.locals.user = user;

    next();
}