// routes/product.routes.ts
import express from "express";
import product from "../controllers/product.controller";
import productService from "../services/product.service";

const product_router = express.Router();

//Routes

product_router.get("/byId/:id", product.getProduct);
product_router.get("/products", product.getAllProducts);
product_router.post(
  "/",
  productService.uploadImage.single("image"),
  product.createProduct
);
product_router.put("/", product.updateProduct);
product_router.delete("/:id", product.deleteProduct);

export default product_router;
