import mongoose from "mongoose";

const playListsSchema = new mongoose.Schema(
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

const PlayLists = mongoose.model("PlayLists", playListsSchema, "playlists");

export default PlayLists;