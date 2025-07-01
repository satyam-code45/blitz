import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Fragment } from "@/generated/prisma";
import { ExternalLinkIcon, RefreshCcwIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  data: Fragment;
}
function FragmentWeb({ data }: Props) {
  const [copied, setCopied] = useState(false);
  const [fragmentKey, setFragmentKey] = useState(0);

  const onRefresh = () => {
    setFragmentKey((prev) => prev + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data.sandboxUrl);
    toast.success("Sandbox Url copied successfully!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
        <Hint text="Re fresh" side="bottom" align="end">
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"
            onClick={onRefresh}
          >
            <RefreshCcwIcon />
          </Button>
        </Hint>
        <Hint text="Copy Sandbox Url" side="bottom" align="end">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            disabled={!data.sandboxUrl || copied}
            className="flex-1 cursor-pointer justify-start text-start font-normal"
          >
            <span className="truncate">{data.sandboxUrl}</span>
          </Button>
        </Hint>
        <Hint text="Open in a new tab" side="bottom" align="start">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (!data.sandboxUrl) {
                return;
              }
              window.open(data.sandboxUrl, "_blank");
            }}
            disabled={!data.sandboxUrl}
            className="cursor-pointer"
          >
            <ExternalLinkIcon />
          </Button>
        </Hint>
      </div>
      <iframe
        key={fragmentKey}
        className="h-full"
        sandbox="allow-forms allow-scripts allow-same-origin"
        loading="lazy"
        src={data.sandboxUrl}
      />
    </div>
  );
}

export default FragmentWeb;
