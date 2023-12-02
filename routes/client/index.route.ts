import { Express } from "express";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { homeRoutes } from "./home.route";
import { userRoutes} from "./user.route";


const clientRoutes = (app: Express): void => {
    // Home
    app.use(`/`, homeRoutes);

    app.use(`/topics`, topicRoutes);

    app.use(`/songs`, songRoutes); 

    // Đăng ký, Đăng nhập
    app.use(`/user`, userRoutes); 

};

export default clientRoutes;