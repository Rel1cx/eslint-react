import type { ESLint } from "eslint";

import { name, version } from "../package.json";

import noDangerouslySetInnerHTMLWithChildren from "./rules/no-dangerously-set-innerhtml-with-children/no-dangerously-set-innerhtml-with-children";
import noDangerouslySetInnerHTML from "./rules/no-dangerously-set-innerhtml/no-dangerously-set-innerhtml";
import noFindDomNode from "./rules/no-find-dom-node/no-find-dom-node";
import noFlushSync from "./rules/no-flush-sync/no-flush-sync";
import noHydrate from "./rules/no-hydrate/no-hydrate";
import noMissingButtonType from "./rules/no-missing-button-type/no-missing-button-type";
import noMissingIframeSandbox from "./rules/no-missing-iframe-sandbox/no-missing-iframe-sandbox";
import noNamespace from "./rules/no-namespace/no-namespace";
import noRenderReturnValue from "./rules/no-render-return-value/no-render-return-value";
import noRender from "./rules/no-render/no-render";
import noScriptUrl from "./rules/no-script-url/no-script-url";
import noStringStyleProp from "./rules/no-string-style-prop/no-string-style-prop";
import noUnknownProperty from "./rules/no-unknown-property/no-unknown-property";
import noUnsafeIframeSandbox from "./rules/no-unsafe-iframe-sandbox/no-unsafe-iframe-sandbox";
import noUnsafeTargetBlank from "./rules/no-unsafe-target-blank/no-unsafe-target-blank";
import noUseFormState from "./rules/no-use-form-state/no-use-form-state";
import noVoidElementsWithChildren from "./rules/no-void-elements-with-children/no-void-elements-with-children";
import preferNamespaceImport from "./rules/prefer-namespace-import/prefer-namespace-import";

export const plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    "no-dangerously-set-innerhtml": noDangerouslySetInnerHTML,
    "no-dangerously-set-innerhtml-with-children": noDangerouslySetInnerHTMLWithChildren,
    "no-find-dom-node": noFindDomNode,
    "no-flush-sync": noFlushSync,
    "no-hydrate": noHydrate,
    "no-missing-button-type": noMissingButtonType,
    "no-missing-iframe-sandbox": noMissingIframeSandbox,
    "no-namespace": noNamespace,
    "no-render": noRender,
    "no-render-return-value": noRenderReturnValue,
    "no-script-url": noScriptUrl,
    "no-string-style-prop": noStringStyleProp,
    "no-unknown-property": noUnknownProperty,
    "no-unsafe-iframe-sandbox": noUnsafeIframeSandbox,
    "no-unsafe-target-blank": noUnsafeTargetBlank,
    "no-use-form-state": noUseFormState,
    "no-void-elements-with-children": noVoidElementsWithChildren,
    "prefer-namespace-import": preferNamespaceImport,
  },
} as unknown as ESLint.Plugin;
