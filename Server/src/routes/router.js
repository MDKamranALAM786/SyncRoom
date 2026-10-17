import { Router } from "express";
import authRouter from "./auth.js";

const router = Router();
router.use((req, res, next) => {
    console.log("\nRouted to global router");
    next();
});

router.use("/auth", authRouter);

export default router;

