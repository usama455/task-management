// import User from "./model";
import { body, validationResult } from "express-validator";
import { errorResponse } from "../../utils/response";

export const isValid = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array());
  }
  next();
};

export const signUpVlidations = [
  body("firstName").isLength({ min: 3, max: 255 }),
  body("lastName").isLength({ min: 3, max: 255 }),
  body("email").isEmail(),
  body("email").isLength({ max: 255 }),
  body("password").isLength({ min: 8, max: 50 }),
];
export const loginValidations = [
  body("email").isEmail(),
  body("email").isLength({ max: 255 }),
  body("password").isLength({ min: 8, max: 50 }),
];
