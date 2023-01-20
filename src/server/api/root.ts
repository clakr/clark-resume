import { aboutRouter } from "./routers/about";
import { allInfoRouter } from "./routers/alllInfo";
import { contactRouter } from "./routers/contact";
import { educationRouter } from "./routers/education";
import { experienceRouter } from "./routers/experience";
import { leadershipRouter } from "./routers/leadership";
import { miscellaneousRouter } from "./routers/miscellaneous";
import { organizationRouter } from "./routers/organization";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  allInfo: allInfoRouter,
  contact: contactRouter,
  about: aboutRouter,
  organization: organizationRouter,
  education: educationRouter,
  experience: experienceRouter,
  leadership: leadershipRouter,
  miscellaneous: miscellaneousRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
