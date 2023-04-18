import { Router } from "express";
import user from "./user";
import card from "./card";
import passport from "passport";

const router = new Router();

router.use("/user", user);
router.use("/card", passport.authenticate("jwt", { session: false }), card);

export default router;
