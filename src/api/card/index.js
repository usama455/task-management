import { Router } from "express";
import { getAllCards, createCard } from "./controller";
import { createCardValidations } from "./middleware";
import { dataValidator } from "../../utils";

const router = new Router();

router.post("/create", createCardValidations, dataValidator, createCard);
router.get("/", getAllCards);

export default router;
