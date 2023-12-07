import { Request,Response } from "express";
import md5 from "md5";
import {generateRandomString} from "../../helper/generate";
import User from "../../models/users.model";

// [GET]/user/signup

export const signup = async (req:Request, res:Response) => {
    res.render("client/pages/user/signup.pug",{
        pageTitle: "SignUp",
    });
}

// [POST]/user/signup

export const signupPost = async (req:Request, res:Response) => {
    try {
        const users = await User.find({
            deleted: false,
        })
        for (const user of users) {
            if (user.userName == req.body.userName) {
                req.flash("error", "Tên đăng nhập đã được sử dụng. Vui lòng chọn tên đăng nhập khác.");
                res.redirect("back");
                return;
            }
        }
        req.body.password = md5(req.body.password);

        const dataUser = {
            fullName: req.body.fullName,
            userName : req.body.userName, // Email or username
            password : req.body.password, // Password
            avatar: req.body.avatar
        };
        console.log(dataUser);
        const user = new User(dataUser);
        await user.save();
        res.redirect("/user/login");
        
    } catch(err) {
        console.log("Error: " + err);
        res.redirect('back');
    }
}

// [GET]/user/login

export const login = async (req:Request, res:Response) => {
    res.render("client/pages/user/login.pug",{
        pageTitle: "Login",
    });
}

// [POST]/user/login

export const loginPost = async (req:Request, res:Response) => {
    try{
        const userName = req.body.userName;
        const user = await User.findOne({
            userName : userName,
            deleted: false,
        });
        req.body.password = (md5)(req.body.password);
        if (user){
            if (user.status == "inactive") {
                req.flash("error", "Tài khoản không tồn tại");
                res.redirect("back");
                return;
            }
            if (user.status == "inactive") {
                req.flash("error", "Tài khoản không tồn tại");
                res.redirect("back");
                return;
            }
            if (userName === user.userName) {
                if (req.body.password !== user.password) {
                    req.flash("error", "Mật khẩu bạn nhập không chính xác.");
                    res.redirect('back');
                    return;
                } else {
                    res.cookie("tokenUser", user.tokenUser,{ expires: new Date(Date.now() + 90000000)});
                    req.flash("success", "Đăng nhập thành công.");
                    res.redirect('/');
                    return;
                }
            }
        } 
        else {
            req.flash("error", "Tài khoản hoặc mật khẩu không đúng.");
            res.redirect('back');
            return;
        }
    } catch(err){
        console.log("Error: " + err);
        res.redirect('back');
    }
}
