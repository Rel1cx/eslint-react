import type { StaticImageData } from "next/image";
import logo from "#/assets/logo.svg";
import Image from "next/image";
import React from "react";

export function ESLintReact() {
  return (
    <div className="flex flex-col items-center gap-4 m-0 mx-auto p-8 w-fit">
      <Image alt="logo" height="150" quality={100} src={logo as StaticImageData} width="150" />
      <span className="text-2xl">ESLint React</span>
      <p className="text-center text-(--color-fd-prose-body) pt-4">
        A series of composable ESLint rules for React and friends.
      </p>
    </div>
  );
}
