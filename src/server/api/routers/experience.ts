import { createTRPCRouter, publicProcedure } from "../trpc";

export const experienceRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.experience.findMany({
      include: {
        organization: true,
        experienceDescs: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }),
});
