import mongoose from "mongoose";

const focusSchema = new mongoose.Schema(
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

const Forcus = mongoose.model("Forcus", focusSchema, "focus");

export default Forcus;