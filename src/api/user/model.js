import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { jwt } from "jsonwebtoken";
import { comparePassword, genHash } from "../../services/bcrypt";

const UserSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: [true, "Email is required. "],
			unique: [true, "Email already exists."]
		},
		password: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

UserSchema.pre("save", async function (next) {
	const user = this;

	if (!user.isModified("password")) return next();
	user.password = genHash(user.password);
	next();
});

UserSchema.methods.validatePassword = async function (password) {
	const isMatch = await comparePassword(password, this.password);
	return isMatch;
};

UserSchema.methods.generateJWT = function () {
	const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(today.getDate() + 60);

	return jwt.sign(
		{
			email: this.email,
			id: this._id,
			exp: parseInt(expirationDate.getTime() / 1000, 10)
		},
		"secret"
	);
};

const User = model("User", UserSchema);

export default User;
