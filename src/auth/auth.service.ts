import { apiFetch } from "../lib/api";

export async function login(email: string, password: string) {
  const res = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("token", res.token);
  return res;
}

export async function register(email: string, password: string) {
  const res = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("token", res.token);
  return res;
}

export function logout() {
  localStorage.removeItem("token");
}