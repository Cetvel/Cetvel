"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../ui/submit-button";
import { RegisterSchema } from "@/lib/schemas";
import FormError from "../ui/form-error";
import FormSuccess from "../ui/form-success";
import { z } from "zod";
import { Form } from "../../ui/form";
import CustomFormField, { FormFieldType } from "../../ui/custom-form-field";

const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setError(null);
    setSuccess(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Kullanıcı adı"
          placeholder="Kullanıcı adınızı girin"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="E Posta"
          placeholder="E posta adresinizi girin"
        />

        <div className="flex flex-col xl:flex-row gap-4">
          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="password"
            label="Şifre"
            placeholder="Şifrenizi girin"
          />

          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="confirmPassword"
            label="Şifre Tekrar"
            placeholder="Şifrenizi tekrar girin"
          />
        </div>

        <FormError title={"Hata"} description={error} />
        <FormSuccess title={"Başarılı"} description={success} />
        <SubmitButton text="Kayıt Ol" size={"lg"} className="w-full" />
        <p className="text-sm text-center mt-2">
          Zaten hesabın var mı?{" "}
          <Link className="text-primary-500 hover:underline" href={"/login"}>
            Giriş Yap
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default RegisterForm;
