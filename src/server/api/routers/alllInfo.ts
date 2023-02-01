import { createTRPCRouter, publicProcedure } from "../trpc";

export const allInfoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return {
      contact: await ctx.prisma.contact.findMany({
        orderBy: {
          updatedAt: "asc",
        },
      }),
      about: await ctx.prisma.about.findMany({
        orderBy: {
          updatedAt: "asc",
        },
      }),
      education: await ctx.prisma.education.findMany({
        orderBy: {
          updatedAt: "asc",
        },
        include: {
          organization: true,
        },
      }),
      experience: await ctx.prisma.experience.findMany({
        orderBy: {
          updatedAt: "asc",
        },
        include: {
          organization: true,
          experienceDescs: true,
        },
      }),
      leadership: await ctx.prisma.leadership.findMany({
        orderBy: {
          updatedAt: "asc",
        },
        include: {
          organization: true,
          leadershipProjects: true,
        },
      }),
      miscellaneous: await ctx.prisma.miscellaneous.findMany({
        orderBy: {
          updatedAt: "asc",
        },
      }),
    };
  }),
});
