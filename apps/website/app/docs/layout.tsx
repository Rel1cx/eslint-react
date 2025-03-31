// Docs layout
import type { ReactNode } from "react";
import { baseOptions } from "#/app/layout.config";

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

// Notebook layout
// import type { ReactNode } from "react";
// import { baseOptions } from "#/app/layout.config";
// import { source } from "#/lib/source";
// import { DocsLayout } from "fumadocs-ui/layouts/notebook";

// export default function Layout({ children }: { children: ReactNode }) {
//   return (
//     <DocsLayout
//       {...baseOptions}
//       links={baseOptions.links?.slice(1, -1) ?? []}
//       // the position of navbar
//       nav={{ ...baseOptions.nav, mode: "top" }}
//       // the position of Sidebar Tabs
//       tabMode="navbar"
//       tree={source.pageTree}
//     >
//       {children}
//     </DocsLayout>
//   );
// }
