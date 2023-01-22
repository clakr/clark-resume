import type { PropsWithChildren } from "react";

type FormGroupProps = {
  label: string;
};

const FormGroup = ({ children, label }: PropsWithChildren<FormGroupProps>) => {
  return (
    <div className="space-y-1">
      <label htmlFor={label} className="px-2 font-medium capitalize">
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormGroup;
