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
exports.favorite = exports.listen = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_songs_model_1 = __importDefault(require("../../models/favorite-songs.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findOne({
        slug: req.params.slugTopic,
        status: "active",
        deleted: false,
    });
    const songs = yield song_model_1.default.find({
        topicId: topic.id,
        status: "active",
        deleted: false,
    }).select("avatar title slug singerId like");
    for (const song of songs) {
        const infoSinger = yield singer_model_1.default.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false,
        });
        song["infoSinger"] = infoSinger;
    }
    res.render("client/pages/songs/list", {
        pageTitle: topic.title,
        songs: songs
    });
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugSong = req.params.slugSong;
        const allSong = yield song_model_1.default.find({
            deleted: false,
        });
        const allSinger = yield singer_model_1.default.find({
            deleted: false,
        });
        const song = yield song_model_1.default.findOne({
            slug: slugSong,
            status: "active",
            deleted: false,
        });
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false,
        }).select("fullName");
        const topic = yield topic_model_1.default.findOne({
            _id: song.topicId,
            deleted: false,
        }).select("title");
        const favoriteSong = yield favorite_songs_model_1.default.findOne({
            songId: song.id
        });
        song["isFavoriteSong"] = favoriteSong ? true : false;
        const favoriteAllSong = yield favorite_songs_model_1.default.find({
            deleted: false,
        }).select("songId");
        res.render("client/pages/songs/detail", {
            pageTitle: "Chi tiết bài hát",
            favoriteSong: favoriteAllSong,
            allSong: allSong,
            allSinger: allSinger,
            song: song,
            singer: singer,
            topic: topic,
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            message: "Lỗi mời bạn xem lại. ",
        });
    }
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        status: "active",
        deleted: false
    });
    const newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
    yield song_model_1.default.updateOne({
        _id: idSong
    }, {
        like: newLike
    });
    res.json({
        code: 200,
        message: "Thành công!",
        like: newLike
    });
});
exports.like = like;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong
    });
    const listen = song.listen + 1;
    yield song_model_1.default.updateOne({
        _id: idSong
    }, {
        listen: listen
    });
    const songNew = yield song_model_1.default.findOne({
        _id: idSong
    });
    res.json({
        code: 200,
        message: "Thành công!",
        listen: songNew.listen
    });
});
exports.listen = listen;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeFavorite = req.params.typeFavorite;
    switch (typeFavorite) {
        case "favorite":
            const existFavoriteSong = yield favorite_songs_model_1.default.findOne({
                songId: idSong
            });
            if (!existFavoriteSong) {
                const record = new favorite_songs_model_1.default({
                    songId: idSong
                });
                yield record.save();
            }
            break;
        case "unfavorite":
            yield favorite_songs_model_1.default.deleteOne({
                songId: idSong
            });
            break;
        default:
            break;
    }
    res.json({
        code: 200,
        message: "Thành công!"
    });
});
exports.favorite = favorite;
