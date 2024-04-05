import axios from "axios";
import {
  Chaza,
  ChazaCreate,
  ChazaUpdate,
  comment,
  qrCreate,
  numbers,
  stats
} from "@/types/chaza";
import cookie from "js-cookie";



export function getChazas() {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get<{ message: string; data: Chaza[] }>(
      `${BASE_URL}/api/v1/chaza/chazas`,
      config
    )
    .then((res) => res.data);
}

export function getChaza(id: string) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get<{ message: string; data: Chaza }>(
      `${BASE_URL}/api/v1/chaza/byId/${id}`,
      config
    )
    .then((res) => res.data);
}

export function getChazabyName(name: string) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get<{ message: string; data: Chaza }>(
      `${BASE_URL}/api/v1/chaza/byName/${name}`,
      config
    )
    .then((res) => res.data);
}

export function createChaza(chaza: ChazaCreate) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .post<Chaza>(`${BASE_URL}/api/v1/chaza`, chaza, config)
    .then((res) => res.data);
}

export function updateChaza(chaza: ChazaUpdate) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put<Chaza>(`${BASE_URL}/api/v1/chaza`, chaza, config);
}

export function deleteChaza(id: number) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete<Chaza>(`${BASE_URL}/api/v1/chaza/${id}`, config);
}

export function addComment({ id, comment }: { id: string; comment: comment }) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .post<Chaza>(`${BASE_URL}/api/v1/chaza/comment/${id}`, comment, config)
    .then((res) => res.data);
}

export function uploadQR(qr: qrCreate) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .post<Chaza>(`${BASE_URL}/api/v1/chaza/qr`, qr, config)
    .then((res) => res.data);
}
export function getNumbers() {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get<{ message: string; data: numbers }>(
      `${BASE_URL}/api/v1/chaza/numbers`,
      config
    )
    .then((res) => res.data);
}

export function getStats(id:string){  

  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  const token = cookie.get("user-token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get<{ message: string; data: stats }>(
      `${BASE_URL}/api/v1/chaza/stats/${id}`,
      config
    )
    .then((res) => res.data);
}
