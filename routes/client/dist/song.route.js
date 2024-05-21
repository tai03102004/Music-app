"use strict";
exports.__esModule = true;
exports.songRoutes = void 0;
var express_1 = require("express");
var router = express_1.Router();
var controller = require("../../controllers/client/song.controller");
router.get("/:slugTopic", controller.list);
router.get("/detail/:slugSong", controller.detail);
// Lấy ra kiểu like ( like or dislike )
router.patch("/like/:typeLike/:idSong", controller.like);
router.patch("/listen/:idSong", controller.listen);
router.patch("/favorite/:typeFavorite/:idSong", controller.favorite);
exports.songRoutes = router;
