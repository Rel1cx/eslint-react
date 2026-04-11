import { DEFAULT_ESLINT_REACT_SETTINGS } from "@eslint-react/shared";
import type { Linter } from "eslint";

import { plugin } from "../plugin";

export const name = "react-rsc/recommended";

export const rules = {
  "react-rsc/function-definition": "error",
} as const satisfies Linter.RulesRecord;

export const plugins = {
  "react-rsc": plugin,
};

export const settings = {
  "react-rsc": DEFAULT_ESLINT_REACT_SETTINGS,
};
