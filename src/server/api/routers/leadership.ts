import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const leadershipRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.leadership.findMany({
      include: {
        organization: true,
        leadershipProjects: true,
      },
      orderBy: {
        updatedAt: "asc",
      },
    });
  }),
  addOne: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
        leadershipProjects: z.array(
          z.object({
            id: z.string(),
            course: z.string(),
            name: z.string(),
            purpose: z.string().nullable(),
            otherPositions: z.string().nullable(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.leadership.create({
        data: {
          organizationId: input.organizationId,
          leadershipProjects: {
            createMany: {
              data: input.leadershipProjects.map(
                ({ course, name, purpose, otherPositions }) => ({
                  course,
                  name,
                  purpose,
                  otherPositions,
                })
              ),
            },
          },
        },
      });
    }),
  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        organizationId: z.string(),
        leadershipProjects: z.array(
          z.object({
            id: z.string(),
            course: z.string(),
            name: z.string(),
            purpose: z.string().nullable(),
            otherPositions: z.string().nullable(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.leadership.update({
        where: {
          id: input.id,
        },
        data: {
          organizationId: input.organizationId,
        },
      });

      return ctx.prisma.$transaction(
        input.leadershipProjects.map(
          ({ id, course, name, purpose, otherPositions }) =>
            ctx.prisma.leadershipProject.update({
              where: {
                id,
              },
              data: {
                course,
                name,
                purpose,
                otherPositions,
              },
            })
        )
      );
    }),
  deleteOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.leadership.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
