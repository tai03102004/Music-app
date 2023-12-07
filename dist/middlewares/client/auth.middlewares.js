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
exports.requireAuth = void 0;
const users_model_1 = __importDefault(require("../../models/users.model"));
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.default.findOne({
        tokenUser: req.cookies.tokenUser,
        deleted: false
    }).select("-password");
    if (user) {
        res.locals.user = user;
    }
    next();
});
exports.requireAuth = requireAuth;
