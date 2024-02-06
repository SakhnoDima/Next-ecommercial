"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type CustomButtonPropsType = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

const CustomButton = ({
  children,
  className,
  ...props
}: CustomButtonPropsType) => {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      disabled={pending}
      className={`btn btn-primary ${className}`}
    >
      {pending ? (
        <span className="loading loading-ball loading-sm"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButton;
