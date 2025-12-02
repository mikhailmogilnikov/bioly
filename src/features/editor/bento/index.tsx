import { BentoGridController } from "./grid/ui/controller";
import { BentoGridRoot } from "./grid/ui/root";

export function EditorBento() {
  return (
    <main className="motion-opacity-in-0 mx-auto w-full max-w-116 px-[8px] lg:px-0">
      <BentoGridRoot>
        <BentoGridController />
      </BentoGridRoot>
    </main>
  );
}
