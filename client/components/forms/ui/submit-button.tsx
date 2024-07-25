import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  button?: React.ReactNode;
}

const SubmitButton = ({
  text,
  disabled,
  icon,
  onClick,
  button,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center gap-2">
      {button && button}
      <Button
        /* @ts-ignore */
        type="submit"
        disabled={pending || disabled}
        onClick={onClick}
        {...props}
      >
        {pending && <span className="loading loading-bars loading-xs mr-2" />}
        {text}
        {icon}
      </Button>
    </div>
  );
};

export default SubmitButton;
