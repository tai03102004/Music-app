"use strict";
exports.__esModule = true;
exports.homeRoutes = void 0;
var express_1 = require("express");
var router = express_1.Router();
var controller = require("../../controllers/client/home.controller");
router.get("/", controller.home);
exports.homeRoutes = router;
