import type { HTMLInputTypeAttribute } from "react";
import { forwardRef } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { OrganizationFormType } from "../types";

const Input = forwardRef<
  HTMLInputElement,
  ReturnType<UseFormRegister<OrganizationFormType>> & {
    type?: HTMLInputTypeAttribute;
  }
>(({ type = "text", ...rest }, ref) => {
  return (
    <input
      {...rest}
      type={type}
      ref={ref}
      className="w-full rounded-lg border border-slate-300 bg-slate-200 px-4 py-2 outline-slate-400 dark:border-slate-700 dark:bg-slate-800"
    />
  );
});

Input.displayName = "Input";

export default Input;
