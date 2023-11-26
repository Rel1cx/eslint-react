import { Callout } from "nextra-theme-docs";
import type { ReactNode } from "react";

export function Error({ children }: { children: ReactNode }) {
  return <Callout type="error">{children}</Callout>;
}

export function Info({ children }: { children: ReactNode }) {
  return <Callout type="info">{children}</Callout>;
}

export function Warning({ children }: { children: ReactNode }) {
  return <Callout type="warning">{children}</Callout>;
}
