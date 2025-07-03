import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  inuse: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const existingUser = await prisma.user.findUnique({
        where: {
          id: ctx.auth.userId,
        },
        include: {
          keys: true,
        },
      });
      if (!existingUser) {
        throw new TRPCError({ code: "NOT_FOUND", message: "user not found" });
      }
      const inUseKey = existingUser.keys.find((k) => k.inUse === true);
      await prisma.$transaction([
        ...(inUseKey
          ? [
              prisma.llmKey.update({
                where: { id: inUseKey.id },
                data: { inUse: false },
              }),
            ]
          : []),

        prisma.llmKey.update({
          where: { id: input.id },
          data: { inUse: true },
        }),
      ]);
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await prisma.user.update({
        where: {
          id: ctx.auth.userId,
        },
        data: {
          keys: {
            delete: {
              id: input.id,
            },
          },
        },
      });
    }),

  getMany: protectedProcedure.query(async ({ ctx }) => {
    const apiKeys = await prisma.user.findMany({
      where: {
        id: ctx.auth.userId,
      },
      include: {
        keys: true,
      },
      orderBy: {
        updatedAt: "asc",
      },
    });
    return apiKeys;
  }),
  update: protectedProcedure
    .input(
      z.object({
        llm: z.string(),
        apiKey: z.string().min(1, { message: "Api Key is too short!" }),
        model: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const existingUser = await prisma.user.findUnique({
        where: {
          id: ctx.auth.userId,
        },
        include: {
          keys: true,
        },
      });

      if (!existingUser) {
        const user = await clerkClient.users.getUser(ctx.auth.userId);
        const email = user.emailAddresses[0]?.emailAddress ?? "";
        const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
        console.log("User: " + email);
        console.log("User: " + name);

        await prisma.user.create({
          data: {
            id: ctx.auth.userId,
            email: email,
            name: name,
            keys: {
              create: {
                key: input.apiKey,
                llm: input.llm,
                inUse: true,
                model: input.model,
              },
            },
          },
        });
        console.log("User Created Successfully");
      } else {
        const inUseKey = existingUser.keys.find((k) => k.inUse === true);

        await prisma.user.update({
          where: {
            id: ctx.auth.userId,
          },
          data: {
            keys: {
              ...(inUseKey && {
                update: {
                  where: {
                    id: inUseKey.id,
                  },
                  data: {
                    inUse: false,
                  },
                },
              }),
              create: {
                key: input.apiKey,
                llm: input.llm,
                inUse: true,
                model: input.model,
              },
            },
          },
        });
      }
    }),
});
