import { createTRPCRouter, publicProcedure } from "../trpc";

export const leadershipRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.leadership.findMany({
      include: {
        organization: true,
        leadershipProjects: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }),
});
