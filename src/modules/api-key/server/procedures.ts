import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { z } from "zod";

export const userRouter = createTRPCRouter({
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
        updatedAt: "desc",
      },
    });
    return apiKeys;
  }),
  update: protectedProcedure
    .input(
      z.object({
        llm: z.enum(["OPENAI", "GEMINI"]),
        apiKey: z.string().min(1, { message: "Api Key is too short!" }),
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
        console.log("User: " + user);

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
              },
            },
          },
        });
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
              },
            },
          },
        });
      }
    }),
});
