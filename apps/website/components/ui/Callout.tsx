import { cn } from "#/lib/cn";
import type { Pretty } from "@local/eff";
import { Callout as FDCallout } from "fumadocs-ui/components/callout";
import type React from "react";

export type CalloutProps = Pretty<Parameters<typeof FDCallout>[0]> & { ref?: React.RefObject<HTMLDivElement | null> };

export function Callout({ children, className, ...props }: CalloutProps) {
  return (
    <FDCallout className={cn("fd-callout", className)} {...props}>
      {children}
    </FDCallout>
  );
}
