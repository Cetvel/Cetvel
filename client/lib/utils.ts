import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const catchError = (error: any) => {
  if (error.response) {
    return error.response.data.message;
  } else if (error.request) {
    return error.request.message;
  } else {
    return error.message;
  }
};

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const colors = {
  primary: "#7747ff",
  secondary: {
    light: "#E7E8EB",
    dark: "#374151",
  },
  accent: {
    light: "#ffffff",
    dark: "#313844",
  },
  base100: {
    light: "#ffffff",
    dark: "#282E38",
  },
  base200: {
    light: "#F4F6F8",
    dark: "#242932",
  },
  base300: {
    light: "#FAFBFC",
    dark: "#20252d",
  },
  neutral: {
    light: "#e2e8f0",
    dark: "#3E4756",
  },
};

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
