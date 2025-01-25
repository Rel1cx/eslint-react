import type { StaticImageData } from "next/image";
import React from "react";

import logo from "#/assets/logo.svg";

import { Image } from "./ui/image";

export function ESLintReact() {
  return (
    <div className="flex flex-col items-center gap-4 m-0 mx-auto p-8 w-fit">
      <Image alt="logo" height="150" src={logo as StaticImageData} width="150" />
      <span className="text-2xl">ESLint React</span>
    </div>
  );
}
