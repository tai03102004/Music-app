"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
const playlists_model_1 = __importDefault(require("../../models/playlists.model"));
const focus_model_1 = __importDefault(require("../../models/focus.model"));
const mood_model_1 = __importDefault(require("../../models/mood.model"));
const home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playlists = yield playlists_model_1.default.find({
        deleted: false,
    });
    const focusPlaylists = yield focus_model_1.default.find({
        deleted: false,
    });
    const moodPlaylists = yield mood_model_1.default.find({
        deleted: false,
    });
    res.render("client/pages/home/home.pug", {
        pageTitle: "Home",
        playlists: playlists,
        focusPlaylists: focusPlaylists,
        moodPlaylists: moodPlaylists,
    });
});
exports.home = home;
