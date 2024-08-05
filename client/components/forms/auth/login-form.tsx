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
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { catchError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { login } from "@/actions/user";

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
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const result = await login(values);
      if(result.success){
        const signInResult = await signIn('credentials', {
          redirect: true,
          email: values.email,
          password: values.password,
        })
        setSuccess(result.success)
        if (signInResult?.error) {
          setError('Giriş yapılırken bir hata oluştu');
        } else {
          // Redirect or update UI as needed
          console.log('Kayıt ve giriş başarılı');
        }
      }else{
        setError(result.error || 'Giriş sırasında bir hata oluştu');
      }
    } catch (error:any) {
      setError(error.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
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

        <FormError description={error} />
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
