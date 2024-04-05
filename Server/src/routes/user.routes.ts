// userRoutes.ts
import { Router } from "express";
import user from "../controllers/user.controller";

const user_router = Router();

user_router.get("/byId/:id", user.get);
user_router.get("/users", user.getAll);
user_router.put("/", user.update);
user_router.delete("/:id", user.delete);

export default user_router;
