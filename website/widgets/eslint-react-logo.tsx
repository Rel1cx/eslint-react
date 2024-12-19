/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";

import logo from "#/assets/logo.svg";
import { Image } from "#/components/image";

export function ESLintReactLogo() {
  return (
    <div className="flex flex-col items-center gap-4 m-0 mx-auto p-8 w-fit">
      <Image src={logo} alt="logo" width="150" height="150" />
      <h1 className="text-2xl">ESLint React</h1>
    </div>
  );
}
