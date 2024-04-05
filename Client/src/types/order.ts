import { Product } from "./product";
export interface ProductsOrder {
  product: string;
  quantity: number;
}

export interface ProductsOrderReader {
  name(name: (name: any) => unknown, arg1: { SemanaPasada: number; SemanaActual: number; }): unknown;
  name(name: any): unknown;
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  user: string;
  chaza: string;
  numeroCelular: string;
  products: ProductsOrderReader[];
  total: number;
  state: number;
  createdAt: string;
}

export interface CreateOrder {
  user: string;
  chaza: string;
  products: ProductsOrder[];
  total: number;
}

export interface UpdateOrder {
  _id: string;
  user: string;
  chaza: string;
  products: ProductsOrderReader[];
  state: number;
  total: number;
}
