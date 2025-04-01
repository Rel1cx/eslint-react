import type { LinkItemType } from "fumadocs-ui/layouts/links";
import type { ReactNode } from "react";

import { baseOptions } from "#/app/layout.config";
import { HomeLayout } from "fumadocs-ui/layouts/home";

const links = [
  {
    active: "nested-url",
    text: "Docs",
    url: "/docs/getting-started/typescript",
  },
  {
    active: "nested-url",
    text: "Rules",
    url: "/docs/rules",
  },
  {
    active: "nested-url",
    text: "Presets",
    url: "/docs/presets",
  },
  {
    active: "nested-url",
    text: "Roadmap",
    url: "/docs/roadmap",
  },
  {
    active: "nested-url",
    text: "Changelog",
    url: "/docs/changelog",
  },
  {
    active: "nested-url",
    text: "Community",
    url: "/docs/community",
  },
] as const satisfies LinkItemType[];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={links}
    >
      {children}
    </HomeLayout>
  );
}
