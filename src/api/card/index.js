import { Router } from "express";
import { getAllCards, createCard } from "./controller";

const router = new Router();

router.post("/create", createCard);
router.get("/", getAllCards);

export default router;
