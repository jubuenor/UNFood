import User from "../models/User";
import { UserI, userUpdate } from "../types/user";
import { comparePassword } from "../middlewares/auth";

const UserService = {
  get: async function (_id: string): Promise<UserI> {
    const userDB = await User.findOne({ _id: _id }).exec();
    if (!userDB) throw new Error("User not found");
    let user: UserI = {
      _id: userDB._id,
      username: userDB.username,
      name: userDB.name,
      lastName: userDB.lastName,
      email: userDB.email,
      password: userDB.password,
      address: userDB.address,
      phone: userDB.phone,
    };
    return user;
  },

  getAll: async function (): Promise<UserI[]> {
    const userListDB = await User.find().exec();
    let users = userListDB.map((user) => ({
      _id: user._id,
      username: user.username,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      address: user.address,
      phone: user.phone,
    }));
    return users;
  },

  update: async function (newUser: userUpdate): Promise<UserI> {
    const userExist = await User.findOne({ _id: newUser._id });
    if (!userExist) throw new Error("User not found");

    const validPassword = await comparePassword(
      newUser.password,
      userExist.password
    );
    if (!validPassword) throw new Error("Invalid password");
    newUser.password = userExist.password;
    const userDB = await User.findByIdAndUpdate(
      {
        _id: newUser._id,
      },
      newUser
    );
    if (!userDB) throw new Error("User not found");
    let user: UserI = {
      _id: userDB._id,
      username: userDB.username,
      name: userDB.name,
      lastName: userDB.lastName,
      email: userDB.email,
      password: userDB.password,
      address: userDB.address,
      phone: userDB.phone,
    };
    return user;
  },

  delete: async function (userId: string): Promise<UserI> {
    const userDB = await User.findByIdAndDelete(userId);
    if (!userDB) throw new Error("User not found");
    let user: UserI = {
      _id: userDB._id,
      username: userDB.username,
      name: userDB.name,
      lastName: userDB.lastName,
      email: userDB.email,
      password: userDB.password,
      address: userDB.address,
      phone: userDB.phone,
    };
    return user;
  },
};

export default UserService;
