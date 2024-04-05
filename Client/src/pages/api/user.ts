import axios from "axios";
import { User } from "@/types/user";
import cookie from "js-cookie";

export function getUser(id: string) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get<{ message: string; data: User }>(
      `${BASE_URL}/api/v1/user/byId/${id}`,
      config
    )
    .then((res) => res.data);
}

export function updateUser(user: User) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .put<User>(`${BASE_URL}/api/v1/user`, user, config)
    .then((res) => res.data);
}

export function deleteUser({ id }: { id: string }) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .delete<{ message: string; data: User }>(
      `${BASE_URL}/api/v1/user/${id}`,
      config
    )
    .then((res) => res.data);
}
