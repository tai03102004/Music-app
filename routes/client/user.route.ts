import {Router } from "express";

const router: Router = Router();

import * as controller from "../../controllers/client/user.controller";

router.get("/signup", controller.signup);
router.post("/signup",controller.signupPost);

router.get("/login", controller.login);
router.post("/login",controller.loginPost);

export const userRoutes: Router = router;
