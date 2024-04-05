import bcrypt from "bcrypt";
import { UserRegister, UserLogin } from "../types/user";

export const encryptPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(16);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error(`Failed to encrypt password ${password}`);
  }
};

export const comparePassword = async (
  password: string,
  receivedPassword: string
): Promise<boolean> => {
  const result = await bcrypt.compare(password, receivedPassword);
  return result;
};

export const validateRegister = (user: UserRegister): boolean => {
  if (
    Object.values(user).some(
      (field) =>
        field === undefined ||
        field === null ||
        (typeof field === "string" && field.length === 0)
    )
  ) {
    return false;
  }
  return true;
};

export const validateLogin = (user: UserLogin): boolean => {
  if (
    Object.values(user).some(
      (field) =>
        field === undefined ||
        field === null ||
        (typeof field === "string" && field.length === 0)
    )
  ) {
    return false;
  }
  return true;
};
