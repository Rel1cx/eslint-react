"use client";

import { useLayoutEffect } from "react";

export function AutoClick({ selector }: { selector: string }) {
  useLayoutEffect(() => void document.querySelector<HTMLElement>(selector)?.click(), [selector]);
}
