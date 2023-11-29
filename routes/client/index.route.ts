import { Express } from "express";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { homeRoutes } from "./home.route";

const clientRoutes = (app: Express): void => {

    app.use(`/`, homeRoutes);
    app.use(`/topics`, topicRoutes);
    app.use(`/song`, songRoutes); 

};

export default clientRoutes;