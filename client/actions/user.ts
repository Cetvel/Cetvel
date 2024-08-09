"use server";

import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { LoginSchema, RegisterSchema } from "@/lib/schemas";
import { catchError, instance } from "@/lib/utils";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Geçersiz alanlar" };
  }

  const { email, password } = validatedFields.data;

  try {
    const result = await instance.post("/auth/login", {
      email,
      password,
    })

    return { 
      success: "Başarıyla giriş yapıldı.",
      data : result.data
    };
  } catch (error) {
    return {
      error: catchError(error) || "Giriş sırasında bir hata oluşti."
  }
}}

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log("here is worked register action ")
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Geçersiz alanlar" };
  }

  const { name, email, password } = validatedFields.data;

  try {
    console.log(name, email, password)
    const result = await instance.post("/auth/register", {
      name,
      email,
      password,
    });

    console.log("RESULT Data: ", result.data)
    return {
      success: "Başarıyla kayıt oldunuz.",
      data: result.data
    };
  } catch (error) {
    return {
      error: catchError(error) || "Kayıt sırasında bir hata oluştu",
    };
  }
}