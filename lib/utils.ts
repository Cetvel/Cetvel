import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import axios from "axios";
import { z } from "zod";

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

export const fetcher = async (url: string) => {
  try {
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const formatMinutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours < 1) {
    return `${remainingMinutes} Dakika`;
  } else {
    return `${hours} Saat ${remainingMinutes} Dakika`;
  }
};

export const determineFormFields = (
  userClass: UserClass,
  examType: ExamType
): FormField[] => {
  if (examType === "TYT") {
    return [
      {
        name: "turkce",
        label: "Türkçe Doğru Sayısı",
        type: "number",
        placeholder: "0-40",
        max: 40,
      },
      {
        name: "matematik",
        label: "Matematik Doğru Sayısı",
        type: "number",
        placeholder: "0-40",
        max: 40,
      },
      {
        name: "sosyal",
        label: "Sosyal Bilimler Doğru Sayısı",
        type: "number",
        placeholder: "0-20",
        max: 20,
      },
      {
        name: "fen",
        label: "Fen Bilimleri Doğru Sayısı",
        type: "number",
        placeholder: "0-20",
        max: 20,
      },
    ];
  } else if (examType === "AYT") {
    return [
      {
        name: "alan",
        label: "Alan Seçimi",
        type: "select",
        placeholder: "Alan seçiniz",
        options: [
          { value: "sayisal", label: "Sayısal" },
          { value: "sozel", label: "Sözel" },
          { value: "esitagirlik", label: "Eşit Ağırlık" },
          { value: "dil", label: "Dil" },
        ],
      },
      {
        name: "turkDili",
        label: "Türk Dili ve Edebiyatı Doğru Sayısı",
        type: "number",
        placeholder: "0-24",
        max: 24,
      },
      {
        name: "tarih1",
        label: "Tarih-1 Doğru Sayısı",
        type: "number",
        placeholder: "0-10",
        max: 10,
      },
      {
        name: "cografya1",
        label: "Coğrafya-1 Doğru Sayısı",
        type: "number",
        placeholder: "0-6",
        max: 6,
      },
      {
        name: "tarih2",
        label: "Tarih-2 Doğru Sayısı",
        type: "number",
        placeholder: "0-11",
        max: 11,
      },
      {
        name: "cografya2",
        label: "Coğrafya-2 Doğru Sayısı",
        type: "number",
        placeholder: "0-11",
        max: 11,
      },
      {
        name: "felsefe",
        label: "Felsefe Doğru Sayısı",
        type: "number",
        placeholder: "0-12",
        max: 12,
      },
      {
        name: "din",
        label: "Din Kültürü Doğru Sayısı",
        type: "number",
        placeholder: "0-6",
        max: 6,
      },
      {
        name: "matematik",
        label: "Matematik Doğru Sayısı",
        type: "number",
        placeholder: "0-40",
        max: 40,
      },
      {
        name: "fizik",
        label: "Fizik Doğru Sayısı",
        type: "number",
        placeholder: "0-14",
        max: 14,
      },
      {
        name: "kimya",
        label: "Kimya Doğru Sayısı",
        type: "number",
        placeholder: "0-13",
        max: 13,
      },
      {
        name: "biyoloji",
        label: "Biyoloji Doğru Sayısı",
        type: "number",
        placeholder: "0-13",
        max: 13,
      },
    ];
  }
  return [];
};

export const createDynamicSchema = (fields: FormField[]): z.ZodObject<any> => {
  const schemaFields = fields.reduce(
    (acc, field) => {
      if (field.type === "number") {
        acc[field.name] = z.coerce
          .number({
            required_error: `${field.label} gereklidir`,
            invalid_type_error: "Bir sayı girmelisiniz",
          })
          .min(0, `${field.label} 0'dan küçük olamaz`)
          .max(field.max, `${field.label} ${field.max}'dan büyük olamaz`);
      } else if (field.type === "select") {
        acc[field.name] = z.string({
          required_error: `${field.label} seçilmelidir`,
        });
      }
      return acc;
    },
    {} as Record<string, z.ZodTypeAny>
  );

  return z.object(schemaFields);
};
