import type { ESLintUtils } from "@typescript-eslint/utils";

import noChildrenInVoidDomElements from "./rules/no-children-in-void-dom-elements";
import noClassComponent from "./rules/no-class-component";
import noConstructedContextValue from "./rules/no-constructed-context-value";
import noCreateRef from "./rules/no-create-ref";
import noDangerouslySetInnerHTML from "./rules/no-dangerously-set-innerhtml";
import noDangerouslySetInnerHTMLWithChildren from "./rules/no-dangerously-set-innerhtml-with-children";
import noNamespace from "./rules/no-namespace";
import noStringRefs from "./rules/no-string-refs";
import noUnstableDefaultProps from "./rules/no-unstable-default-props";
import noUnstableNestedComponents from "./rules/no-unstable-nested-components";
import preferDestructuringAssignment from "./rules/prefer-destructuring-assignment";

export { name } from "../package.json";

export const rules = {
  "no-children-in-void-dom-elements": noChildrenInVoidDomElements,
  "no-class-component": noClassComponent,
  "no-constructed-context-value": noConstructedContextValue,
  "no-create-ref": noCreateRef,
  "no-dangerously-set-innerhtml": noDangerouslySetInnerHTML,
  "no-dangerously-set-innerhtml-with-children": noDangerouslySetInnerHTMLWithChildren,
  "no-namespace": noNamespace,
  "no-string-refs": noStringRefs,
  "no-unstable-default-props": noUnstableDefaultProps,
  "no-unstable-nested-components": noUnstableNestedComponents,
  "prefer-destructuring-assignment": preferDestructuringAssignment,
} as const;
