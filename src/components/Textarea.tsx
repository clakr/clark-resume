import type { PropsWithChildren } from "react";
import { forwardRef } from "react";
import type { UseFormRegister } from "react-hook-form/dist/types";
import type { AboutFormType } from "../types";

const Textarea = forwardRef<
  HTMLTextAreaElement,
  PropsWithChildren & ReturnType<UseFormRegister<AboutFormType>>
>(({ onChange, onBlur, name, children }, ref) => {
  return (
    <textarea
      className="w-full rounded-lg border border-slate-300 bg-slate-200 p-4 outline-slate-400 dark:border-slate-700 dark:bg-slate-800"
      rows={5}
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
    >
      {children}
    </textarea>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
