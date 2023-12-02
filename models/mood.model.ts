import mongoose from "mongoose";

const moodSchema = new mongoose.Schema(
    {
        image: String,
        title: String,
        description: String,
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

const Mood = mongoose.model("Mood", moodSchema, "moods");

export default Mood;