/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";

import logo from "#/assets/logo.svg";
import { Image } from "#/components/image";

import * as css from "./styles.css";

export function ESLintReactCard() {
  return (
    <div className={css.root}>
      <Image src={logo} alt="logo" width="150" height="150" />
      <h1>
        ESLint x React
      </h1>
    </div>
  );
}
