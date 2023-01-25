import type { PropsWithChildren } from "react";

type FormGroupProps = {
  label: string;
  className?: string;
};

const FormGroup = ({
  children,
  label,
  className,
}: PropsWithChildren<FormGroupProps>) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={label} className="px-2 font-medium capitalize">
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormGroup;
