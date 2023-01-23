import type { About } from "@prisma/client";
import type { IconType } from "react-icons/lib";

export type TableHeading = {
  text: string;
};

export type TableOptions = {
  icon: IconType;
  intent: string;
  onClick: () => void;
};

export type AboutFormType = Omit<About, "createdAt">;
