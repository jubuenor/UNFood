import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    name_chaza: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
    },
    total_sales: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionkey: false,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
