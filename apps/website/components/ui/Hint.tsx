"use client";

import { Popover, PopoverContent, PopoverTrigger } from "fumadocs-ui/components/ui/popover";
import { Info } from "lucide-react";
import type { ReactNode } from "react";

interface HintProps {
  children: ReactNode;
  content: ReactNode;
  label?: string;
  side?: "top" | "right" | "bottom" | "left";
}

export function Hint({ children, content, label, side = "top" }: HintProps) {
  return (
    <span className="inline-flex items-center gap-1">
      {children}
      <Popover>
        <PopoverTrigger
          aria-label={label}
          className="inline-flex align-middle cursor-pointer"
        >
          <Info className="w-3.5 h-3.5 opacity-60 hover:opacity-100 transition-opacity" />
        </PopoverTrigger>
        <PopoverContent className="text-sm max-w-xs" side={side}>
          {content}
        </PopoverContent>
      </Popover>
    </span>
  );
}
