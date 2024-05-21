import { Express } from "express";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { homeRoutes } from "./home.route";
import { userRoutes} from "./user.route";
import { favoriteSongRoutes } from "./favorite-song.route";

import { requireAuth } from "../../middlewares/client/auth.middlewares";

import { searchRoutes } from "./search.route";

import { paymentRoutes } from "./payment.route";

import {userMiddleware} from "../../middlewares/client/user.middlewares";


// upload ảnh lên cloudy
import { uploadRoutes } from "./upload.route";

const clientRoutes = (app: Express): void => {
    
    app.use(requireAuth);

    // app.use(userMiddleware);

    // Home
    app.use(`/`, homeRoutes);

    app.use(`/topics`, topicRoutes);

    app.use(`/songs`, songRoutes); 

    app.use(`/favorite-songs`, favoriteSongRoutes); 

    app.use(`/search`, searchRoutes);

    // upload ảnh từ tiny-mce lên cloudinary
    app.use(`/upload`, uploadRoutes);

    // Đăng ký, Đăng nhập
    app.use(`/user`, userRoutes); 

    // Thanh toán
    app.use(`/payment`, paymentRoutes);

};

export default clientRoutes;