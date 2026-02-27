// Docs layout
import { baseOptions } from "#/app/layout.config";
import type { ReactNode } from "react";

import { source } from "#/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions}
      tree={source.pageTree}
    >
      {children}
    </DocsLayout>
  );
}
