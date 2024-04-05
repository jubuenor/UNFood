// userController.ts

import { Request, Response } from "express";
import UserService from "../services/user.service";

const user = {
  get: async (req: Request, res: Response) => {
    try {
      const data = await UserService.get(req.params.id);
      return res.status(200).send({
        message: "User successfully retrieved",
        data: data,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const data = await UserService.update(req.body);
      return res.status(200).send({
        message: "User successfully updated",
        data: data,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const data = await UserService.getAll();
      return res.status(200).send({
        message: "Users successfully retrieved",
        data: data,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const data = await UserService.delete(req.params.id);
      return res.status(200).send({
        message: "User successfully deleted",
        data: data,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default user;
