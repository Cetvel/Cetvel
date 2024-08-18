import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const padTo2Digits = (num: number) => {
  return String(num).padStart(2, "0");
};

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
