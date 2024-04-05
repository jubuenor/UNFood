import { Product } from "./product";
import { Order } from "./order";

export interface Chaza {
  _id: string;
  owner: string;
  name: String;
  description: String;
  type: number;
  address: String;
  phone: String;
  products: Product[];
  score: number;
  image: String;
  payment_method: Number[];
  comments: comment[];
  qr: string;
}

export interface comment {
  user: string;
  comment: string;
  calification: number;
  date: string;
}

export interface ChazaCreate {
  owner: string;
  name: String;
  description: String;
  type: number;
  address: String;
  phone: String;
  image: null | String | File;
  payment_method: Number[];
}

export interface ChazaUpdate {
  owner: string;
  description: String;
  type: number;
  address: String;
  phone: String;
  payment_method: Number[];
}

export interface qrCreate {
  _id: String;
  qr: null | String | File;
}

export interface numbers {
  chazas: number;
  products: number;
}

export interface stats {
  orders: Order[];
  products: Product[];
}
