import type { CompatiblePlugin } from "@eslint-react/shared";

import { name, version } from "../package.json";

import componentName from "./rules/component-name";
import contextName from "./rules/context-name";
import filename from "./rules/filename";
import filenameExtension from "./rules/filename-extension";
import useState from "./rules/use-state";
import useRefName from "./rules/use-ref-name";

export const plugin: CompatiblePlugin = {
  meta: {
    name,
    version,
  },
  rules: {
    ["component-name"]: componentName,
    ["context-name"]: contextName,
    ["filename"]: filename,
    ["filename-extension"]: filenameExtension,
    ["use-ref-name"]: useRefName,
    ["use-state"]: useState,
  },
};
