import User from "../models/User";
import { UserRegister, UserLogin } from "../types/user";
import {
  validateRegister,
  encryptPassword,
  validateLogin,
  comparePassword,
} from "../middlewares/auth";
import jwt from "jsonwebtoken";
import { secret } from "../config/secret";

const authServices = {
  signup: async (user: UserRegister): Promise<string> => {
    if (!validateRegister(user)) throw new Error("Invalid user");

    const userExist = await User.findOne({ username: user.username });

    if (userExist) throw new Error("User already exists");

    const newUser = new User({
      username: user.username,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: await encryptPassword(user.password),
      phone: user.phone,
      address: " ",
    });

    const token = jwt.sign(
      { username: newUser.username, id: newUser._id },
      secret,
      { expiresIn: "24h" }
    );
    console.log(token);
    const result = await newUser.save();
    if (!result) throw new Error("Error saving user");

    return token;
  },
  login: async (user: UserLogin): Promise<string> => {
    if (!validateLogin(user)) throw new Error("Invalid user or password");
    const userExist = await User.findOne({ username: user.username });
    if (!userExist) throw new Error("User not found");
    const validPassword = await comparePassword(
      user.password,
      userExist.password
    );
    if (!validPassword) throw new Error("Invalid password");

    const token = jwt.sign(
      { username: userExist.username, id: userExist._id },
      secret,
      { expiresIn: "24h" }
    );

    return token;
  },
};

export default authServices;
