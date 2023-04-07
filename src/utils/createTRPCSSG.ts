import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { appRouter } from "../server/api/root";
import { createInnerTRPCContext } from "../server/api/trpc";

const createTRPCSSG = async () => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: await createInnerTRPCContext(),
    transformer: superjson,
  });

  return ssg;
};

export default createTRPCSSG;
