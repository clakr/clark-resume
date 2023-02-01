import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const aboutRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.about.findMany({
      orderBy: {
        updatedAt: "asc",
      },
    });
  }),
  addOne: protectedProcedure
    .input(
      z.object({
        desc: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.about.create({
        data: {
          desc: input.desc,
        },
      });
    }),
  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        desc: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.about.update({
        where: {
          id: input.id,
        },
        data: {
          desc: input.desc,
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
      return ctx.prisma.about.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
