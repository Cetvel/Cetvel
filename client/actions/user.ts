"use server";

import { signIn } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { LoginSchema, RegisterSchema } from "@/lib/schemas";
import { catchError, instance } from "@/lib/utils";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const data = {
    email: values.email,
    password: values.password,
  };

  await instance.post("/auth/login", data).catch((error) => {
    throw new Error(catchError(error));
  });

  try {
    signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    throw new Error(catchError(error));
  }

  return {
    success: "Başarıyla giriş yapıldı. Yönlendiriliyorsunuz...",
  };
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const data = {
    email: values.email,
    password: values.password,
    name: values.name,
  };

  await instance.post("/auth/register", data).catch((error) => {
    throw new Error(catchError(error));
  });

  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    throw new Error(catchError(error));
  }

  return {
    success: "Başarıyla kayıt oldunuz.",
  };
};
