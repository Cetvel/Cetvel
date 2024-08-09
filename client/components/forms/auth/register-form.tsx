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
import { catchError, instance } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { register } from "@/actions/user";
import { set } from "mongoose";

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
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setError(null);
    setSuccess(null);
    setLoading(true);
    
    
    try{
        const result = await register(values)
        console.log('Result Client: ' , result)
        if(result.success){
          const signInResult = await signIn('credentials', {
            redirect: true,
            email: values.email,
            password: values.password,
      })
      setSuccess(result.success)
         if (signInResult) {
        setError('Giriş yapılırken bir hata oluştu');
      } else {
        // Redirect or update UI as needed
        console.log('Kayıt ve giriş başarılı');
      }
    } else {
      setError(result.error || 'Kayıt sırasında bir hata oluştu');
    }} catch (error : any) {
      setError(error.message || 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
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

        <div className="flex items-center">
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="terms"
            label={
              <p className="text-sm">
                Uygulamayı kullanmak için{" "}
                <Link
                  href="cookies"
                  className="hover:underline text-primary-500"
                >
                  çerezler
                </Link>{" "}
                ve{" "}
                <Link
                  href="/terms"
                  className="hover:underline text-primary-500"
                >
                  kullanım koşullarını
                </Link>{" "}
                kabul etmelisin. Detaylar için{" "}
                <Link
                  href="/information"
                  className="hover:underline text-primary-500"
                >
                  Aydınlatma
                </Link>{" "}
                ve{" "}
                <Link href="/kvkk" className="hover:underline text-primary-500">
                  KVKK
                </Link>{" "}
                metinlerine bakın.
              </p>
            }
          />
        </div>

        <FormError title={"Hata"} description={error} />
        <FormSuccess title={"Başarılı"} description={success} />
        <SubmitButton
          text="Kayıt Ol"
          size={"lg"}
          className="w-full"
          loading={loading}
        />
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
