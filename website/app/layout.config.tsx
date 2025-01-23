import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import type { StaticImageData } from "next/image";
import React from "react";

import logo from "#/assets/logo.svg";
import { Image } from "#/components/ui/image";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image src={logo as StaticImageData} width="20" height="20" alt="logo" />ESLint React
      </>
    ),
  },
  links: [
    {
      text: "Getting Started",
      url: "/docs/getting-started",
      active: "nested-url",
    },
    {
      text: "Rules",
      url: "/docs/rules",
      active: "nested-url",
    },
    {
      text: "Presets",
      url: "/docs/presets",
      active: "nested-url",
    },
    {
      text: "Changelog",
      url: "https://github.com/Rel1cx/eslint-react/releases",
    },
    {
      text: "Roadmap",
      url: "/docs/roadmap",
      active: "nested-url",
    },
  ],
};
