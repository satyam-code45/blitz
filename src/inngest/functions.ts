import { inngest } from "./client";
import {
  Agent,
  openai,
  createAgent,
} from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const summarizer = createAgent({
      name: "summarizer",
      system: "You are an expert summarizer.  You summarize in 10 words.",
      model: openai({ model: "gpt-4o" }),
    });

    const { output } = await summarizer.run(
      `summarize the following text ${event.data.value}`
    );
    console.log(output);
    return { output };
  }
);
