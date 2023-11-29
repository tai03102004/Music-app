import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
{
    title: String,
    avatar: String,
    description: String,
    status: String,
    slug: String,
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

const Topic = mongoose.model("Topic", topicSchema, "topics");

export default Topic; // default chỉ dùng đc 1 lần và td là ko cần khai báo {} khi import 
