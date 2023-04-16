import { compare, genSalt, hash } from "bcrypt";
const SALT_WORK_FACTOR = 10;

export const genHash = async (password) => {
  const salt = await genSalt(SALT_WORK_FACTOR);
  password = await hash(password, salt);
  return password;
};

export const comparePassword = async (password, existingPassword) => {
  return await compare(password, existingPassword);
};
