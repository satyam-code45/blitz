import { inngest } from "./client";
import { openai, createAgent } from "@inngest/agent-kit";
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("blitz");
      return sandbox.sandboxId;
    });
    const summarizer = createAgent({
      name: "summarizer",
      system: "You are an expert summarizer.  You summarize in 10 words.",
      model: openai({ model: "gpt-4o" }),
    });

    const { output } = await summarizer.run(
      `summarize the following text ${event.data.value}`
    );

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    });

    return { output, sandboxUrl };
  }
);
