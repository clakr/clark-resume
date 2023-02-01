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
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.leadership.create({
        data: {
          organizationId: input.organizationId,
        },
      });
    }),
  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        organizationId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.leadership.update({
        where: {
          id: input.id,
        },
        data: {
          organizationId: input.organizationId,
        },
      });
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
