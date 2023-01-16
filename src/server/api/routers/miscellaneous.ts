import { createTRPCRouter, publicProcedure } from "../trpc";

export const miscellaneousRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.miscellaneous.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }),
});
