import type { ESLintUtils } from "@typescript-eslint/utils";

import { name, version } from "../package.json";
import noChildrenCount from "./rules/no-children-count";
import noChildrenForEach from "./rules/no-children-for-each";
import noChildrenInVoidDomElements from "./rules/no-children-in-void-dom-elements";
import noChildrenMap from "./rules/no-children-map";
import noChildrenOnly from "./rules/no-children-only";
import noChildrenProp from "./rules/no-children-prop";
import noChildrenToArray from "./rules/no-children-to-array";
import noClassComponent from "./rules/no-class-component";
import noCloneElement from "./rules/no-clone-element";
import noConstructedContextValue from "./rules/no-constructed-context-value";
import noCreateRef from "./rules/no-create-ref";
import noDangerouslySetInnerHTML from "./rules/no-dangerously-set-innerhtml";
import noDangerouslySetInnerHTMLWithChildren from "./rules/no-dangerously-set-innerhtml-with-children";
import noFindDomNode from "./rules/no-find-dom-node";
import noMissingButtonType from "./rules/no-missing-button-type";
import noMissingComponentDisplayName from "./rules/no-missing-component-display-name";
import noMissingIframeSandbox from "./rules/no-missing-iframe-sandbox";
import noNamespace from "./rules/no-namespace";
import noRenderReturnValue from "./rules/no-render-return-value";
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
  "no-children-count": noChildrenCount,
  "no-children-for-each": noChildrenForEach,
  "no-children-in-void-dom-elements": noChildrenInVoidDomElements,
  "no-children-map": noChildrenMap,
  "no-children-only": noChildrenOnly,
  "no-children-prop": noChildrenProp,
  "no-children-to-array": noChildrenToArray,
  "no-class-component": noClassComponent,
  "no-clone-element": noCloneElement,
  "no-constructed-context-value": noConstructedContextValue,
  "no-create-ref": noCreateRef,
  "no-dangerously-set-innerhtml": noDangerouslySetInnerHTML,
  "no-dangerously-set-innerhtml-with-children": noDangerouslySetInnerHTMLWithChildren,
  "no-find-dom-node": noFindDomNode,
  "no-missing-button-type": noMissingButtonType,
  "no-missing-component-display-name": noMissingComponentDisplayName,
  "no-missing-iframe-sandbox": noMissingIframeSandbox,
  "no-namespace": noNamespace,
  "no-render-return-value": noRenderReturnValue,
  "no-script-url": noScriptUrl,
  "no-string-refs": noStringRefs,
  "no-unsafe-iframe-sandbox": noUnsafeIframeSandbox,
  "no-unsafe-target-blank": noUnsafeTargetBlank,
  "no-unstable-default-props": noUnstableDefaultProps,
  "no-unstable-nested-components": noUnstableNestedComponents,
  "prefer-destructuring-assignment": preferDestructuringAssignment,
} as const;
