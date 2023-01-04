import { createTRPCRouter, publicProcedure } from "../trpc";

export const aboutRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.about.findMany();
  }),
});
