"use strict";
exports.__esModule = true;
var topic_route_1 = require("./topic.route");
var song_route_1 = require("./song.route");
var home_route_1 = require("./home.route");
var user_route_1 = require("./user.route");
var favorite_song_route_1 = require("./favorite-song.route");
var auth_middlewares_1 = require("../../middlewares/client/auth.middlewares");
var search_route_1 = require("./search.route");
// upload ảnh lên cloudy
var upload_route_1 = require("./upload.route");
var clientRoutes = function (app) {
    app.use(auth_middlewares_1.requireAuth);
    // app.use(userMiddleware);
    // Home
    app.use("/", home_route_1.homeRoutes);
    app.use("/topics", topic_route_1.topicRoutes);
    app.use("/songs", song_route_1.songRoutes);
    app.use("/favorite-songs", favorite_song_route_1.favoriteSongRoutes);
    app.use("/search", search_route_1.searchRoutes);
    // upload ảnh từ tiny-mce lên cloudinary
    app.use("/upload", upload_route_1.uploadRoutes);
    // Đăng ký, Đăng nhập
    app.use("/user", user_route_1.userRoutes);
};
exports["default"] = clientRoutes;
