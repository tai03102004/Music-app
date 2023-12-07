"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPost = exports.login = exports.signupPost = exports.signup = void 0;
const md5_1 = __importDefault(require("md5"));
const users_model_1 = __importDefault(require("../../models/users.model"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/signup.pug", {
        pageTitle: "SignUp",
    });
});
exports.signup = signup;
const signupPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_model_1.default.find({
            deleted: false,
        });
        for (const user of users) {
            if (user.userName == req.body.userName) {
                req.flash("error", "Tên đăng nhập đã được sử dụng. Vui lòng chọn tên đăng nhập khác.");
                res.redirect("back");
                return;
            }
        }
        req.body.password = (0, md5_1.default)(req.body.password);
        const dataUser = {
            fullName: req.body.fullName,
            userName: req.body.userName,
            password: req.body.password,
            avatar: req.body.avatar
        };
        console.log(dataUser);
        const user = new users_model_1.default(dataUser);
        yield user.save();
        res.redirect("/user/login");
    }
    catch (err) {
        console.log("Error: " + err);
        res.redirect('back');
    }
});
exports.signupPost = signupPost;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/login.pug", {
        pageTitle: "Login",
    });
});
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userName = req.body.userName;
        const user = yield users_model_1.default.findOne({
            userName: userName,
            deleted: false,
        });
        req.body.password = (md5_1.default)(req.body.password);
        if (user) {
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
                }
                else {
                    res.cookie("tokenUser", user.tokenUser, { expires: new Date(Date.now() + 90000000) });
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
    }
    catch (err) {
        console.log("Error: " + err);
        res.redirect('back');
    }
});
exports.loginPost = loginPost;
