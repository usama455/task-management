import jwt from "jsonwebtoken";
import { jwtSecret, expiresIn } from "../../config";

export const sign = ({ email, _id }) => {
  const today = new Date();
  const expirationDate = new Date(today.getHours() + expiresIn);
  return jwt.sign(
    {
      email,
      _id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    jwtSecret
  );
};
