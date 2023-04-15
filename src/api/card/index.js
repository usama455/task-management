import { Router } from 'express';
import { getAllCards,createCard } from './controller';
import passport from 'passport';


const router = new Router();

router.post("/create",  passport.authenticate("jwt", { session: false }),createCard)

router.get("/",  passport.authenticate("jwt", { session: false }),getAllCards)

export default router;
