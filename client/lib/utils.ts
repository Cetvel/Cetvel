import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { AuthError } from "next-auth";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const catchError = (error: any) => {
  if (error.response) {
    return error.response.data.message;
  } else if (error.request) {
    return "Sunucuya bağlanırken bir hata oluştu. Lütfen tekrar deneyin.";
  } else if (error instanceof AuthError) {
    switch (error.type) {
      case "CredentialsSignin":
        console.error("CredentialsSignin error:", error);
        return "Kullanıcı adı veya şifre hatalı.";
      case "CallbackRouteError":
        console.error("CallbackRouteError:", error);
        return error.message;
      default:
        console.error("AuthError:", error);
        return "Bir hata oluştu. Lütfen tekrar dene";
    }
  } else {
    throw error;
  }
};

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const checkMaxQuestions = (
  questions: number,
  lesson: string,
  max: number
) => {
  if (questions > max) {
    throw new Error(
      `${lesson} dersi için en fazla ${max} soru girebilirsiniz.`
    );
  }
  return questions;
};

export const checkMaxTime = (time: number, max: number) => {
  if (time > max) {
    throw new Error(`Toplam süre en fazla ${max} dakika olabilir.`);
  }
  return time;
};

export const padTo2Digits = (num: number) => {
  return String(num).padStart(2, "0");
};

export const toggleModal = (modalId: string) => {
  const modal = document.getElementById(modalId);
  modal?.classList.toggle("modal-open");
};
