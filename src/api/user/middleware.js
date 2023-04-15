import User from "./model";
import { resposeStatus } from "../../constants/response";
import { body, validationResult } from 'express-validator';

export const checkUserExists = async ({ body }, res, next) => {
	const { email } = body;
	const user = await User.findOne({ email });
	if (user) {
		return res.status(resposeStatus.badRequest).json({ success: false, message: "User already exists" });
	}
	return next();
};

export const registerValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ success: false, data: { errors: errors.array() } });
    }
    next();
  };
  
  export const validations = [
    body('firstName').isLength({ min: 3, max: 255 }),
    body('lastName').isLength({ min: 3, max: 255 }),
    body('email').isEmail(),
    body('email').isLength({ max: 255 }),
    body('password').isLength({ min: 8, max: 50 }),
  ];

  
