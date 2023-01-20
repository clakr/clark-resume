import type { PropsWithChildren } from "react";
import { FaPlus } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

const TableFoot = ({
  colSpan,
  intent,
}: {
  colSpan: number;
  intent: string;
}) => {
  return (
    <tfoot className="border border-dashed border-slate-300 text-sm opacity-75 dark:border-slate-700">
      <tr>
        <td colSpan={colSpan}>
          <button className="flex w-full items-center justify-center gap-2 py-3">
            <FaPlus className="h-4 w-4" /> Add {intent}
          </button>
        </td>
      </tr>
    </tfoot>
  );
};

const TableData = ({ children }: PropsWithChildren) => {
  return <td className="py-4 px-8 text-center">{children}</td>;
};

const TableBodyRow = ({ children }: PropsWithChildren) => {
  return (
    <tr className="border border-slate-300 dark:border-slate-700">
      {children}
      <td className="py-4 px-8">
        <button className="grid w-full place-items-center">
          <SlOptions className="h-4 w-4" />
        </button>
      </td>
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
    <table className="w-full text-slate-600 dark:text-slate-400">
      {children}
    </table>
  );
};

Table.Head = TableHead;
Table.Heading = TableHeading;
Table.Body = TableBody;
Table.BodyRow = TableBodyRow;
Table.Data = TableData;
Table.Foot = TableFoot;

export default Table;
