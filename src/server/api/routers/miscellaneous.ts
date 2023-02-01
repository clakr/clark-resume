import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const miscellaneousRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.miscellaneous.findMany({
      orderBy: {
        updatedAt: "asc",
      },
    });
  }),
  addOne: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.enum(["INTEREST", "LANGUAGE", "TECHNICAL"]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.miscellaneous.create({
        data: {
          name: input.name,
          type: input.type,
        },
      });
    }),
  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        type: z.enum(["INTEREST", "LANGUAGE", "TECHNICAL"]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.miscellaneous.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          type: input.type,
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
      return ctx.prisma.miscellaneous.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
