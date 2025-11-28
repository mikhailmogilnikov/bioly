import { Trans } from "@lingui/react/macro";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CopyButtonProps = {
  text: string;
  className?: string;
  iconClassName?: string;
  children?: React.ReactNode;
};

export function CopyButton({
  text,
  className,
  iconClassName,
  children,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <button className={className} onClick={handleCopy} type="button">
      {copied ? (
        <>
          <Check className={iconClassName} />{" "}
          {children || <Trans>Copied!</Trans>}
        </>
      ) : (
        <>
          <Copy className={iconClassName} /> {children || <Trans>Copy</Trans>}
        </>
      )}
    </button>
  );
}
