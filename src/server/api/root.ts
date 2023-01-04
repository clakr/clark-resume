import { aboutRouter } from "./routers/about";
import { contactRouter } from "./routers/contact";
import { educationRouter } from "./routers/education";
import { experienceRouter } from "./routers/experience";
import { interestRouter } from "./routers/interest";
import { languageRouter } from "./routers/language";
import { leadershipRouter } from "./routers/leadership";
import { technicalRouter } from "./routers/technical";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  contact: contactRouter,
  about: aboutRouter,
  education: educationRouter,
  experience: experienceRouter,
  leadership: leadershipRouter,
  technical: technicalRouter,
  language: languageRouter,
  interest: interestRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
