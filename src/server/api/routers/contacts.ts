import { createTRPCRouter, publicProcedure } from "../trpc";

export const contactRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.contact.findMany();
  }),
});
