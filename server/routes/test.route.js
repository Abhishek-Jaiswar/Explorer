import { Router } from "express";
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/test.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router()

router.get("/should-be-loggedin", verifyToken, shouldBeLoggedIn)

router.get("/should-be-admin", shouldBeAdmin)



export default router