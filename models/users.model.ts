import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    fullName: String,
    email : String,
    password: String,
    token: String,
    status: String,
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
