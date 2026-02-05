import { API_BASE } from "../config/api";

const TOKEN_KEY = "portfolio_admin_token";

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}

export function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}


export function handleAuthResponse(res) {
  if (res.status === 401) {
    clearToken();
    window.location.href = "/admin";
  }
}


export function authHeaders(extra = {}) {
  const token = getToken();
  return {
    ...extra,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}


export async function validateToken() {
  const token = getToken();
  if (!token) return false;
  try {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      headers: authHeaders(),
    });
    return res.ok;
  } catch {
    return false;
  }
}
