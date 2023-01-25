import type { HTMLInputTypeAttribute } from "react";
import { forwardRef } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { ExperienceDescFormType, OrganizationFormType } from "../types";

const Input = forwardRef<
  HTMLInputElement,
  ReturnType<
    UseFormRegister<
      | OrganizationFormType
      | {
          experienceDescs: ExperienceDescFormType[];
        }
    >
  > & {
    type?: HTMLInputTypeAttribute;
    className?: string;
  }
>(({ type = "text", className, ...rest }, ref) => {
  return (
    <input
      {...rest}
      type={type}
      ref={ref}
      className={`w-full rounded-lg border border-slate-300 bg-slate-200 px-4 py-2 outline-slate-400 dark:border-slate-700 dark:bg-slate-800 ${className}`}
    />
  );
});

Input.displayName = "Input";

export default Input;
