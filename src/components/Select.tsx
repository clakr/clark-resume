import { Listbox, Transition } from "@headlessui/react";
import type { PropsWithChildren } from "react";
import { Fragment } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import type {
  ContactFormType,
  EducationFormType,
  ExperienceFormType,
  MiscellaneousFormType,
} from "../types";

type OptionProps = {
  value: string;
  displayName: string;
};

const Option = ({ value, displayName }: OptionProps) => {
  return (
    <Listbox.Option value={value} key={value} as={Fragment}>
      {({ active, selected }) => (
        <li
          className={`${active ? "bg-slate-300" : null} ${
            selected ? "font-medium" : null
          } flex cursor-pointer items-center justify-between rounded-md px-4 py-2`}
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
      <Listbox.Options className="form__input absolute w-full translate-y-[70%] border-2 p-1 text-sm shadow-lg">
        {children}
      </Listbox.Options>
    </Transition>
  );
};

const Button = ({ children }: PropsWithChildren) => {
  return (
    <Listbox.Button className="form__input w-full px-4 py-2 text-left text-sm">
      {children}
    </Listbox.Button>
  );
};

const Label = ({ children }: PropsWithChildren) => {
  return <Listbox.Label className="form__label">{children}</Listbox.Label>;
};

type SelectProps = {
  field:
    | ControllerRenderProps<ContactFormType, "type">
    | ControllerRenderProps<EducationFormType, "organizationId">
    | ControllerRenderProps<ExperienceFormType, "organizationId">
    | ControllerRenderProps<MiscellaneousFormType, "type">;
};

const Select = ({
  children,
  field: { ...rest },
}: PropsWithChildren<SelectProps>) => {
  return (
    <Listbox as="div" className="flex flex-col gap-1" {...rest}>
      <div className="relative flex flex-col gap-2">{children}</div>
    </Listbox>
  );
};

Select.Label = Label;
Select.Button = Button;
Select.Options = Options;
Select.Option = Option;

export default Select;
