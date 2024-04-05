import User from "../models/User";
import { Request, Response } from "express";
import authServices from "../services/auth.service";

const auth = {
  signup: async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await authServices.signup(req.body);
      return res
        .status(200)
        .json({ message: "User created successfully", data });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
  login: async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await authServices.login(req.body);
      return res.status(200).json({ message: "User login successfully", data });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
};

export default auth;
