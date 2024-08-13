import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

type Props = {
  title?: string | null;
  description?: string | null;
};

const FormError = ({ title, description }: Props) => {
  if (!description) return null;

  return (
    <Alert variant="error" role="alert">
      <IoCloseCircleOutline className="h-5 w-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default FormError;
