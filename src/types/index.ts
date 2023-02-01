import type {
  About,
  Contact,
  Education,
  Experience,
  ExperienceDesc,
  Organization,
} from "@prisma/client";
import type { IconType } from "react-icons/lib";

export type TableHeading = {
  text: string;
};

export type TableOptions = {
  icon: IconType;
  intent: string;
  onClick: (id: string) => void;
};

export type AboutFormType = Omit<
  About,
  "createdAt" | "updatedAt" | "updatedAt"
>;

export type ContactFormType = Omit<Contact, "createdAt" | "updatedAt">;

export type OrganizationFormType = Omit<
  Organization,
  "createdAt" | "updatedAt"
>;

export type EducationFormType = Omit<Education, "createdAt" | "updatedAt">;

export type ExperienceFormType = Omit<Experience, "createdAt" | "updatedAt"> & {
  experienceDescs: ExperienceDescFormType[];
};
type ExperienceDescFormType = Omit<ExperienceDesc, "createdAt" | "updatedAt">;
