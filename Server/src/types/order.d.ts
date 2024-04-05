import mongoose from "mongoose";
import { ProductI } from "./product";

interface productsOrder {
  product: ProductI;
  quantity: Number;
}

interface productsOrderRead {
  product: mongoose.Types.ObjectId | undefined;
  quantity: Number;
}

export interface orderI {
  _id: mongoose.Types.ObjectId | undefined;
  user: mongoose.Types.ObjectId | undefined;
  chaza: String;
  products: Array<productsOrderRead>;
  state: Number;
  time_to_delivery: Date | undefined;
  total: Number;
}

export interface orderReadChazaI {
  _id: mongoose.Types.ObjectId | undefined;
  user: String;
  chaza: String;
  numeroCelular: String;
  products: productsOrder[];
  state: Number;
  time_to_delivery: Date | undefined;
  total: Number;
  createdAt: Date | undefined;
}

export interface orderReadUserI {
  _id: mongoose.Types.ObjectId | undefined;
  user: mongoose.Types.ObjectId | undefined;
  chaza: String;
  numeroCelular: String;
  products: productsOrder[];
  state: Number;
  time_to_delivery: Date | undefined;
  total: Number;
  createdAt: Date | undefined;
}

export interface orderCreateI {
  user: mongoose.Types.ObjectId | undefined;
  chaza: String;
  products: Array<productsOrderRead>;
  time_to_delivery: Date | undefined;
  total: Number;
}

export interface orderUpdateI {
  _id: mongoose.Types.ObjectId | undefined;
  user: String;
  chaza: String;
  products: Array<productsOrder>;
  state: Number;
  time_to_delivery: Date | undefined;
  total: Number;
}
