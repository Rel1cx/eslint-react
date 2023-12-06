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
import noComponentWillMount from "./rules/no-component-will-mount";
import noComponentWillReceiveProps from "./rules/no-component-will-receive-props";
import noComponentWillUpdate from "./rules/no-component-will-update";
import noConstructedContextValue from "./rules/no-constructed-context-value";
import noCreateRef from "./rules/no-create-ref";
import noDangerouslySetInnerHTML from "./rules/no-dangerously-set-innerhtml";
import noDangerouslySetInnerHTMLWithChildren from "./rules/no-dangerously-set-innerhtml-with-children";
import noFindDomNode from "./rules/no-find-dom-node";
import noMissingButtonType from "./rules/no-missing-button-type";
import noMissingComponentDisplayName from "./rules/no-missing-component-display-name";
import noMissingIframeSandbox from "./rules/no-missing-iframe-sandbox";
import noNamespace from "./rules/no-namespace";
import noRedundantShouldComponentUpdate from "./rules/no-redundant-should-component-update";
import noRenderReturnValue from "./rules/no-render-return-value";
import noScriptUrl from "./rules/no-script-url";
import noSetStateInComponentDidMount from "./rules/no-set-state-in-component-did-mount";
import noSetStateInComponentDidUpdate from "./rules/no-set-state-in-component-did-update";
import noSetStateInComponentWillUpdate from "./rules/no-set-state-in-component-will-update";
import noStringRefs from "./rules/no-string-refs";
import noUnsafeComponentWillMount from "./rules/no-unsafe-component-will-mount";
import noUnsafeComponentWillReceiveProps from "./rules/no-unsafe-component-will-receive-props";
import noUnsafeComponentWillUpdate from "./rules/no-unsafe-component-will-update";
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
  "no-component-will-mount": noComponentWillMount,
  "no-component-will-receive-props": noComponentWillReceiveProps,
  "no-component-will-update": noComponentWillUpdate,
  "no-constructed-context-value": noConstructedContextValue,
  "no-create-ref": noCreateRef,
  "no-dangerously-set-innerhtml": noDangerouslySetInnerHTML,
  "no-dangerously-set-innerhtml-with-children": noDangerouslySetInnerHTMLWithChildren,
  "no-find-dom-node": noFindDomNode,
  "no-missing-button-type": noMissingButtonType,
  "no-missing-component-display-name": noMissingComponentDisplayName,
  "no-missing-iframe-sandbox": noMissingIframeSandbox,
  "no-namespace": noNamespace,
  "no-redundant-should-component-update": noRedundantShouldComponentUpdate,
  "no-render-return-value": noRenderReturnValue,
  "no-script-url": noScriptUrl,
  "no-set-state-in-component-did-mount": noSetStateInComponentDidMount,
  "no-set-state-in-component-did-update": noSetStateInComponentDidUpdate,
  "no-set-state-in-component-will-update": noSetStateInComponentWillUpdate,
  "no-string-refs": noStringRefs,
  "no-unsafe-component-will-mount": noUnsafeComponentWillMount,
  "no-unsafe-component-will-receive-props": noUnsafeComponentWillReceiveProps,
  "no-unsafe-component-will-update": noUnsafeComponentWillUpdate,
  "no-unsafe-iframe-sandbox": noUnsafeIframeSandbox,
  "no-unsafe-target-blank": noUnsafeTargetBlank,
  "no-unstable-default-props": noUnstableDefaultProps,
  "no-unstable-nested-components": noUnstableNestedComponents,
  "prefer-destructuring-assignment": preferDestructuringAssignment,
} as const;
