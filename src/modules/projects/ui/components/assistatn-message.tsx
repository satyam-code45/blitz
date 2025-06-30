import { Fragment, MessageType } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import FragmentCard from "./fragment-card";

interface AssistatnMessageProps {
  content: string;
  fragment: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: Fragment) => void;
  type: MessageType;
}

function AssistantMessage({
  content,
  createdAt,
  fragment,
  isActiveFragment,
  onFragmentClick,
  type,
}: AssistatnMessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col group px-2 pb-4:",
        type === "ERROR" && "text-red-700 dark:text-red-500"
      )}
    >
      <div className="flex items-center gap-2 pl-2 mb-2">
        <Image
          src={"/logo.svg"}
          alt="blitz"
          height={18}
          width={18}
          className="shrink-0"
        />
        <span className="text-sm font-medium">Blitz</span>
        <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          {format(createdAt, "HH:mm 'on' MMM dd, yyyy")}
        </span>
      </div>
      <div className="pl-8.5 flex flex-col gap-y-4">
        <span>{content}</span>
        {fragment && type === "RESULT" && (
            <FragmentCard
                fragment={fragment}
                isActiveFragment={isActiveFragment}
                onFragmentClick={onFragmentClick}
            />
        )}
      </div>
    </div>
  );
}

export default AssistantMessage;
