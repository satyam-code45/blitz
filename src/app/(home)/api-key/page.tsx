import CreateApiKey from "@/modules/api-key/ui/components/create-api-key";
import ShowApiKey from "@/modules/api-key/ui/components/show-api-keys";

const Page = () => {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <CreateApiKey />

        <ShowApiKey />
      </section>
    </div>
  );
};

export default Page;
