type SubmitButtonProps = {
  intent: "Add" | "Update" | "Delete";
  category: string;
};

const SubmitButton = ({ intent, category }: SubmitButtonProps) => {
  return (
    <button
      className="mt-2 w-full rounded-md border border-slate-300 bg-slate-200 p-2 outline-slate-400 hover:bg-slate-300 focus:bg-slate-300 dark:border-slate-700 dark:bg-slate-800"
      type="submit"
    >
      {intent} {category}
    </button>
  );
};

export default SubmitButton;
