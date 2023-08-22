import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller.js";
import { checkDuplicatedUserNameOrEmail, checkRolesExisted } from "../middlewares/verifySignup.js";
import { verifyToken } from "../middlewares/authJwt.js";
const router = Router();

router.post('/signup', [checkDuplicatedUserNameOrEmail, checkRolesExisted], signup);
router.post('/signin', signin);
router.get('/verify', verifyToken);

export default router;