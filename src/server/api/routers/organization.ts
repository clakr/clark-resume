import { createTRPCRouter, publicProcedure } from "../trpc";

export const organizationRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.organization.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }),
});
