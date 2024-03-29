import { Disclosure, Menu, Transition } from "@headlessui/react";
import type { PropsWithChildren } from "react";
import { FaCaretRight, FaPlus } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import type { TableOptions } from "../types";

const TableDataCollapsible = ({
  children,
  name,
  type = "main",
}: PropsWithChildren<{
  name: string;
  type?: "main" | "sub";
}>) => {
  return (
    <Disclosure
      as="div"
      className={`flex flex-col ${type === "main" ? "gap-4" : "gap-2 text-sm"}`}
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`flex w-full items-center gap-2  ${
              type === "main"
                ? "justify-center font-bold"
                : "justify-start font-medium"
            }`}
          >
            <FaCaretRight
              className={`${
                open ? "rotate-90" : "rotate-0"
              } h-4 w-4 transition-all duration-300`}
            />
            {name}
          </Disclosure.Button>
          <Transition
            enter="transition duration-300 ease-out"
            enterFrom="transform opacity-0 -translate-y-8"
            enterTo="transform opacity-100 translate-0"
            leave="transition duration-300 ease-out"
            leaveFrom="transform opacity-100 translate-0"
            leaveTo="transform opacity-0 -translate-y-8"
          >
            <Disclosure.Panel className="text-start">
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

const TableAddCategory = ({
  colSpan,
  category,
  buttonOnClick,
}: {
  colSpan: number;
  category: string;
  buttonOnClick: () => void;
}) => {
  return (
    <tfoot className="border border-dashed border-slate-300 text-sm opacity-75 dark:border-slate-700">
      <tr>
        <td colSpan={colSpan}>
          <button
            className="flex w-full items-center justify-center gap-2 py-3"
            onClick={buttonOnClick}
          >
            <FaPlus className="h-4 w-4" /> Add {category}
          </button>
        </td>
      </tr>
    </tfoot>
  );
};

const TableDataOptions = ({
  options,
  id,
}: {
  options: TableOptions[];
  id: string;
}) => {
  return (
    <>
      <Menu as="td" className="w-1/12">
        <Menu.Button className="grid w-full place-items-center py-2">
          <SlOptions />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute bottom-0 right-0 flex w-32 -translate-x-1/2 flex-col gap-1 rounded border border-slate-300 bg-slate-100 p-1 text-sm shadow-lg shadow-slate-300 dark:border-slate-900 dark:bg-slate-700 dark:text-slate-100 dark:shadow-slate-900">
            {options.map(({ icon: Icon, intent, onClick }, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    className={`flex items-center justify-start gap-3 rounded p-2 ${
                      active && "bg-slate-400 text-slate-50 dark:bg-slate-500"
                    }`}
                    onClick={() => onClick(id)}
                  >
                    <Icon />
                    {intent}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

const TableData = ({ children }: PropsWithChildren) => {
  return <td className="p-6 text-center">{children ?? "-"}</td>;
};

const TableBodyRow = ({ children }: PropsWithChildren) => {
  return (
    <tr className="border border-slate-300 dark:border-slate-700">
      {children}
    </tr>
  );
};

const TableBody = ({ children }: PropsWithChildren) => {
  return <tbody>{children}</tbody>;
};

const TableHeading = ({ children }: PropsWithChildren) => {
  return (
    <>
      <th className="p-3">{children}</th>
    </>
  );
};

const TableHead = ({ children }: PropsWithChildren) => {
  return (
    <thead>
      <tr className="border border-slate-300 bg-slate-300 dark:border-slate-700 dark:bg-slate-700">
        {children}
        <TableHeading />
      </tr>
    </thead>
  );
};

export const Table = ({ children }: PropsWithChildren) => {
  return (
    <table className="w-full table-auto text-slate-600 dark:text-slate-400">
      {children}
    </table>
  );
};

Table.Head = TableHead;
Table.Heading = TableHeading;
Table.Body = TableBody;
Table.BodyRow = TableBodyRow;
Table.Data = TableData;
Table.DataOptions = TableDataOptions;
Table.AddCategory = TableAddCategory;
Table.Collapsible = TableDataCollapsible;

export default Table;
