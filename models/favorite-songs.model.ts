import mongoose from "mongoose";

const favoriteSongSchema = new mongoose.Schema(
  {
    userId: String, // Tài khoản người dùng
    songId: String, // bài hát yêu thích
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

const FavoriteSong = mongoose.model("FavoriteSong", favoriteSongSchema, "favorite-songs");

export default FavoriteSong;