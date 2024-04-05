import { Request, Response } from "express";
import orderService from "../services/Order.service";

// Create a new Order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const data = await orderService.create(req.body);
    return res.status(200).send({
      message: "Order successfully created",
      data: { data },
    });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export const getByUser = async (req: Request, res: Response) => {
  try {
    const data = await orderService.getByUser(req.params.id);
    return res.status(200).send({
      message: "Orders successfully retrieved",
      data: data,
    });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};
export const getByChaza = async (req: Request, res: Response) => {
  try {
    const data = await orderService.getByChaza(req.params.id);
    return res.status(200).send({
      message: "Orders successfully retrieved",
      data: data,
    });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};
// Update an Order by ID
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const data = await orderService.update(req.body);
    return res.status(200).send({
      message: "Order successfully updated",
      data: data,
    });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

// Delete an Order by ID
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const data = await orderService.delete(req.params.id);
    return res.status(200).send({
      message: "Order successfully deleted",
      data: data,
    });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};
