"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const trpc = useTRPC();

  const createdProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError: (error) => {
        console.log("Error from created Projects: " + error.message);

        toast.error("Error from created Projects: " + error.message);
      },
      onSuccess: (data) => {
        router.push(`/projects/${data.id}`);
      },
    })
  );

  return (
    <div className="h-screen w-screen flex items-center justify-between">
      <div className="max-w-7xl mx-auto flex items-center flex-col gap-y-4 justify-center">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button
          disabled={createdProject.isPending}
          onClick={() => createdProject.mutate({ value })}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
