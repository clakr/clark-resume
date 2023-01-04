import { createTRPCRouter, publicProcedure } from "../trpc";

export const technicalRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.technical.findMany();
  }),
});
