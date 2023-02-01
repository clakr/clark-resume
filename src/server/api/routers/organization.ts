import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const organizationRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.organization.findMany({
      orderBy: {
        updatedAt: "asc",
      },
    });
  }),
  addOne: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        position: z.string(),
        location: z.string(),
        timeframeFrom: z.date(),
        timeframeTo: z.date().nullable(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.organization.create({
        data: {
          name: input.name,
          position: input.position,
          location: input.location,
          timeframeFrom: input.timeframeFrom,
          timeframeTo: input.timeframeTo,
        },
      });
    }),
  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        position: z.string(),
        location: z.string(),
        timeframeFrom: z.date(),
        timeframeTo: z.date().nullable(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.organization.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          position: input.position,
          location: input.location,
          timeframeFrom: input.timeframeFrom,
          timeframeTo: input.timeframeTo,
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
      return ctx.prisma.organization.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
