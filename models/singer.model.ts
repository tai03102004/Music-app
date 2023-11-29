import mongoose from "mongoose";

const singerSchema = new mongoose.Schema(
    {
        fullName: String,
        avatar: String,
        status: String,
        slug: String, // Có thể là tên ca sĩ
        deleted: {
        type: Boolean,
        default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

const Singer = mongoose.model("Singer", singerSchema, "singers");

export default Singer;