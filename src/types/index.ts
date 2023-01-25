import type { About, Contact, Education, Organization } from "@prisma/client";
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
export type OrganizationFormType = Omit<Organization, "createdAt">;
export type EducationFormType = Omit<Education, "createdAt">;
