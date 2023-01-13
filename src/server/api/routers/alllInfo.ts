import { createTRPCRouter, publicProcedure } from "../trpc";

export const allInfoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return {
      contact: await ctx.prisma.contact.findMany({
        orderBy: {
          createdAt: "asc",
        },
      }),
      about: await ctx.prisma.about.findMany({
        orderBy: {
          createdAt: "asc",
        },
      }),
      education: await ctx.prisma.education.findMany({
        orderBy: {
          createdAt: "asc",
        },
        include: {
          organization: true,
        },
      }),
      experience: await ctx.prisma.experience.findMany({
        orderBy: {
          createdAt: "asc",
        },
        include: {
          organization: true,
          experienceDescriptions: true,
        },
      }),
      leadership: await ctx.prisma.leadership.findMany({
        orderBy: {
          createdAt: "asc",
        },
        include: {
          organization: true,
          leadershipProjects: true,
        },
      }),
      technical: await ctx.prisma.technical.findMany({
        orderBy: {
          createdAt: "asc",
        },
      }),
      language: await ctx.prisma.language.findMany({
        orderBy: {
          createdAt: "asc",
        },
      }),
      interest: await ctx.prisma.interest.findMany({
        orderBy: {
          createdAt: "asc",
        },
      }),
    };
  }),
});
