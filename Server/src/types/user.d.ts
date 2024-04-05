import mongoose from "mongoose";
export interface UserI {
  _id: mongoose.Types.ObjectId;
  username: string | undefined;
  name: string;
  lastName: string;
  email: string;
  password: string;
  address: string | undefined;
  phone: string | undefined;
}

export interface UserRegister {
  username: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface userUpdate {
  _id: string;
  username: string | undefined;
  name: string;
  lastName: string;
  email: string;
  password: string;
  address: string | undefined;
  phone: string | undefined;
}

export interface DecodeToken {
  username: string;
  id: string;
}
