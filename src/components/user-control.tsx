"use client";

import { useCurrentTheme } from "@/hooks/use-current-theme";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";

interface Props {
  showName?: boolean;
}

export const UserControl = ({ showName }: Props) => {
  const currentTheme = useCurrentTheme();
  return (
    <div className="flex items-center gap-6 ">
      <nav className="flex gap-2 md:gap-4 text-muted-foreground text-sm md:text-lg font-semibold">
        <Link
          href="/"
          className="hover:text-primary transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/api-key"
          className="hover:text-primary transition-colors duration-200"
        >
          Api Key
        </Link>
      </nav>
      <UserButton
        showName={showName}
        appearance={{
          elements: {
            userButtonBox: "rounded-md!",
            userButtonAvatarBox: "rounded-md! size-8!",
            userButtonTrigger: "rounded-md!",
          },
          baseTheme: currentTheme === "dark" ? dark : undefined,
        }}
      />
    </div>
  );
};
