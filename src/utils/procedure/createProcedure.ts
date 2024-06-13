import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { hashPassword } from "../auth";

export const createProcedure = publicProcedure
  .input(
    z.object({
      name: z.string().min(4),
      email: z.string().email(),
      password: z.string().min(6),
    }),
  )
  .mutation(async (opts) => {
    const { name, email, password } = opts.input;

    if (!name || !email || !password) {
      throw new TRPCError({
        code: "UNPROCESSABLE_CONTENT",
        message: "Fill All Inputs",
      });
    }

    const existingUser = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new TRPCError({
        code: "UNPROCESSABLE_CONTENT",
        message: "User Already Exist",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    console.log(user);
    return { success: true, user };
  });
