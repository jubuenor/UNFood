import axios from "axios";
import { Order, CreateOrder, UpdateOrder } from "@/types/order";
import cookie from "js-cookie";

export function getOrdersByUser(id: string) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get<{ message: string; data: Order[] }>(
      `${BASE_URL}/api/v1/order/byUser/${id}`,
      config
    )
    .then((res) => res.data);
}

export function getOrdersByChaza(id: string) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get<{
        slice(arg0: number, arg1: number): unknown; message: string; data: Order[] 
}>(
      `${BASE_URL}/api/v1/order/byChaza/${id}`,
      
      config
    )
    .then((res) => res.data);
}

export function createOrder(order: CreateOrder) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .post<Order>(`${BASE_URL}/api/v1/order`, order, config)
    .then((res) => res.data);
}

export function UpdateOrder(order: UpdateOrder) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .put<Order>(`${BASE_URL}/api/v1/order`, order, config)
    .then((res) => res.data);
}
