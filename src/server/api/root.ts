import { aboutRouter } from "./routers/abouts";
import { contactRouter } from "./routers/contacts";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  contacts: contactRouter,
  abouts: aboutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
