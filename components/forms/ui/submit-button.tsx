import React from "react";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SubmitButtonVariants = VariantProps<typeof buttonVariants>;

interface AdditionalButtonProps {
  button: React.ReactNode;
  tooltip?: React.ReactNode;
}

interface SubmitButtonProps
  extends Omit<ButtonProps, keyof SubmitButtonVariants> {
  loading?: boolean;
  text?: string;
  icon?: React.ReactNode;
  loadingText?: string;
  additionalButtons?: (
    | AdditionalButtonProps
    | ((props: { loading: boolean }) => AdditionalButtonProps)
  )[];
  tooltipContent?: React.ReactNode;
  variant?: SubmitButtonVariants["variant"];
  size?: SubmitButtonVariants["size"];
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading = false,
  text,
  icon,
  loadingText,
  additionalButtons,
  tooltipContent,
  variant,
  size,
  className,
  ...props
}) => {
  const buttonContent = (isMainButton: boolean = true) => {
    if (loading) {
      return (
        <>
          <LoaderCircle size={16} className="animate-spin" />
          {isMainButton && (loadingText || text)}
        </>
      );
    }
    return (
      <>
        {icon}
        {isMainButton && text}
      </>
    );
  };

  const wrapWithTooltip = (
    button: React.ReactNode,
    tooltipContent?: React.ReactNode
  ) => {
    if (!tooltipContent) return button;
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltipContent}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const mainButton = (
    <Button
      type="submit"
      disabled={loading || props.disabled}
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {buttonContent()}
    </Button>
  );

  const wrappedMainButton = wrapWithTooltip(mainButton, tooltipContent);

  const renderAdditionalButtons = () => {
    if (!additionalButtons) return null;
    return additionalButtons.map((buttonProps, index) => {
      const { button, tooltip } =
        typeof buttonProps === "function"
          ? buttonProps({ loading })
          : buttonProps;
      return (
        <React.Fragment key={index}>
          {wrapWithTooltip(button, tooltip)}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="flex items-center gap-2 justify-end">
      {renderAdditionalButtons()}
      {wrappedMainButton}
    </div>
  );
};

export default SubmitButton;
