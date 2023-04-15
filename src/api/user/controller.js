import User from "./model";
import { logger } from "./../../utils/";


export const checkUserExists = async ({ body }, res, next) => {
	const { email } = body;
	const user = await User.findOne({ email });
	if (user) {
		return res.json({ success: false, error: 'User already exists' });
	}
	return next();
};


export const signup = async (req, res) => {
	try {
		const newUser = new User({ ...req.body });
		const userInfo = await newUser.save();
		const responseObject={
			id: userInfo.id,
			firstName: userInfo.firstName,
			lastName: userInfo.lastName,
			email: userInfo.email,
			createdAt: userInfo?.createdAt,
			updatedAt: userInfo?.updatedAt,
		}
		return res.json({
			success: true,
			data: { user: responseObject },
		  });
	} catch (err) {
		logger.error(err.message);
		return res.json({ err });
	}
};
