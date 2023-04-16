import { Schema, model } from "mongoose";
import { comparePassword, genHash } from "../../services/bcrypt";
import { sign } from "../../services/jwt";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required. "],
      unique: [true, "Email already exists."],
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
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

// UserSchema.methods.generateJWT = function () {
// 	return sign({email: this.email, _id: this._id})
// };

const User = model("User", UserSchema);

export default User;
