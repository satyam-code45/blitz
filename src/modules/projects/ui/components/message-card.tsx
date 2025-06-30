import { Fragment, MessageRole, MessageType } from "@/generated/prisma";
import UserMessage from "./user-message";
import AssistantMessage from "./assistatn-message";

interface MessageCardProps {
  content: string;
  role: MessageRole;
  fragment: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: Fragment) => void;
  type: MessageType;
}

export default function MessageCard({
  content,
  createdAt,
  fragment,
  isActiveFragment,
  onFragmentClick,
  role,
  type,
}: MessageCardProps) {
  if (role === "ASSISTANT") {
    return (
      <AssistantMessage
        content={content}
        createdAt={createdAt}
        fragment={fragment}
        isActiveFragment={isActiveFragment}
        onFragmentClick={onFragmentClick}
        type={type}
      />
    );
  }

  return <UserMessage content={content} />;
}
