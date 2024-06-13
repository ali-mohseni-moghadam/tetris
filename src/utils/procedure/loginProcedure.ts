import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { verifyPassword } from "../auth";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export const loginProcedure = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { email, password } = input;

    if (!email || !password) {
      throw new TRPCError({
        code: "UNPROCESSABLE_CONTENT",
        message: "Fill All Inputs",
      });
    }

    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      throw new TRPCError({
        code: "UNPROCESSABLE_CONTENT",
        message: "Email or Password is incorrect!",
      });
    }

    const token = sign({ email }, process.env.SECRET_KEY!, {
      expiresIn: 6 * 60 * 60,
    });

    const cookie = new Headers();

    cookie.set(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        maxAge: 1 * 60 * 60,
        path: "/",
      }),
    );

    console.log(ctx.headers.getSetCookie());

    return true;
  });
