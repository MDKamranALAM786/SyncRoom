import { Router } from "express";
import { signUp, signIn } from "../controller/auth.js";

const router = Router();
router.use((req, res, next) => {
    console.log("Routed to auth router");
    next();
});

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);

export default router;

