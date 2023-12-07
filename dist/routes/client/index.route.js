"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const home_route_1 = require("./home.route");
const user_route_1 = require("./user.route");
const favorite_song_route_1 = require("./favorite-song.route");
const auth_middlewares_1 = require("../../middlewares/client/auth.middlewares");
const search_route_1 = require("./search.route");
const clientRoutes = (app) => {
    app.use(auth_middlewares_1.requireAuth);
    app.use(`/`, home_route_1.homeRoutes);
    app.use(`/topics`, topic_route_1.topicRoutes);
    app.use(`/songs`, song_route_1.songRoutes);
    app.use(`/favorite-songs`, favorite_song_route_1.favoriteSongRoutes);
    app.use(`/search`, search_route_1.searchRoutes);
    app.use(`/user`, user_route_1.userRoutes);
};
exports.default = clientRoutes;
