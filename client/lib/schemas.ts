import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string({
        required_error: "İsim girmek zorunludur",
      })
      .min(2, { message: "İsim en az 2 karakter uzunluğunda olmalı." })
      .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/, {
        message: "İsim sadece harf içermeli",
      })
      .max(50, { message: "İsim en fazla 50 karakter uzunluğunda olabilir" }),
    surname: z
      .string({
        required_error: "Soyisim girmek zorunludur",
      })
      .min(2, { message: "Soyisim en az 2 karakter uzunluğunda olmalı." })
      .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/, {
        message: "Soyisim sadece harf içermeli",
      })
      .max(50, {
        message: "Soyisim en fazla 50 karakter uzunluğunda olabilir",
      }),
    email: z
      .string({
        required_error: "E-Posta girmek zorunludur",
      })
      .email({ message: "Geçerli bir E-Posta adresi giriniz" })
      .max(50, {
        message: "E-Posta en fazla 50 karakter uzunluğunda olabilir",
      }),
    password: z
      .string({
        required_error: "Şifre girmek zorunludur",
      })
      .min(6, { message: "Şifre en az 6 karakter uzunluğunda olabilir" })
      .max(50, { message: "Şifre en fazla 50 karakter uzunluğunda olabilir" }),
    confirmPassword: z.string(),
  })
  .required()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Şifreler eşleşmiyor",
        path: ["confirmPassword"],
      });
    }
  });

export const LoginSchema = z
  .object({
    email: z
      .string({
        required_error: "E-Posta girmek zorunludur",
      })
      .email({ message: "Geçerli bir E-Posta adresi girmelisin" })
      .min(6, { message: "E-Posta en az 6 karakter uzunluğunda olmalı" }),
    password: z
      .string({
        required_error: "Şifre girmek zorunludur",
      })
      .min(6, { message: "Şifre en az 6 karakter uzunluğunda olmalı" })
      .max(50, { message: "Şifre en fazla 50 karakter uzunluğunda olabilir" }),
  })
  .required();

export const ResetSchema = z.object({
  email: z
    .string({
      required_error: "E-Posta girmek zorunludur",
    })
    .email({ message: "Geçerli bir E-Posta adresi girmelisin" }),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: "Şifre girmek zorunludur",
      })
      .min(6, { message: "Şifre en az 6 karakterli olmalı" })
      .max(50, { message: "Şifre en fazla 50 karakter uzunluğunda olmalı" }),
    confirmPassword: z.string(),
  })
  .required()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Şifreler eşleşmiyor",
        path: ["confirmPassword"],
      });
    }
  });

export const TaskSchema = z.object({
  title: z
    .string({
      required_error: "Başlık girmek zorunludur",
    })
    .min(2, { message: "Başlık en az 2 karakter uzunluğunda olmalı" }),
  description: z
    .string()
    .max(500, { message: "Açıklama en fazla 500 karakter uzunluğunda olmalı" })
    .optional(),
  list: z.string({
    required_error: "Liste seçmek zorunludur",
  }),
});

export const ListSchema = z.object({
  title: z
    .string({
      required_error: "Liste adı girmek zorunludur",
    })
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/, {
      message: "Liste adı sadece harf içermeli",
    })
    .min(2, { message: "Liste adı en az 2 karakter uzunluğunda olabilir" })
    .max(50, {
      message: "Liste adı en fazla 50 karakter uzunluğunda olabilir",
    }),
});

export const ReminderSchema = z.object({
  time: z.string({
    required_error: "Zaman girmek zorunludur",
  }),
  date: z.date({
    required_error: "Tarih girmek zorunludur",
  }),
});
