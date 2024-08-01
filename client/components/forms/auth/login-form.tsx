"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../ui/submit-button";
import { LoginSchema } from "@/lib/schemas";
import FormError from "../ui/form-error";
import FormSuccess from "../ui/form-success";
import { z } from "zod";
import { Form } from "../../ui/form";
import CustomFormField, { FormFieldType } from "../../ui/custom-form-field";
import axios from "axios";
import { catchError, instance } from "@/lib/utils";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError(null);
    setSuccess(null);
    setLoading(true);

    instance
      .post("/auth/login", values)
      .then((res) => {
        setSuccess("Giriş başarılı, yönlendiriliyorsunuz...");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      })
      .catch((err) => {
        setError(catchError(err));
        console.error(err);
        setLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="E Posta"
          placeholder="E posta adresinizi girin"
        />

        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="password"
          label="Şifre"
          placeholder="Şifrenizi girin"
        />

        <FormError title={"Hata"} description={error} />
        <FormSuccess title={"Başarılı"} description={success} />
        <SubmitButton
          text="Giriş Yap"
          size={"lg"}
          className="w-full"
          loading={loading}
        />
        <p className="text-sm text-center mt-2">
          Hesabın yok mu?{" "}
          <Link className="text-primary-500 hover:underline" href={"/register"}>
            Kayıt Ol
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
