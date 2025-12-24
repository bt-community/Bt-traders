import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// 1. Export this constant so other files can use it
export const API_BASE = "https://bt-community-production.up.railway.app";

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}