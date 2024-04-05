import express from "express";
import * as OrderController from "../controllers/order.controller";

const router = express.Router();

router.post("/", OrderController.createOrder);
router.get("/byUser/:id", OrderController.getByUser);
router.get("/byChaza/:id", OrderController.getByChaza);
router.put("/", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);

export default router;
