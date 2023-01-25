import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

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

  addOrganization: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.experience.create({
        data: {
          organizationId: input.organizationId,
        },
      });
    }),
  updateOrganization: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        organizationId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.experience.update({
        where: {
          id: input.id,
        },
        data: {
          organizationId: input.organizationId,
        },
      });
    }),
  deleteOrganization: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.experience.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
