import RegisterForm from "@/components/forms/auth/register-form";
import { CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

const Register = () => {
  return (
    <>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </>
  );
};

export default Register;
