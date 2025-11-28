import { EditBarMenu } from "./menu";
// import { EditBarNewItem } from "./new-item";
import { EditBarShare } from "./share";
import { EditorMenuStatusBar } from "./status-bar";

export const EditorMenu = () => (
  <nav className="-translate-x-1/2 fixed bottom-5 left-1/2 flex h-fit w-fit max-w-72 items-center justify-between gap-1.5 overflow-clip rounded-full border border-foreground/8 bg-default/50 p-2 backdrop-blur-md sm:bottom-6">
    <EditBarMenu />
    {/* <EditBarNewItem /> */}
    <EditBarShare />
    <EditorMenuStatusBar />
  </nav>
);
