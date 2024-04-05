import cookie from "js-cookie";

export default function logout() {
  cookie.remove("user-token");
  localStorage.removeItem("cart");
  window.location.href = "/";
}
