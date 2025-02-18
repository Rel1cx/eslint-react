import { name, version } from "../package.json";
import componentName from "./rules/component-name";
import filename from "./rules/filename";
import filenameExtension from "./rules/filename-extension";
import useState from "./rules/use-state";

export const plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    "component-name": componentName,
    filename,
    "filename-extension": filenameExtension,
    "use-state": useState,
  },
} as const;
