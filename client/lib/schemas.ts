import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string({
        required_error: "Kullanıcı adı girmek zorunludur",
      })
      .min(2, {
        message: "Kullanıcı adı en az 2 karakter uzunluğunda olmalı.",
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
    terms: z.boolean({ message: "Kullanıcı sözleşmesini kabul etmelisiniz" }),
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
  startsAt: z.string({
    required_error: "Başlangıç tarihi girmek zorunludur",
  }),
  endsAt: z.string({
    required_error: "Bitiş tarihi girmek zorunludur",
  }),
  tag: z.string({
    required_error: "Etiket seçmek zorunludur",
  }),
  reminder: z.string().optional(),
});

export const TagSchema = z.object({
  title: z
    .string({
      required_error: "Etiket girmek zorunludur",
    })
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/, {
      message: "Etiket sadece harf içermelidir",
    })
    .min(2, { message: "Etiket en az 2 karakter uzunluğunda olabilir" })
    .max(50, {
      message: "Etiket en fazla 50 karakter uzunluğunda olabilir",
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
