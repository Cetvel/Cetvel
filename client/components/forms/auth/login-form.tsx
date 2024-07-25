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
import { redirect } from "next/navigation";

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

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) setSuccess("Başarıyla giriş yapıldı!");
      redirect("/dashboard");
    } catch (error: any) {
      setError("Giriş yapılırken bir sorun oluştu. Lütfen tekrar dene.");
      console.error(error);
    }
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
        <SubmitButton text="Giriş Yap" size={"lg"} className="w-full" />
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
