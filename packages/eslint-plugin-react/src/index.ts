import type { ESLintUtils } from "@typescript-eslint/utils";

import { name, version } from "../package.json";
import noChildrenInVoidDomElements from "./rules/no-children-in-void-dom-elements";
import noClassComponent from "./rules/no-class-component";
import noCloneElement from "./rules/no-clone-element";
import noConstructedContextValue from "./rules/no-constructed-context-value";
import noCreateRef from "./rules/no-create-ref";
import noDangerouslySetInnerHTML from "./rules/no-dangerously-set-innerhtml";
import noDangerouslySetInnerHTMLWithChildren from "./rules/no-dangerously-set-innerhtml-with-children";
import noMissingButtonType from "./rules/no-missing-button-type";
import noMissingIframeSandbox from "./rules/no-missing-iframe-sandbox";
import noNamespace from "./rules/no-namespace";
import noScriptUrl from "./rules/no-script-url";
import noStringRefs from "./rules/no-string-refs";
import noUnsafeIframeSandbox from "./rules/no-unsafe-iframe-sandbox";
import noUnsafeTargetBlank from "./rules/no-unsafe-target-blank";
import noUnstableDefaultProps from "./rules/no-unstable-default-props";
import noUnstableNestedComponents from "./rules/no-unstable-nested-components";
import preferDestructuringAssignment from "./rules/prefer-destructuring-assignment";

export const meta = {
  name,
  version,
} as const;

export const rules = {
  "no-children-in-void-dom-elements": noChildrenInVoidDomElements,
  "no-class-component": noClassComponent,
  "no-clone-element": noCloneElement,
  "no-constructed-context-value": noConstructedContextValue,
  "no-create-ref": noCreateRef,
  "no-dangerously-set-innerhtml": noDangerouslySetInnerHTML,
  "no-dangerously-set-innerhtml-with-children": noDangerouslySetInnerHTMLWithChildren,
  "no-missing-button-type": noMissingButtonType,
  "no-missing-iframe-sandbox": noMissingIframeSandbox,
  "no-namespace": noNamespace,
  "no-script-url": noScriptUrl,
  "no-string-refs": noStringRefs,
  "no-unsafe-iframe-sandbox": noUnsafeIframeSandbox,
  "no-unsafe-target-blank": noUnsafeTargetBlank,
  "no-unstable-default-props": noUnstableDefaultProps,
  "no-unstable-nested-components": noUnstableNestedComponents,
  "prefer-destructuring-assignment": preferDestructuringAssignment,
} as const;
