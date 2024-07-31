"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import FormError from "../ui/form-error";
import FormSuccess from "../ui/form-success";
import Image from "next/image";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (error || success) return;

    if (!token) {
      setError("Geçersiz doğrulama linki.");
      return;
    }
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex flex-col gap-4 items-center py-2">
      <p className="text-lg">Doğrulamanız teyit ediliyor</p>
      {!error && !success && (
        <Image
          src="/image/spinner.svg"
          alt="Loading"
          width={28}
          height={28}
          className="animate-spin"
        />
      )}
      <FormSuccess title={"Başarılı"} description={success} />
      {!success && <FormError title={"Hata"} description={error} />}
      <Link
        className="text-primary-500 hover:underline text-center mt-2 text-sm block"
        href={"/login"}
      >
        Giriş Yap
      </Link>
    </div>
  );
};

export default NewVerificationForm;
