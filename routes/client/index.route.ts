import { Express } from "express";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { homeRoutes } from "./home.route";
import { userRoutes} from "./user.route";
import { favoriteSongRoutes } from "./favorite-song.route";

import { requireAuth } from "../../middlewares/client/auth.middlewares";

import { searchRoutes } from "./search.route";

const clientRoutes = (app: Express): void => {
    
    app.use(requireAuth);

    // Home
    app.use(`/`, homeRoutes);

    app.use(`/topics`, topicRoutes);

    app.use(`/songs`, songRoutes); 

    app.use(`/favorite-songs`, favoriteSongRoutes); 

    app.use(`/search`, searchRoutes);

    // Đăng ký, Đăng nhập
    app.use(`/user`, userRoutes); 

};

export default clientRoutes;