import type { ElementType, PropsWithChildren } from "react";

type PanelType = {
  className?: string;
  element: ElementType;
};

const Panel = ({
  className,
  element = "div",
  children,
}: PropsWithChildren<PanelType>) => {
  const Element = element;

  return (
    <Element
      className={`${className} rounded-md border border-slate-300 bg-slate-200 shadow-lg shadow-slate-300 dark:border-slate-900 dark:bg-slate-800 dark:shadow-slate-900`}
    >
      {children}
    </Element>
  );
};

export default Panel;
