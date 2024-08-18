import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const padTo2Digits = (num: number) => {
  return String(num).padStart(2, "0");
};
