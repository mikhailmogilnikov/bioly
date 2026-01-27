"use client";

import { useLingui } from "@lingui/react/macro";
import { Eye, EyeOff } from "lucide-react";
import type * as React from "react";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { inputBaseClasses } from "./input";

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
        className={cn(inputBaseClasses, className)}
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
