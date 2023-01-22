import type { About } from "@prisma/client";

export type TableHeading = {
  text: string;
};

export type AboutFormType = Omit<About, "createdAt">;
