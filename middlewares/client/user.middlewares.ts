import User from "../../models/users.model";

import { Request , Response,NextFunction } from "express";


// Khi đăng xuất sẽ chuyển sang trang đăng nhập
export const userMiddleware = async (req : Request, res : Response, next: NextFunction) => {
    // Khii ko đăng nhâp sẽ bị out ra trang login
    if(!req.cookies.tokenUser) {
        res.redirect(`/user/login`);
        return;
    }
    // Nếu ko có user sẽ bị out ra trang login

    const user = await User.findOne({
        tokenUser: req.cookies.tokenUser
    });

    if(!user) {
        res.redirect(`/auth/login`);
        return;
    }

    next();
}