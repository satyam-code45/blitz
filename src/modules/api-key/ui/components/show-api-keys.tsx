"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const maskKey = (key: string) => {
  if (key.length <= 7) return key;
  return `${key.slice(0, 5)}...${key.slice(-2)}`;
};

interface ButtonProps {
  id: string;
}

const ShowApiKey = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isInUse, setIsInUse] = useState(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: userApiKeys } = useQuery(trpc.user.getMany.queryOptions());
  const InUse = useMutation(
    trpc.user.inuse.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.user.getMany.queryOptions());
        toast.success("Your in use key has been updated!");
        setIsInUse(false);
      },
      onError: (error) => {
        console.log(error.message);

        toast.error(error.message);
        setIsInUse(false);
      },
    })
  );

  const onUseKey = async ({ id }: ButtonProps) => {
    setIsInUse(true);
    await InUse.mutateAsync({
      id,
    });
  };

  const OnDelete = useMutation(
    trpc.user.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.user.getMany.queryOptions());
        toast.success("Api key deleted successfully!");
        setIsDeleting(false);
      },
      onError: (error) => {
        console.log(error.message);

        toast.error(error.message);
        setIsDeleting(false);
      },
    })
  );

  const onDeleteKey = async ({ id }: ButtonProps) => {
    setIsDeleting(true);
    await OnDelete.mutateAsync({
      id,
    });
  };

  return (
    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
      {userApiKeys?.map((user) => {
        const sortedKeys = [...user.keys].sort((a, b) => {
          if (a.inUse && !b.inUse) return -1;
          if (!a.inUse && b.inUse) return 1;
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        });

        return (
          <div key={user.id} className="border p-4 rounded-lg shadow-sm">
            <div className="space-y-3">
              {sortedKeys.map((k) => (
                <div
                  key={k.id}
                  className="border p-3 rounded-md bg-muted/50 flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-mono truncate">
                      🔑 {maskKey(k.key)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {k.llm} / {k.model}
                    </div>
                    {k.inUse && (
                      <div className="text-green-600 text-sm font-semibold">
                        ✅ In Use Currently
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {!k.inUse && (
                      <Button
                        variant="secondary"
                        onClick={() => onUseKey({ id: k.id })}
                        disabled={isInUse}
                      >
                        Use it
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      onClick={() => onDeleteKey({ id: k.id })}
                      disabled={isDeleting}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowApiKey;
