import { createTRPCRouter, publicProcedure } from "../trpc";

export const interestRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.interest.findMany();
  }),
});
