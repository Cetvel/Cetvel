"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../ui/submit-button";
import { ResetSchema } from "@/lib/schemas";
import FormError from "../ui/form-error";
import FormSuccess from "../ui/form-success";
import { z } from "zod";
import { Form } from "../../ui/form";
import CustomFormField, { FormFieldType } from "../../ui/custom-form-field";
import axios from "axios";

const ResetForm = () => {
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof ResetSchema>) {
    setError(null);
    setSuccess(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="E-Posta"
          placeholder="E posta adresinizi girin"
        />

        <FormError title={"Hata"} description={error} />
        <FormSuccess title={"Başarılı"} description={success} />
        <SubmitButton
          text="Sıfırlama e-postası gönder"
          size={"lg"}
          className="w-full"
          loading={loading}
        />
        <Link
          className="text-primary-500 hover:underline text-center mt-2 text-sm block"
          href={"/login"}
        >
          Giriş Yap
        </Link>
      </form>
    </Form>
  );
};

export default ResetForm;
