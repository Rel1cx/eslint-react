import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { LinkItemType } from "fumadocs-ui/layouts/shared";
import type { ReactNode } from "react";

import { baseOptions } from "#/app/layout.config";

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
    text: "Changelog",
    url: "/docs/changelog",
  },
  {
    active: "nested-url",
    text: "Release Notes",
    url: "/docs/release-notes",
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
