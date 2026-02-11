import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/kit/primitives/button";
import { Separator } from "@/shared/ui/kit/primitives/separator";
import { SectionTitle } from "@/shared/ui/kit/section-title";

export interface ActionListItem {
  /** Unique key for list item. Fallback: string label or index. */
  id?: string;
  /** Label or i18n node (e.g. <Trans>...</Trans>). */
  label: React.ReactNode;
  icon: React.ElementType;
  onClick: () => void;
  disabled: boolean;
  className?: string;
}

interface ActionListProps {
  title: string;
  actions: ActionListItem[];
  className?: string;
  contentClassName?: string;
}

export function ActionList({
  title,
  actions,
  className,
  contentClassName = "squircle flex gap-0 flex-col",
}: ActionListProps) {
  return (
    <SectionTitle
      className={className}
      contentClassName={contentClassName}
      title={title}
    >
      {actions.map((action, index) => (
        <Fragment
          key={
            action.id ??
            (typeof action.label === "string" ? action.label : index)
          }
        >
          <Button
            className={cn(
              "h-16 w-full justify-between rounded-none has-[>svg]:px-5",
              action.className
            )}
            disabled={action.disabled}
            onClick={action.onClick}
            variant="ghost"
          >
            <div className="flex items-center gap-3">
              <action.icon className="size-5" />
              {action.label}
            </div>
            <ChevronRight className="size-6 opacity-50" />
          </Button>
          {index !== actions.length - 1 && <Separator />}
        </Fragment>
      ))}
    </SectionTitle>
  );
}
