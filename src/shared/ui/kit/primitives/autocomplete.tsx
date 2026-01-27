"use client";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { XIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/shared/lib/utils";
import { inputBaseClasses } from "./input";

// Root
// biome-ignore lint/suspicious/noExplicitAny: flexible typing for generic component
function Autocomplete(props: BaseAutocomplete.Root.Props<any>) {
  return <BaseAutocomplete.Root data-slot="autocomplete" {...props} />;
}

// Input
interface AutocompleteInputProps
  extends React.ComponentProps<typeof BaseAutocomplete.Input> {
  showClear?: boolean;
}

function AutocompleteInput({
  className,
  showClear = false,
  ...props
}: AutocompleteInputProps) {
  return (
    <div className="relative flex w-full items-center">
      <BaseAutocomplete.Input
        className={cn(
          inputBaseClasses,
          showClear ? "pr-10" : "pr-3",
          className
        )}
        data-slot="autocomplete-input"
        {...props}
      />
      {showClear && (
        <div className="pointer-events-none absolute right-3 flex items-center">
          <BaseAutocomplete.Clear
            className="pointer-events-auto flex size-5 cursor-pointer items-center justify-center rounded-full text-foreground/50 outline-none hover:bg-foreground/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-link/50"
            data-slot="autocomplete-clear"
          >
            <XIcon className="size-3.5" />
          </BaseAutocomplete.Clear>
        </div>
      )}
    </div>
  );
}

// Content (Positioner + Popup)
interface AutocompleteContentProps
  extends React.ComponentProps<typeof BaseAutocomplete.Popup> {
  sideOffset?: number;
}

function AutocompleteContent({
  className,
  sideOffset = 8,
  children,
  ...props
}: AutocompleteContentProps) {
  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Positioner
        className="z-100"
        collisionPadding={16}
        data-slot="autocomplete-positioner"
        sideOffset={sideOffset}
      >
        <BaseAutocomplete.Popup
          className={cn(
            "motion-ease-in-out-quad motion-duration-200 data-open:motion-scale-in-90 data-open:motion-opacity-in-0 data-closed:motion-scale-out-95 data-closed:motion-opacity-out-0",
            "z-100 flex max-h-[min(var(--available-height),20rem)] min-w-(--anchor-width) max-w-[calc(100vw-2rem)] origin-(--transform-origin) flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background p-1 text-foreground shadow shadow-shadow outline-none",
            className
          )}
          data-slot="autocomplete-popup"
          {...props}
        >
          {children}
        </BaseAutocomplete.Popup>
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  );
}

// List
function AutocompleteList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.List>) {
  return (
    <BaseAutocomplete.List
      className={cn("flex flex-col gap-0.5 overflow-y-auto p-1", className)}
      data-slot="autocomplete-list"
      {...props}
    >
      {children}
    </BaseAutocomplete.List>
  );
}

// Item
function AutocompleteItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Item>) {
  return (
    <BaseAutocomplete.Item
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-xl px-3 py-2 text-sm outline-none transition-colors",
        "hover:bg-foreground/5 focus:bg-foreground/5",
        "data-highlighted:bg-foreground/5",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      data-slot="autocomplete-item"
      {...props}
    >
      {children}
    </BaseAutocomplete.Item>
  );
}

// Empty
function AutocompleteEmpty({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Empty>) {
  return (
    <BaseAutocomplete.Empty
      className={cn(
        "flex items-center justify-center text-center text-foreground/50 text-sm",
        className
      )}
      data-slot="autocomplete-empty"
      {...props}
    >
      <div className="pt-2">{children}</div>
    </BaseAutocomplete.Empty>
  );
}

// Group
function AutocompleteGroup({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Group>) {
  return (
    <BaseAutocomplete.Group
      className={cn("flex flex-col", className)}
      data-slot="autocomplete-group"
      {...props}
    />
  );
}

// GroupLabel
function AutocompleteGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.GroupLabel>) {
  return (
    <BaseAutocomplete.GroupLabel
      className={cn(
        "px-3 py-2 font-medium text-foreground/70 text-xs",
        className
      )}
      data-slot="autocomplete-group-label"
      {...props}
    />
  );
}

// Separator
function AutocompleteSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Separator>) {
  return (
    <BaseAutocomplete.Separator
      className={cn("-mx-1 my-1 h-px bg-foreground/10", className)}
      data-slot="autocomplete-separator"
      {...props}
    />
  );
}

// Status (for async loading states)
function AutocompleteStatus({
  className,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Status>) {
  return (
    <BaseAutocomplete.Status
      className={cn(
        "flex items-center justify-center py-4 text-center text-foreground/50 text-sm",
        className
      )}
      data-slot="autocomplete-status"
      {...props}
    />
  );
}

export {
  Autocomplete,
  AutocompleteInput,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteSeparator,
  AutocompleteStatus,
};
