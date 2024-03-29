import type {
  About,
  Contact,
  Education,
  Experience,
  ExperienceDesc,
  Leadership,
  LeadershipProject,
  Miscellaneous,
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

type DateTypes = "createdAt" | "updatedAt";

export type AboutFormType = Omit<About, DateTypes>;

export type ContactFormType = Omit<Contact, DateTypes>;

export type OrganizationFormType = Omit<Organization, DateTypes>;

export type EducationFormType = Omit<Education, DateTypes>;

export type ExperienceFormType = Omit<Experience, DateTypes> & {
  experienceDescs: ExperienceDescFormType[];
};
export type ExperienceDescFormType = Omit<ExperienceDesc, DateTypes>;

export type LeadershipFormType = Omit<Leadership, "createdAt" | "updatedAt"> & {
  leadershipProjects: LeadershipProjectsFormType[];
};
export type LeadershipProjectsFormType = Omit<LeadershipProject, DateTypes>;

export type MiscellaneousFormType = Omit<Miscellaneous, DateTypes>;
