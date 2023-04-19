// import User from "./model";
import { body, validationResult } from "express-validator";

export const signUpVlidations = [
  body("firstName").isLength({ min: 3, max: 255 }),
  body("lastName").isLength({ min: 3, max: 255 }),
  body("email").isEmail(),
  body("email").isLength({ max: 255 }),
  body("password").isLength({ min: 8, max: 50 }),
];

export const forgetPasswordValidations = [
  body("email").isEmail(),
  body("email").isLength({ max: 255 }),
];
export const resetPasswordValidations = [
  body("email").isEmail(),
  body("email").isLength({ max: 255 }),
  body("resetPasswordToken"),
  body("password").isLength({ min: 8, max: 50 }),
];
