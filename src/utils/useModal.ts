import { useState } from "react";

const useModal = () => {
  const itemIdState = useState<string | null>(null),
    addModalState = useState(false),
    updateModalState = useState(false),
    deleteModalState = useState(false);

  return {
    itemIdState,
    addModalState,
    updateModalState,
    deleteModalState,
  };
};

export default useModal;
