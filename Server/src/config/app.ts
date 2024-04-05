import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Router } from "express";
import router_manager from "../routes/manager.routes";

// import routes...

const app = express();
const router = Router();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("api version 1 en desarrollo ...");
});

// routes

app.use("/api", router_manager);

export default app;

