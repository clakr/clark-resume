import { createTRPCRouter, publicProcedure } from "./trpc";
import { exampleRouter } from "./routers/example";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  about: createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.about.findMany();
    }),
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;
