import { createTRPCRouter, publicProcedure } from "../trpc";

export const educationRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.education.findMany({
      include: {
        organization: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }),
});
