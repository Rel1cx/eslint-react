import type { CompatiblePlugin } from "@eslint-react/shared";

import { name, version } from "../package.json";

import componentName from "./rules/component-name";
import contextName from "./rules/context-name";
import fileName from "./rules/file-name";
import fileNameExtension from "./rules/file-name-extension";
import useRefName from "./rules/ref-name";
import useState from "./rules/use-state";

export const plugin: CompatiblePlugin = {
  meta: {
    name,
    version,
  },
  rules: {
    ["component-name"]: componentName,
    ["context-name"]: contextName,
    ["file-name"]: fileName,
    ["file-name-extension"]: fileNameExtension,
    ["filename"]: fileName,
    ["filename-extension"]: fileNameExtension,
    ["ref-name"]: useRefName,
    ["use-state"]: useState,
  },
};
