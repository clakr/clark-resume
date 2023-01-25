import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const contactRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.contact.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }),
  addOne: protectedProcedure
    .input(
      z.object({
        desc: z.string(),
        type: z.enum(["ADDRESS", "EMAIL", "PHONE"]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.contact.create({
        data: {
          desc: input.desc,
          type: input.type,
        },
      });
    }),
  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        desc: z.string(),
        type: z.enum(["ADDRESS", "EMAIL", "PHONE"]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.contact.update({
        where: {
          id: input.id,
        },
        data: {
          desc: input.desc,
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
      return ctx.prisma.contact.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
