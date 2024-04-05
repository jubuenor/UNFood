import axios from "axios";
import { loginData, signupData } from "@/types/user";

export function login(userData: loginData) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  return axios
    .post(`${BASE_URL}/api/v1/auth/login`, userData)
    .then((res) => res.data);
}

export function signup(userData: signupData) {
  const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
  return axios
    .post(`${BASE_URL}/api/v1/auth/signup`, userData)
    .then((res) => res.data);
}

export async function GoogleLogin(token: string) {
  const GOOGLE_API = "https://www.googleapis.com/oauth2/v3/userinfo ";
  return axios
    .get(GOOGLE_API, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);
}
