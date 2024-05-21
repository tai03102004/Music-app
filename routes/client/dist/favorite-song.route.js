"use strict";
exports.__esModule = true;
exports.favoriteSongRoutes = void 0;
var express_1 = require("express");
var router = express_1.Router();
var controller = require("../../controllers/client/favorite-song.controller");
router.get("/", controller.index);
exports.favoriteSongRoutes = router;
