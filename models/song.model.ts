import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
{
    title: String,
    avatar: String,
    description: String,
    singerId: String, // id ca sĩ
    topicId: String, // chủ đề bài hát
    like: Number,
    lyrics: String,
    audio: String,
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

const Song = mongoose.model("Song", songSchema, "songs");

export default Song;