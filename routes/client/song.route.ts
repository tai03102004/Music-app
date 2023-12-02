import {Router} from "express";

const router: Router = Router();

import * as controller from "../../controllers/client/song.controller";

router.get("/:slugTopic", controller.list);

router.get("/detail/:slugSong", controller.detail);

// Lấy ra kiểu like ( like or dislike )

router.patch("/like/:typeLike/:idSong",controller.like);

export const songRoutes: Router = router;