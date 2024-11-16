import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
  timeoutErrorMessage: 'İstek zaman aşımına uğradı, lütfen tekrar deneyin.',
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
