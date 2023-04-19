import { body } from "express-validator";

export const createCardValidations = [
  body("title").notEmpty().withMessage("Title is required."),
  body("project")
    .isIn(["General", "Design", "Development", "Marketing"])
    .withMessage(
      "Project must be one of: General , Design, Development, Marketing"
    ),
  body("status")
    .isIn(["todo", "inProcess", "inReview", "completed"])
    .withMessage(
      "Project must be one of: todo, inProcess, inReview, completed"
    ),
];
