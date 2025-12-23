import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// 1. Export this constant so other files can use it
export const API_BASE = "https://bt-1-cmjj.onrender.com/api/v1";

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}