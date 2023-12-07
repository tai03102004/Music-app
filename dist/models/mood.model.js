"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moodSchema = new mongoose_1.default.Schema({
    image: String,
    title: String,
    description: String,
    slug: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true,
});
const Mood = mongoose_1.default.model("Mood", moodSchema, "moods");
exports.default = Mood;
