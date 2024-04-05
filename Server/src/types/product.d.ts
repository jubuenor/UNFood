import mongoose from "mongoose";

export interface ProductI {
  _id: mongoose.Types.ObjectId;
  name: String;
  name_chaza: String;
  description: String;
  price: Number;
  image: String;
  category: Number;
  stock: Number | undefined;
  total_sales: Number;
}

export interface ProductCreateI {
  chaza_id: mongoose.Types.ObjectId;
  name: String;
  description: String;
  price: Number;
  image: String;
  category: Number;
  stock: Number | undefined;
  total_sales: Number;
}
