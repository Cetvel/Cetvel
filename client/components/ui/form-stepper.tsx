"use client";

import React from "react";

type Props = {
  activeStep: number;
  steps: { label: string; description: string }[];
  onStepChange: (step: number) => void;
};

const FormStepper = ({ activeStep, onStepChange, steps }: Props) => {
  return (
    <ol className="items-center w-full space-y-4 sm:flex sm:space-x-6 sm:space-y-0 rtl:space-x-reverse">
      {steps.map((step, index) => (
        <li
          key={index}
          className={`flex items-center space-x-2.5 rtl:space-x-reverse ${
            activeStep === index ? "text-primary-500" : "text-secondary-content"
          }`}
          onClick={() => onStepChange(index)}
        >
          <span className="flex items-center justify-center w-8 h-8 border-card border-dashed rounded-full shrink-0">
            {index + 1}
          </span>
          <span>
            <h3 className="font-medium leading-tight">{step.label}</h3>
            <p className="text-sm">{step.description}</p>
          </span>
        </li>
      ))}
    </ol>
  );
};

export default FormStepper;
