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
  links: [],
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
    transparentMode: "top",
  },
  themeSwitch: {
    enabled: false,
  },
};
