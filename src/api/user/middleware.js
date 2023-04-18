// import User from "./model";
import { body, validationResult } from "express-validator";
import { errorResponse } from "../../utils/response";

export const isValid = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorArray = errors.array();
    for (let i = 0; i < errorArray.length; i++) {
      const error = errorArray[i];
      if (error.path === "password" && error.msg === "Invalid value") {
        errorArray[i].msg = "Password must be between 8 and 50 characters";
      }
    }
    return errorResponse(res, errorArray);
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
