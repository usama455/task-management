import { compare, genSalt, hash } from "bcrypt";
import {saltFactor} from "../../config"

export const genHash = async (password) => {
  const salt = await genSalt(saltFactor);
  password = await hash(password, salt);
  return password;
};

export const comparePassword = async (password, existingPassword) => {
  return compare(password, existingPassword);
};
