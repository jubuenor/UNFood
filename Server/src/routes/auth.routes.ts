import express from "express";
import auth from "../controllers/auth.controller";

const auth_router = express.Router();

auth_router.post("/signup", auth.signup);
auth_router.post("/login", auth.login);

export default auth_router;
