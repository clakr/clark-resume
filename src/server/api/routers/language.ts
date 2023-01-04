import { createTRPCRouter, publicProcedure } from "../trpc";

export const languageRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.language.findMany();
  }),
});
