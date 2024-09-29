import { Request, Response, NextFunction } from 'express';


export const createPost = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.title){
        res.json({
            code: 400,
            message: "Tiêu đề công việc không được để trống!"
        })
        return;
    }
    if (req.body.title.length < 5){
        res.json({
            code: 400,
            message: "Tiêu đề công việc phải có tối thiểu 5 ký tự!"
        })
        return;
    }
    next();
}