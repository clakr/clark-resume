import type { PropsWithChildren, TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { UseFormRegister } from "react-hook-form/dist/types";
import type { AboutFormType, EducationFormType } from "../types";

type FormTypes = AboutFormType | EducationFormType;

const Textarea = forwardRef<
  HTMLTextAreaElement,
  PropsWithChildren &
    ReturnType<UseFormRegister<FormTypes>> &
    TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ children, rows = 5, ...rest }, ref) => {
  return (
    <textarea
      className="w-full rounded-lg border border-slate-300 bg-slate-200 p-4 outline-slate-400 dark:border-slate-700 dark:bg-slate-800"
      {...rest}
      rows={rows}
      ref={ref}
    >
      {children}
    </textarea>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
