import User from "./model";
import { logger, responseError, responseMessage } from "./../../utils/";
import passport from "passport";
import {
  errorResponse,
  responseStatus,
  successResponse,
} from "../../utils/response";

export const checkUserExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return errorResponse(
      res,
      responseError.userExists,
      responseStatus.conflict
    );
  }
  return next();
};

export const signup = async (req, res) => {
  try {
    const newUser = new User({ ...req.body });
    const userInfo = await newUser.save();
    const responseObject = {
      id: userInfo.id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      createdAt: userInfo?.createdAt,
      updatedAt: userInfo?.updatedAt,
    };
    return successResponse(
      res,
      responseObject,
      responseMessage.created,
      responseStatus.created
    );
  } catch (err) {
    logger.error(err.message);
    return errorResponse(res, err);
  }
};

export const login = async (req, res, next) => {
  try {
    await passport.authenticate("local", (err, token, info) => {
      if (err) {
        return errorResponse(res, err.message, err.status);
      }
      const responseObject = {
        token,
      };
      return successResponse(res, responseObject);
    })(req, res, next);
  } catch (err) {
    logger.error(err.message);
    return errorResponse(res, err.message);
  }
};
