// chazaRoutes.ts
import { Router } from "express";
import chaza from "../controllers/chaza.controller";
import chazaService from "../services/chaza.service";
import { verifyTokenChaza } from "../middlewares/verify";

const chaza_router = Router();

//Routes
chaza_router.get("/byId/:id", chaza.getChaza);
chaza_router.get("/byName/:name", chaza.getChazaByName);
chaza_router.get("/chazas", chaza.getAllChazas);
chaza_router.get("/locations", chaza.getChazaLocations);
chaza_router.post(
  "/",
  chazaService.uploadImage.single("image"),
  chaza.createChaza
);
chaza_router.post("/qr", chazaService.uploadImage.single("qr"), chaza.uploadQR);
chaza_router.post("/comment/:id", chaza.addComment);
chaza_router.put("/", verifyTokenChaza, chaza.updateChaza);
chaza_router.delete("/:id", verifyTokenChaza, chaza.deleteChaza);
chaza_router.get("/numbers", chaza.getChazaNumbers);
chaza_router.get("/stats/:id", chaza.getStats);

export default chaza_router;
