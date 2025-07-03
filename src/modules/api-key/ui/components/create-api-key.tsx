"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { LLM_MODELS } from "../../constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  llm: z.string(),
  model: z.string(),
  apikey: z.string().min(1, "API key is required"),
});

const CreateApiKey = () => {
  const [saving, setSaving] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      llm: "",
      model: "",
      apikey: "",
    },
  });

  const selectedLLM = form.watch("llm");

  const modelOptions =
    LLM_MODELS.find((item) => item.llm === selectedLLM)?.models || [];

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createUser = useMutation(
    trpc.user.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.user.getMany.queryOptions());
        form.reset({
          llm: "",
          model: "",
          apikey: "",
        });
        toast.success("Api key added successfully");
        setSaving(false);
      },
      onError: (error) => {
        console.log(error.message);

        toast.error(error.message);
        setSaving(false);
      },
    })
  );

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setSaving(true);
    await createUser.mutateAsync({
      apiKey: data.apikey,
      llm: data.llm,
      model: data.model,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-4 flex-col md:flex-row md:justify-between items-center"
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="llm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LLM</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a LLM" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LLM_MODELS.map((provider) => (
                      <SelectItem key={provider.llm} value={provider.llm}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select a model"
                        className="w-fit"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {modelOptions.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="apikey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Key</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="input input-bordered w-full bg-muted-foreground rounded-md md:min-w-110"
                    placeholder="sk - ..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-5" disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Saving</span>
            </>
          ) : (
            "Save API Key"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateApiKey;
