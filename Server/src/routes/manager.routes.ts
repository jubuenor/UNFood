import { Router } from "express";
import product_router from "./product.routes";
import user_router from "./user.routes";
import chaza_router from "./chaza.routes";
import auth_router from "./auth.routes";
import order_router from "./order.routes";
import { verifyToken } from "../middlewares/verify";

const router_manager = Router();

//Add routes to api
router_manager.use("/v1/auth", auth_router);
router_manager.use("/v1/product", verifyToken, product_router);
router_manager.use("/v1/user", verifyToken, user_router);
router_manager.use("/v1/chaza", verifyToken, chaza_router);
router_manager.use("/v1/order", verifyToken, order_router);

export default router_manager;
