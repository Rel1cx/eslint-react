import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import logo from "#/assets/logo.svg";

import Image from "next/image";
import React from "react";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/Rel1cx/eslint-react",
  links: [
    {
      active: "nested-url",
      text: "Getting Started",
      url: "/docs/getting-started",
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
      text: "Contributing",
      url: "/docs/contributing",
    },
    {
      active: "nested-url",
      text: "Community",
      url: "/docs/community",
    },
    {
      active: "nested-url",
      text: "Changelog",
      url: "/docs/changelog",
    },
    {
      active: "nested-url",
      text: "Roadmap",
      url: "/docs/roadmap",
    },
    {
      active: "nested-url",
      text: "FAQ",
      url: "/FAQ",
    },
  ],
  nav: {
    title: (
      <div className="flex items-between gap-2.5 min-w-max">
        <Image
          alt="logo"
          height="20"
          quality={100}
          src={logo}
          width="20"
        />
        <span>ESLint React</span>
      </div>
    ),
  },
};
