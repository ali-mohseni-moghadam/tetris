import { TRPCError } from "@trpc/server";
import { hashPassword, verifyPassword } from "~/utils/auth";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
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
    }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async (opts) => {
      const { email, password } = opts.input;

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

      return {
        success: true,
      };
    }),
});
