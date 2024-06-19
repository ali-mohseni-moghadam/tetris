import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";
import { publicProcedure } from "~/server/api/trpc";
import { verifyToken } from "../auth";

export const isAuthProcedure = publicProcedure.query(async () => {
  const token = cookies().get("Cookie")?.value;

  if (!token) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You have to login",
    });
  }

  const result = verifyToken(token, process.env.SECRET_KEY!);

  if (result) {
    return {
      status: true,
    };
  } else {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "You are unauthorized",
    });
  }
});
