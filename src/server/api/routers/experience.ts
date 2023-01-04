import { createTRPCRouter, publicProcedure } from "../trpc";

export const experienceRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.experience.findMany({
      include: {
        organization: true,
        experienceDescriptions: true,
      },
    });
  }),
});
