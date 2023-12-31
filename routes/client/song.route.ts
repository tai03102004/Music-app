import {Router} from "express";

const router: Router = Router();

import * as controller from "../../controllers/client/song.controller";

router.get("/:slugTopic", controller.list);

router.get("/detail/:slugSong", controller.detail);

// Lấy ra kiểu like ( like or dislike )

router.patch("/like/:typeLike/:idSong",controller.like);

router.patch("/listen/:idSong", controller.listen);

router.patch("/favorite/:typeFavorite/:idSong", controller.favorite);

export const songRoutes: Router = router;