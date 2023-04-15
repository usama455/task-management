import { created, success, error, updated, wrongPassword, validPassword } from "../../utils/response";
import User from "./model";
import { logger } from "./../../utils/";
import passport from "passport";

const register = async (req, res) => {
	try {
		const newUser = new User({ ...req.body });
		await newUser.save();
    const responseObject={
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    }
		return created(res, responseObject);
	} catch (err) {
		logger.error(err.message);
		return error(res, err.message);
	}
};

export { register };
