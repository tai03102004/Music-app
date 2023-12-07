import mongoose from "mongoose";
import * as generate from "../helper/generate";

const userSchema = new mongoose.Schema(
{
    fullName: String,
    userName : String,
    password: String,
    token: String,
    status: String,
    avatar: String,
    tokenUser: {
        type : String,
        default: generate.generateRandomString(31),
    }, // String random duy nhất để trả về fontend lưu trong Cookie
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
},
    { timestamps: true }
);
// Định nghĩa model product (tên model , schema(các thuộc tính models) , tên collection)

const  User = mongoose.model(
    "User",
    userSchema,
    "users"
);

export default User;
