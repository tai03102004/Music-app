"use strict";
exports.__esModule = true;
exports.topicRoutes = void 0;
var express_1 = require("express");
var router = express_1.Router();
var controller = require("../../controllers/client/topic.controller");
router.get("/", controller.topics);
exports.topicRoutes = router;
