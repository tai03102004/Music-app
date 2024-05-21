import { Router } from "express";
import multer from "multer";
const router: Router = Router();

import * as controller from "../../controllers/client/upload.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middlewares";

const upload = multer();

router.post(
    "/",
    upload.single("file"),
    uploadCloud.uploadSingle,
    controller.index
);

export const uploadRoutes: Router = router;