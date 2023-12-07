import {Router } from "express";

const router: Router = Router();

import multer from "multer";

import * as controller from "../../controllers/client/user.controller";

import * as uploadCloud from "../../middlewares/admin/uploadCloud.middlewares";

const upload = multer();

router.get("/signup", controller.signup);
router.post
(   
    "/signup",
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    controller.signupPost
);

router.get("/login", controller.login);
router.post("/login",upload.single("avatar"),uploadCloud.uploadSingle,controller.loginPost);

export const userRoutes: Router = router;
