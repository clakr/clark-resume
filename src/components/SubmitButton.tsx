import { FaEdit, FaPlus } from "react-icons/fa";

type SubmitButtonProps = {
  intent: "Add" | "Update" | "Delete";
  category: string;
};

const SubmitButton = ({ intent, category }: SubmitButtonProps) => {
  return (
    <button
      className="form__input !mt-6 flex w-full items-center justify-center gap-2 p-3 text-sm"
      type="submit"
    >
      {intent === "Add" ? <FaPlus /> : <FaEdit />}
      {intent} {category}
    </button>
  );
};

export default SubmitButton;
