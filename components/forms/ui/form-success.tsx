import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check } from "lucide-react";
import React from "react";

type Props = {
  title?: string | null;
  description?: string | null;
};

const FormSuccess = ({ title, description }: Props) => {
  if (!description) return null;

  return (
    <Alert variant="default" role="alert">
      <Check className="h-5 w-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default FormSuccess;
