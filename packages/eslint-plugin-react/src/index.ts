import type { ESLintUtils } from "@typescript-eslint/utils";

import noClassComponent from "./rules/no-class-component";
import noConstructedContextValue from "./rules/no-constructed-context-value";
import noDangerouslySetInnerHTML from "./rules/no-dangerously-set-innerhtml";
import noDangerouslySetInnerHTMLWithChildren from "./rules/no-dangerously-set-innerhtml-with-children";
import noDeprecatedStringRefs from "./rules/no-string-refs";
import noUnstableDefaultProps from "./rules/no-unstable-default-props";
import noUnstableNestedComponents from "./rules/no-unstable-nested-components";

export { name } from "../package.json";

export const rules = {
  "no-class-component": noClassComponent,
  "no-constructed-context-value": noConstructedContextValue,
  "no-dangerously-set-innerhtml": noDangerouslySetInnerHTML,
  "no-dangerously-set-innerhtml-with-children": noDangerouslySetInnerHTMLWithChildren,
  "no-string-refs": noDeprecatedStringRefs,
  "no-unstable-default-props": noUnstableDefaultProps,
  "no-unstable-nested-components": noUnstableNestedComponents,
} as const;
