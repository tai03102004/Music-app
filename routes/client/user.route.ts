import {Router } from "express";

const router: Router = Router();

import multer from "multer";

import * as controller from "../../controllers/client/user.controller";

import * as uploadCloud from "../../middlewares/admin/uploadCloud.middlewares";

const upload = multer();

router.get("/signup", controller.signup);
router.get("/logout", controller.logout);

router.get("/premium",controller.premium);

router.get("/premium/individual",controller.premiumIndividual);
router.get("/premium/student",controller.premiumStudent);
router.get("/premium/student/verification",controller.premiumStudentVerification);

router.post
(   
    "/signup",
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    controller.signupPost
);

router.get("/login", controller.login);
router.post("/login",controller.loginPost);

export const userRoutes: Router = router;
