import { Router } from "express";
import {
  login,
  signup,
  forgetPassword,
  checkUserExists,
  resetPassword,
} from "./controller";
import {
  forgetPasswordValidations,
  isValid,
  resetPasswordValidations,
  signUpVlidations,
} from "./middleware";

const router = new Router();

router.post("/register", signUpVlidations, isValid, checkUserExists, signup);
router.post("/login", login);
router.post(
  "/forget-password",
  forgetPasswordValidations,
  isValid,
  forgetPassword
);
router.post(
  "/reset-password",
  resetPasswordValidations,
  isValid,
  resetPassword
);

export default router;
