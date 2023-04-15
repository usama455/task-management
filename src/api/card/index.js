import { Router } from 'express';
import { getAll } from './controller';
import passport from 'passport';


const router = new Router();

router.post("/create",  passport.authenticate("jwt", { session: false }),getAll)

router.get("/",  passport.authenticate("jwt", { session: false }),getAll)

export default router;
