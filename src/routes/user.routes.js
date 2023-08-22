import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkRolesExisted } from "../middlewares/verifySignup.js";

const router = Router();

router.post('/', [verifyToken, isAdmin, checkRolesExisted], createUser)

export default router;