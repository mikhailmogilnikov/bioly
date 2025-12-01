import { AutoScroller, MuuriComponent } from "muuri-react";
import { useProfile } from "@/features/editor/profile/use-profile";
import type { BentoBlock, BentoBlockTypeKey } from "../../blocks/model/types";
import { useBentoStore } from "../model/use-bento-store";

export const BentoGridController = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { gridSize } = useBentoStore(
    (state) => ({
      gridSize: state.gridSize,
    }),
    "shallow"
  );

  const { updateMainField } = useProfile(
    (state) => ({
      updateMainField: state.updateMainField,
    }),
    "shallow"
  );

  return (
    <MuuriComponent
      containerClass="bento"
      dragAutoScroll={{
        targets: [
          {
            element: window,
            axis: AutoScroller.AXIS_Y,
          },
        ],
      }}
      dragEnabled
      dragFixed
      dragHandle=".handle"
      dragPlaceholder={{
        enabled: true,
        createElement(item) {
          // @ts-expect-error muuri-react
          const itemElement = item.getElement();
          const element = document.createElement("div");

          element.className = "bg-foreground opacity-50 squircle";
          element.style.width = itemElement.style.width;
          element.style.height = itemElement.style.height;

          return element;
        },
      }}
      dragRelease={{
        duration: 300,
      }}
      dragSortPredicate={{
        action: "move",
        migrateAction: "move",
        threshold: 50,
      }}
      itemClass="bento-item"
      itemDraggingClass="bento-item-dragging"
      itemHiddenClass="bento-item-hidden"
      itemPlaceholderClass="bento-item-placeholder"
      itemPositioningClass="bento-item-positioning"
      itemReleasingClass="bento-item-releasing"
      itemVisibleClass="bento-item-shown"
      key={gridSize}
      layout={{
        fillGaps: false,
      }}
      layoutDuration={300}
      layoutOnResize={false}
      onDragEnd={(item) => {
        const grid = item.getGrid();

        const bentoItems = grid.getItems().map((bentoItem, index) => {
          const props = bentoItem._component
            .props as BentoBlock<BentoBlockTypeKey>;

          return {
            ...props,
            order: index + 1,
          };
        });

        updateMainField("bento", bentoItems);

        // @ts-expect-error muuri-react
        grid.refreshItems();
      }}
    >
      {children as React.ReactElement[]}
    </MuuriComponent>
  );
};
