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
        updatedAt: "asc",
      },
    });
  }),

  addOne: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
        experienceDescs: z.array(
          z.object({
            id: z.string(),
            experienceId: z.string(),
            desc: z.string(),
          })
        ),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.experience.create({
        data: {
          organizationId: input.organizationId,
          experienceDescs: {
            createMany: {
              data: input.experienceDescs.map(({ desc }) => ({ desc })),
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
        experienceDescs: z.array(
          z.object({
            id: z.string(),
            experienceId: z.string(),
            desc: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.experience.update({
        where: {
          id: input.id,
        },
        data: {
          organizationId: input.organizationId,
        },
      });

      await ctx.prisma.$transaction(
        input.experienceDescs.map(({ id, desc }) =>
          ctx.prisma.experienceDesc.update({
            where: {
              id,
            },
            data: {
              desc,
            },
          })
        )
      );

      return;
    }),
  deleteOne: protectedProcedure
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
