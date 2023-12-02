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
        console.log(req.body);
        const name = req.body.name; // Ten
        const username = req.body.username; // Email or username
        const password = req.body.password; // Password
        // const users = await User.find({
        //     deleted: false,
        // })
        // for (const user of users) {
        //     if (user.email === username) {
        //         // req.flash("error", "Tên đăng nhập đã được sử dụng. Vui lòng chọn tên đăng nhập khác.");
        //         res.redirect("back");
        //         return;
        //     }
        // }
        res.redirect('/');
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
    console.log(req.body);
    res.redirect('/');
}
