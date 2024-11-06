import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  maxRedirects: 0,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const fetcher = async (url: string) => {
  try {
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
