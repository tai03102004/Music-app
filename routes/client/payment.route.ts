import { Router } from "express"
const route : Router = Router()

import * as controller from "../../controllers/client/payment.controller"

route.get("/", controller.premiumStudentPayment);

route.post("/", controller.premiumStudentPaymentPost);

export const paymentRoutes : Router = route



