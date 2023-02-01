import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const educationRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.education.findMany({
      include: {
        organization: true,
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
        degree: z.string().nullable(),
        thesis: z.string().nullable(),
        awards: z.string().nullable(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.education.create({
        data: {
          organizationId: input.organizationId,
          degree: input.degree,
          thesis: input.thesis,
          awards: input.awards,
        },
      });
    }),
  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        organizationId: z.string(),
        degree: z.string().nullable(),
        thesis: z.string().nullable(),
        awards: z.string().nullable(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.education.update({
        where: {
          id: input.id,
        },
        data: {
          organizationId: input.organizationId,
          degree: input.degree,
          thesis: input.thesis,
          awards: input.awards,
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
      return ctx.prisma.education.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
