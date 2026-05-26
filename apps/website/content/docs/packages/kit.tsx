"use client";

import { useLayoutEffect } from "react";

export function AutoClick({ selector }: { selector: string }) {
  useLayoutEffect(() => {
    document.querySelector<HTMLElement>(selector)?.click();
  }, [selector]);
}
