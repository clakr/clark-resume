import type { About, Contact } from "@prisma/client";
import type { IconType } from "react-icons/lib";

export type TableHeading = {
  text: string;
};

export type TableOptions = {
  icon: IconType;
  intent: string;
  onClick: (id: string) => void;
};

export type AboutFormType = Omit<About, "createdAt">;
export type ContactFormType = Omit<Contact, "createdAt">;
