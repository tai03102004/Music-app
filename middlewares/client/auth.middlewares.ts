import Auth from "../../models/users.model";
import { Request , Response,NextFunction } from "express";

export const requireAuth = async (req : Request, res : Response, next: NextFunction) =>{

    const user = await Auth.findOne({
        tokenUser : req.cookies.tokenUser,
        deleted: false
    }).select("-password");
    // để dùng user toàn cục
    
    if(user) {
        res.locals.user = user;
    }
    
    // để lấy id của người phân quyền từ đó có thể cho người đó phù hợp với các lựa chọn

    next();
}