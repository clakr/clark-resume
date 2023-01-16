import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

const usePalette = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        setIsOpen((prevState) => !prevState);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [setIsOpen]);

  return [isOpen, setIsOpen];
};

export default usePalette;
