import z from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const aboutRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.about.findMany({
      orderBy: {
        createdAt: "asc",
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
});
