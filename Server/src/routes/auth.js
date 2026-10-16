import { Router } from "express";
import { signUp, signIn, logout } from "../controller/auth.js";
import { verifyJWT } from "../middleware/auth.js";

const router = Router();
router.use((req, res, next) => {
    console.log("Routed to auth router");
    next();
});

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/logout").post(verifyJWT, logout);

export default router;

