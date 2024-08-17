import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

type Props = {
  title?: string | null;
  description?: string | null;
};

const FormSuccess = ({ title, description }: Props) => {
  if (!description) return null;

  return (
    <Alert variant="success" role="alert">
      <IoCheckmarkCircleOutline className="h-5 w-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default FormSuccess;