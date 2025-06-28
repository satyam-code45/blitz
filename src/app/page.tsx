import { caller } from "@/trpc/server";


export default async function Home() {
  
  const data = await caller.hello({text:"unknown"})
  
  return (
    <div className="text-red-600 font-bold">
      {JSON.stringify(data)}
    </div>
  );
}
