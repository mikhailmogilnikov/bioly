/** biome-ignore-all lint/a11y/useFocusableInteractive: 1 */
/** biome-ignore-all lint/a11y/useAriaPropsForRole: 1 */
/** biome-ignore-all lint/a11y/useSemanticElements: 1 */
"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
import type * as React from "react";
import { useContext } from "react";
import { cn } from "@/shared/lib/utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      className={cn("disabled:cursor-not-allowed", className)}
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      data-slot="input-otp"
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center", className)}
      data-slot="input-otp-group"
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      className={cn(
        "relative flex h-14 w-14 items-center justify-center border-outline border-y border-r bg-default font-semibold text-xl shadow-xs outline-none transition-[color,box-shadow]",
        "first:rounded-l-xl first:border-l last:rounded-r-xl",
        "data-[active=true]:z-10 data-[active=true]:ring-[3px] data-[active=true]:ring-link/50",
        "aria-invalid:border-danger aria-invalid:ring-danger/20",
        "data-[active=true]:aria-invalid:border-danger data-[active=true]:aria-invalid:ring-danger/20",
        className
      )}
      data-active={isActive}
      data-slot="input-otp-slot"
      {...props}
    >
      {char}
      {hasFakeCaret ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      ) : null}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
