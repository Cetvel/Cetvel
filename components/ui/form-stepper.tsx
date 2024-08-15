"use client";

import React from "react";

type Props = {
  activeStep: number;
  steps: { label: string; description: string }[];
  onStepChange: (step: number) => void;
};

const FormStepper = ({ activeStep, onStepChange, steps }: Props) => {
  return (
    <ol className="flex flex-col sm:flex-row items-start sm:items-center w-full space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
      {steps.map((step, index) => (
        <li
          key={index}
          className={`flex items-center space-x-2.5 rtl:space-x-reverse cursor-pointer w-full sm:w-auto ${
            activeStep === index ? "text-primary-500" : "text-secondary-content"
          }`}
          onClick={() => onStepChange(index)}
        >
          <span className="flex items-center justify-center w-8 h-8 border border-slate-300 dark:border-slate-600 border-dashed rounded-full shrink-0">
            {index + 1}
          </span>
          <div className="flex-grow sm:flex-grow-0">
            <h3 className="font-medium leading-tight">{step.label}</h3>
            <p className="text-sm hidden sm:block">{step.description}</p>
          </div>
          {index < steps.length - 1 && (
            <div className="hidden sm:block flex-grow border-t border-slate-300 dark:border-slate-600 mx-2"></div>
          )}
        </li>
      ))}
    </ol>
  );
};

export default FormStepper;
