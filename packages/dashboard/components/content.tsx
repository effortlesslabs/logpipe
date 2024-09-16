import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function Content() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border w-full"
    >
      <ResizablePanel defaultSize={20}>
        <div className="flex h-screen items-center justify-center">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>
        <div className="flex h-screen items-center justify-center">
          <span className="font-semibold">Three</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default Content;
