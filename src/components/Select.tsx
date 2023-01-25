import { Listbox, Transition } from "@headlessui/react";
import type { PropsWithChildren } from "react";
import { Fragment } from "react";
import { FaCheck } from "react-icons/fa";

type OptionProps = {
  value: string;
  displayName: string;
};

const Option = ({ value, displayName }: OptionProps) => {
  return (
    <Listbox.Option value={value} key={value} as={Fragment}>
      {({ active, selected }) => (
        <li
          className={`flex cursor-pointer items-center justify-between rounded-sm px-4 py-2 ${
            active && "bg-slate-200 dark:bg-slate-700"
          } ${selected && "font-medium"}`}
        >
          {displayName}
          {selected && <FaCheck />}
        </li>
      )}
    </Listbox.Option>
  );
};

const Options = ({ children }: PropsWithChildren) => {
  return (
    <Transition
      as={Fragment}
      enter="transition duration-100 ease-out"
      enterFrom="transform opacity-0 -translate-y-8"
      enterTo="transform opacity-100 translate-y-0"
      leave="transition duration-100 ease-out"
      leaveFrom="transform opacity-100 translate-y-0"
      leaveTo="transform opacity-0 -translate-y-8"
    >
      <Listbox.Options className="absolute mt-2 w-full rounded-md border-2 border-slate-200 bg-white p-1 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-800">
        {children}
      </Listbox.Options>
    </Transition>
  );
};

const Button = ({ children }: PropsWithChildren) => {
  return (
    <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-slate-300 bg-slate-200 px-4 py-2 text-left text-sm capitalize outline-slate-400 dark:border-slate-700 dark:bg-slate-800">
      {children}
    </Listbox.Button>
  );
};

type SelectProps = {
  value: any;
  onChange: any;
};

const Select = ({
  children,
  value,
  onChange,
}: PropsWithChildren<SelectProps>) => {
  return (
    <Listbox
      as="div"
      className="flex flex-col gap-1"
      value={value}
      onChange={onChange}
    >
      <div className="relative">{children}</div>
    </Listbox>
  );
};

Select.Button = Button;
Select.Options = Options;
Select.Option = Option;

export default Select;
