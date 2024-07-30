import { Button, ButtonProps } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ButtonProps {
  loading: boolean;
  text?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  button?: React.ReactNode;
}

const SubmitButton = ({
  loading,
  text,
  disabled,
  icon,
  onClick,
  button,
  ...props
}: SubmitButtonProps) => {
  return (
    <div className="flex items-center gap-2">
      {button && button}
      <Button
        /* @ts-ignore */
        type="submit"
        disabled={loading || disabled}
        onClick={onClick}
        {...props}
      >
        {loading && (
          <Image
            src="/image/spinner.svg"
            alt="Loading"
            width={24}
            height={24}
            className="animate-spin"
          />
        )}
        {text}
        {icon}
      </Button>
    </div>
  );
};

export default SubmitButton;
