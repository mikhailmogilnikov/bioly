"use client";

import { useLingui } from "@lingui/react/macro";
import { Eye, EyeOff } from "lucide-react";
import type * as React from "react";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";

interface PasswordInputProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  className?: string;
}

function PasswordInput({ className, ...props }: PasswordInputProps) {
  const { t } = useLingui();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        className={cn(
          "h-11 w-full min-w-0 rounded-xl border border-outline bg-default py-1 pr-10 pl-3 text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-foreground/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-foreground focus-visible:ring-[3px] focus-visible:ring-foreground/50",
          "aria-invalid:border-danger aria-invalid:ring-danger/20",
          className
        )}
        data-slot="input"
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <button
        aria-label={showPassword ? t`Скрыть пароль` : t`Показать пароль`}
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded p-1 text-foreground/60 transition-colors hover:text-foreground"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowPassword(!showPassword);
        }}
        type="button"
      >
        {showPassword ? (
          <EyeOff className="size-5" />
        ) : (
          <Eye className="size-5" />
        )}
      </button>
    </div>
  );
}

export { PasswordInput };
