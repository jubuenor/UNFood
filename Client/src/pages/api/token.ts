import cookie from "js-cookie";
import jwt_decode from "jwt-decode";
import { tokenData } from "@/types/user";

export function getToken(): tokenData | null {
  const token = cookie.get("user-token");
  if (!token) return null;
  return jwt_decode(token);
}
