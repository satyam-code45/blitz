"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");
  const trpc = useTRPC();

  const { data: userapikeys } = useQuery(trpc.user.getMany.queryOptions());

  const createUser = useMutation(
    trpc.user.update.mutationOptions({
      onSuccess: () => {
        router.push("/");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const onSubmit = async () => {
    await createUser.mutateAsync({
      apiKey: apiKey,
      llm: "OPENAI",
    });
  };
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="space-y-4">
          {userapikeys?.map((user) => (
            <div key={user.id} className="border p-4 rounded-lg shadow-sm">
              <div className="mt-2">
                {user.keys.map((k) => (
                  <p key={k.id} className="text-sm font-mono">
                    🔑 {k.key} — <span className="font-semibold">{k.llm} - {k.inUse && <p>In Use Currently</p>}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Input
            placeholder="api-key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Button onClick={onSubmit}>Create</Button>
        </div>
      </section>
    </div>
  );
};

export default Page;
