import { createTRPCRouter } from "~/server/api/trpc";

import { createProcedure } from "~/utils/procedure/createProcedure";
import { loginProcedure } from "~/utils/procedure/loginProcedure";
//

export const userRouter = createTRPCRouter({
  createUser: createProcedure,

  login: loginProcedure,
});
