import { body } from "express-validator";

export const createCardValidations = [
  body("title").notEmpty().withMessage("Title is required."),
  body("project")
    .isIn(["General", "Design", "Development", "Marketing"])
    .withMessage(
      "Project must be one of: General , Design, Development, Marketing"
    ),
  body("assignedTo").isArray().withMessage("Assigned to must be an array."),
  body("subTasks").isArray().withMessage("Sub tasks must be an array."),
  body("comments").isArray().withMessage("Comments must be an array."),
];
