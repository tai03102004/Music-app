import { Express } from "express";
import { dashboardRoutes } from "./dashboard.route";
import { systemConfig } from "../../config/config";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { uploadRoutes } from "./upload.route";

const adminRoutes = (app: Express): void => {
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;
    // dashboard
    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoutes);

    // topic
    app.use(`${PATH_ADMIN}/topics`, topicRoutes);

    // song
    app.use(`${PATH_ADMIN}/songs`, songRoutes);

    // upload ảnh từ tiny-mce lên cloudinary
    app.use(`${PATH_ADMIN}/upload`, uploadRoutes);
};

export default adminRoutes;