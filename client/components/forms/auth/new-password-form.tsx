"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/lib/schemas";
import { z } from "zod";
import axios from "axios";
import { Form } from "@/components/ui/form";
import CustomFormField, {
  FormFieldType,
} from "@/components/ui/custom-form-field";
import FormError from "@/components/forms/ui/form-error";
import FormSuccess from "@/components/forms/ui/form-success";
import SubmitButton from "@/components/forms/ui/submit-button";

const NewPasswordForm = () => {
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
    setError(null);
    setSuccess(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="password"
          label="Şifre"
          placeholder="Yeni şifrenizi girin"
        />

        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="confirmPassword"
          label="Şifreyi Onayla"
          placeholder="Yeni şifrenizi tekrar girin"
        />

        <FormError title={"Hata"} description={error} />
        <FormSuccess title={"Başarılı"} description={success} />
        <SubmitButton
          text="Şifreyi değiştir"
          size={"lg"}
          className="w-full"
          loading={loading}
        />
      </form>
    </Form>
  );
};

export default NewPasswordForm;
