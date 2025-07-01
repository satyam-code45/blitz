"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import MessageContainer from "../components/messages-container";
import { Suspense, useState } from "react";
import { Fragment } from "@/generated/prisma";
import ProjectHeader from "../components/project-header";
import FragmentWeb from "../components/fragment-web";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeIcon, EyeIcon } from "lucide-react";
import { FileExplorer } from "@/components/file-explorer";

interface Props {
  projectId: string;
}

function ProjectView({ projectId }: Props) {
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const [tabState, setTabState] = useState<"preview" | "code">("preview");

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0"
        >
          <Suspense fallback={<p>loading header...</p>}>
            <ProjectHeader projectId={projectId} />
          </Suspense>
          <Suspense fallback={<p>Loading Messages .....</p>}>
            <MessageContainer
              projectId={projectId}
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
          </Suspense>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={65} minSize={50}>
          <Tabs
            className="h-full gap-y-0 "
            defaultValue="preview"
            value={tabState}
            onValueChange={(value) => setTabState(value as "preview" | "code")}
          >
            <div className="w-full flex items-center p-2 border-b gap-x-2">
              <TabsList className="h-8 p-0 border rounded-md">
                <TabsTrigger
                  value="preview"
                  className="rounded-md cursor-pointer"
                >
                  <EyeIcon /> <span>Preview</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="rounded-md cursor-pointer">
                  <CodeIcon /> <span>Code</span>
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="preview">
              {!!activeFragment && <FragmentWeb data={activeFragment} />}
            </TabsContent>
            <TabsContent value="code" className="min-h-0">
              {!!activeFragment?.files && (
                <FileExplorer
                  files={activeFragment.files as {[path: string]: string }}
                />
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default ProjectView;
