import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
import React from "react";

type Props = {
  title?: string | null;
  description?: string | null;
};

const FormError = ({ title, description }: Props) => {
  if (!description) return null;

  return (
    <Alert variant="destructive" role="alert">
      <X className="h-5 w-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default FormError;
